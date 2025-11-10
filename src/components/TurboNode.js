import React from 'react';
import { Handle, Position } from 'reactflow';
import * as Icons from 'lucide-react';
import './TurboNode.css';

/**
 * TurboNode - 워크플로우 노드 컴포넌트
 * API 명세에 따른 커스텀 노드 타입
 */
const TurboNode = ({ data, selected }) => {
  // 아이콘 이름으로 Lucide 아이콘 가져오기
  const IconComponent = Icons[data.icon] || Icons.Circle;

  return (
    <div className={`turbo-node ${selected ? 'selected' : ''} ${data.disabled ? 'disabled' : ''}`}>
      <Handle
        type="target"
        position={Position.Left}
        className="turbo-handle turbo-handle-target"
        isConnectable={data.connectable !== false}
      />

      <div className="turbo-node-content">
        <div className="turbo-node-icon">
          <IconComponent size={20} />
        </div>

        <div className="turbo-node-info">
          <div className="turbo-node-title">{data.title}</div>
          {data.subtitle && (
            <div className="turbo-node-subtitle">{data.subtitle}</div>
          )}
        </div>

        {data.disabled && (
          <div className="turbo-node-disabled-badge">Disabled</div>
        )}
      </div>

      {data.notes && (
        <div className="turbo-node-notes" title={data.notes}>
          <Icons.StickyNote size={14} />
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="turbo-handle turbo-handle-source"
        isConnectable={data.connectable !== false}
      />
    </div>
  );
};

export default TurboNode;
