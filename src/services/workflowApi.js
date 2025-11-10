import axios from 'axios';

// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - JWT 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed');
      // 필요시 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);

/**
 * 워크플로우 생성
 * @param {Object} workflowData - 워크플로우 데이터
 * @param {string} workflowData.name - 워크플로우 이름
 * @param {Array} workflowData.nodes - 노드 배열
 * @param {Array} workflowData.edges - 엣지 배열
 * @param {string} workflowData.description - 설명 (선택)
 * @param {Array} workflowData.tags - 태그 배열 (선택)
 * @param {Object} workflowData.settings - 설정 (선택)
 * @param {Object} workflowData.staticData - 정적 데이터 (선택)
 * @returns {Promise} API 응답
 */
export const createWorkflow = async (workflowData) => {
  try {
    const response = await apiClient.post('/v2/workflows', workflowData);
    return response.data;
  } catch (error) {
    console.error('Failed to create workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 조회
 * @param {number} workflowId - 워크플로우 ID
 * @returns {Promise} API 응답
 */
export const getWorkflow = async (workflowId) => {
  try {
    const response = await apiClient.get(`/v2/workflows/${workflowId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @returns {Promise} API 응답
 */
export const getWorkflows = async (params = {}) => {
  try {
    const response = await apiClient.get('/v2/workflows', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get workflows:', error);
    throw error;
  }
};

/**
 * 워크플로우 수정
 * @param {number} workflowId - 워크플로우 ID
 * @param {Object} workflowData - 수정할 워크플로우 데이터
 * @returns {Promise} API 응답
 */
export const updateWorkflow = async (workflowId, workflowData) => {
  try {
    const response = await apiClient.put(`/v2/workflows/${workflowId}`, workflowData);
    return response.data;
  } catch (error) {
    console.error('Failed to update workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 삭제
 * @param {number} workflowId - 워크플로우 ID
 * @returns {Promise} API 응답
 */
export const deleteWorkflow = async (workflowId) => {
  try {
    const response = await apiClient.delete(`/v2/workflows/${workflowId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 활성화
 * @param {number} workflowId - 워크플로우 ID
 * @returns {Promise} API 응답
 */
export const activateWorkflow = async (workflowId) => {
  try {
    const response = await apiClient.post(`/v2/workflows/${workflowId}/activate`);
    return response.data;
  } catch (error) {
    console.error('Failed to activate workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 비활성화
 * @param {number} workflowId - 워크플로우 ID
 * @returns {Promise} API 응답
 */
export const deactivateWorkflow = async (workflowId) => {
  try {
    const response = await apiClient.post(`/v2/workflows/${workflowId}/deactivate`);
    return response.data;
  } catch (error) {
    console.error('Failed to deactivate workflow:', error);
    throw error;
  }
};

/**
 * 워크플로우 실행
 * @param {number} workflowId - 워크플로우 ID
 * @param {Object} executionData - 실행 데이터 (선택)
 * @returns {Promise} API 응답
 */
export const executeWorkflow = async (workflowId, executionData = {}) => {
  try {
    const response = await apiClient.post(`/v2/workflows/${workflowId}/execute`, executionData);
    return response.data;
  } catch (error) {
    console.error('Failed to execute workflow:', error);
    throw error;
  }
};

export default apiClient;
