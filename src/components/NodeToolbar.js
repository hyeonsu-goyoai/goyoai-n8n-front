import React from 'react';
import * as Icons from 'lucide-react';
import './NodeToolbar.css';

/**
 * NodeToolbar - 노드 타입 선택 도구 모음
 * 드래그 앤 드롭으로 노드를 캔버스에 추가
 */
const NodeToolbar = () => {
  // 사용 가능한 노드 타입 정의
  const nodeTypes = [
    {
      id: 'trigger',
      title: '트리거',
      subtitle: '워크플로우 시작',
      icon: 'Play',
      description: '워크플로우를 시작하는 이벤트',
    },
    {
      id: 'webhook',
      title: 'Webhook',
      subtitle: 'HTTP 트리거',
      icon: 'Webhook',
      description: 'HTTP 요청으로 워크플로우 시작',
    },
    {
      id: 'schedule',
      title: '스케줄',
      subtitle: '시간 기반 트리거',
      icon: 'Clock',
      description: '정해진 시간에 워크플로우 실행',
    },
    {
      id: 'http',
      title: 'HTTP 요청',
      subtitle: 'API 호출',
      icon: 'Globe',
      description: '외부 API 호출',
    },
    {
      id: 'function',
      title: '함수',
      subtitle: '코드 실행',
      icon: 'Code',
      description: 'JavaScript 코드 실행',
    },
    {
      id: 'if',
      title: '조건 분기',
      subtitle: 'IF/ELSE',
      icon: 'GitBranch',
      description: '조건에 따라 분기',
    },
    {
      id: 'email',
      title: '이메일',
      subtitle: '이메일 발송',
      icon: 'Mail',
      description: '이메일 전송',
    },
    {
      id: 'database',
      title: '데이터베이스',
      subtitle: 'DB 작업',
      icon: 'Database',
      description: '데이터베이스 쿼리 실행',
    },
    {
      id: 'transform',
      title: '데이터 변환',
      subtitle: '데이터 가공',
      icon: 'RefreshCw',
      description: '데이터 형식 변환',
    },
    {
      id: 'filter',
      title: '필터',
      subtitle: '데이터 필터링',
      icon: 'Filter',
      description: '조건에 맞는 데이터 필터링',
    },
    {
      id: 'merge',
      title: '병합',
      subtitle: '데이터 결합',
      icon: 'Merge',
      description: '여러 데이터 소스 병합',
    },
    {
      id: 'split',
      title: '분할',
      subtitle: '데이터 나누기',
      icon: 'Split',
      description: '데이터를 여러 경로로 분할',
    },
    {
      id: 'wait',
      title: '대기',
      subtitle: '일시 정지',
      icon: 'Pause',
      description: '일정 시간 대기',
    },
    {
      id: 'error',
      title: '에러 처리',
      subtitle: '예외 처리',
      icon: 'AlertTriangle',
      description: '에러 발생 시 처리',
    },
    {
      id: 'notification',
      title: '알림',
      subtitle: '알림 전송',
      icon: 'Bell',
      description: '푸시 알림 또는 메시지 전송',
    },
  ];

  // 드래그 시작 핸들러
  const onDragStart = (event, nodeType) => {
    const nodeData = {
      title: nodeType.title,
      subtitle: nodeType.subtitle,
      icon: nodeType.icon,
      parameters: {},
    };

    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="node-toolbar">
      <div className="node-toolbar-header">
        <h3>노드</h3>
        <p>드래그하여 추가</p>
      </div>

      <div className="node-toolbar-content">
        {nodeTypes.map((nodeType) => {
          const IconComponent = Icons[nodeType.icon] || Icons.Circle;

          return (
            <div
              key={nodeType.id}
              className="node-toolbar-item"
              draggable
              onDragStart={(e) => onDragStart(e, nodeType)}
              title={nodeType.description}
            >
              <div className="node-toolbar-item-icon">
                <IconComponent size={18} />
              </div>
              <div className="node-toolbar-item-info">
                <div className="node-toolbar-item-title">{nodeType.title}</div>
                <div className="node-toolbar-item-subtitle">{nodeType.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodeToolbar;
