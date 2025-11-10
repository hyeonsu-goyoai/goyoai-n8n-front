import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TurboNode from './TurboNode';
import NodeToolbar from './NodeToolbar';
import WorkflowProperties from './WorkflowProperties';
import { createWorkflow, updateWorkflow } from '../services/workflowApi';
import * as Icons from 'lucide-react';
import './WorkflowEditor.css';

// 커스텀 노드 타입 등록
const nodeTypes = {
  turbo: TurboNode,
};

// 기본 엣지 옵션
const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#64748b',
  },
  style: {
    strokeWidth: 2,
    stroke: '#64748b',
  },
};

const WorkflowEditor = ({ workflowId }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState('새 워크플로우');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowTags, setWorkflowTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // 엣지 연결 핸들러
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: false,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // 드래그 앤 드롭으로 새 노드 추가
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeData = JSON.parse(type);
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'turbo',
        position,
        data: nodeData,
        draggable: true,
        selectable: true,
        connectable: true,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // 워크플로우 저장
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');

      // React Flow 형식 그대로 전송
      const workflowData = {
        name: workflowName,
        description: workflowDescription,
        tags: workflowTags,
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
          style: node.style,
          className: node.className,
          draggable: node.draggable,
          selectable: node.selectable,
          connectable: node.connectable,
          deletable: node.deletable,
          width: node.width,
          height: node.height,
          parentNode: node.parentNode,
          zIndex: node.zIndex,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          type: edge.type,
          style: edge.style,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
          animated: edge.animated,
          data: edge.data,
        })),
      };

      let response;
      if (workflowId) {
        // 수정
        response = await updateWorkflow(workflowId, workflowData);
        setSaveMessage('워크플로우가 수정되었습니다.');
      } else {
        // 생성
        response = await createWorkflow(workflowData);
        setSaveMessage(`워크플로우가 생성되었습니다. (ID: ${response.data.id})`);
      }

      console.log('Save response:', response);

      // 메시지 자동 사라지기
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to save workflow:', error);
      setSaveMessage(
        `저장 실패: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 키보드 단축키 핸들러
  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);

        if (selectedNodes.length > 0) {
          const nodeIds = selectedNodes.map((node) => node.id);
          setNodes((nds) => nds.filter((node) => !nodeIds.includes(node.id)));
          setEdges((eds) =>
            eds.filter(
              (edge) =>
                !nodeIds.includes(edge.source) &&
                !nodeIds.includes(edge.target)
            )
          );
        }

        if (selectedEdges.length > 0) {
          const edgeIds = selectedEdges.map((edge) => edge.id);
          setEdges((eds) => eds.filter((edge) => !edgeIds.includes(edge.id)));
        }
      }
    },
    [nodes, edges, setNodes, setEdges]
  );

  return (
    <div className="workflow-editor">
      <div className="workflow-editor-header">
        <div className="workflow-editor-title">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="워크플로우 이름"
            className="workflow-name-input"
          />
        </div>
        <div className="workflow-editor-actions">
          <button
            onClick={handleSave}
            disabled={isSaving || nodes.length === 0}
            className="save-button"
          >
            <Icons.Save size={16} />
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          className={`save-message ${
            saveMessage.includes('실패') ? 'error' : 'success'
          }`}
        >
          {saveMessage}
        </div>
      )}

      <div className="workflow-editor-content">
        <NodeToolbar />

        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            attributionPosition="bottom-left"
          >
            <Panel position="top-left" className="workflow-info-panel">
              <div className="workflow-info">
                <div className="info-item">
                  <Icons.Box size={14} />
                  <span>{nodes.length} 노드</span>
                </div>
                <div className="info-item">
                  <Icons.ArrowRight size={14} />
                  <span>{edges.length} 연결</span>
                </div>
              </div>
            </Panel>

            <Controls />
            <MiniMap
              nodeColor={(node) => {
                if (node.data.disabled) return '#cbd5e1';
                return '#3b82f6';
              }}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        <WorkflowProperties
          description={workflowDescription}
          setDescription={setWorkflowDescription}
          tags={workflowTags}
          setTags={setWorkflowTags}
          nodes={nodes}
          edges={edges}
        />
      </div>
    </div>
  );
};

export default WorkflowEditor;
