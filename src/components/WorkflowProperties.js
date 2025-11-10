import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './WorkflowProperties.css';

/**
 * WorkflowProperties - 워크플로우 속성 패널
 * 설명, 태그, 통계 정보 표시
 */
const WorkflowProperties = ({
  description,
  setDescription,
  tags,
  setTags,
  nodes,
  edges
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newTag, setNewTag] = useState('');

  // 태그 추가
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  // 태그 제거
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Enter 키로 태그 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={`workflow-properties ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="workflow-properties-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>워크플로우 속성</h3>
        <button className="toggle-button">
          {isExpanded ? <Icons.ChevronRight size={20} /> : <Icons.ChevronLeft size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="workflow-properties-content">
          {/* 통계 */}
          <div className="properties-section">
            <h4>
              <Icons.BarChart3 size={16} />
              통계
            </h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">노드</div>
                <div className="stat-value">{nodes.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">연결</div>
                <div className="stat-value">{edges.length}</div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="properties-section">
            <h4>
              <Icons.FileText size={16} />
              설명
            </h4>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="워크플로우에 대한 설명을 입력하세요..."
              className="description-textarea"
              rows={4}
            />
          </div>

          {/* 태그 */}
          <div className="properties-section">
            <h4>
              <Icons.Tag size={16} />
              태그
            </h4>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="tag-remove-button"
                    title="태그 제거"
                  >
                    <Icons.X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="tag-input-container">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="태그 추가..."
                className="tag-input"
              />
              <button
                onClick={handleAddTag}
                disabled={!newTag.trim()}
                className="tag-add-button"
                title="태그 추가"
              >
                <Icons.Plus size={16} />
              </button>
            </div>
          </div>

          {/* 노드 타입 분석 */}
          {nodes.length > 0 && (
            <div className="properties-section">
              <h4>
                <Icons.Layers size={16} />
                노드 타입 분석
              </h4>
              <div className="node-types-list">
                {getNodeTypeStats(nodes).map((stat, index) => (
                  <div key={index} className="node-type-item">
                    <span className="node-type-name">{stat.subtitle}</span>
                    <span className="node-type-count">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 노드 타입별 통계 계산
const getNodeTypeStats = (nodes) => {
  const stats = {};

  nodes.forEach(node => {
    const subtitle = node.data.subtitle || '기타';
    if (stats[subtitle]) {
      stats[subtitle]++;
    } else {
      stats[subtitle] = 1;
    }
  });

  return Object.entries(stats)
    .map(([subtitle, count]) => ({ subtitle, count }))
    .sort((a, b) => b.count - a.count);
};

export default WorkflowProperties;
