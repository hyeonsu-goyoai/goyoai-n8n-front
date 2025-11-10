# Workflow Editor 사용 가이드

React Flow 기반의 워크플로우 편집기 사용법

## 기능 개요

이 프로젝트는 React Flow를 사용하여 n8n 스타일의 워크플로우를 시각적으로 생성하고 편집할 수 있는 편집기입니다.

### 주요 기능

- **드래그 앤 드롭**: 왼쪽 노드 패널에서 노드를 드래그하여 캔버스에 추가
- **노드 연결**: 노드의 핸들을 드래그하여 다른 노드와 연결
- **시각적 편집**: 노드 위치 이동, 삭제, 선택 등 직관적인 편집
- **워크플로우 저장**: API를 통한 워크플로우 생성/수정
- **속성 관리**: 워크플로우 설명, 태그, 통계 정보 관리

## 시작하기

### 1. 개발 서버 실행

```bash
npm start
```

브라우저에서 http://localhost:3000 으로 접속합니다.

### 2. API 서버 설정

`.env` 파일을 생성하여 API 서버 주소를 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 3. JWT 토큰 설정 (개발용)

개발 환경에서는 브라우저 로컬스토리지에 JWT 토큰을 직접 설정할 수 있습니다:

```javascript
// 브라우저 개발자 도구 콘솔에서 실행
localStorage.setItem('jwt_token', 'your_jwt_token_here');
```

## 사용 방법

### 노드 추가

1. 왼쪽 노드 패널에서 원하는 노드 타입을 찾습니다
2. 노드를 드래그하여 캔버스에 드롭합니다
3. 노드가 캔버스에 추가됩니다

**사용 가능한 노드 타입:**

- **트리거**: 워크플로우 시작점
- **Webhook**: HTTP 요청 트리거
- **스케줄**: 시간 기반 트리거
- **HTTP 요청**: 외부 API 호출
- **함수**: JavaScript 코드 실행
- **조건 분기**: IF/ELSE 로직
- **이메일**: 이메일 발송
- **데이터베이스**: DB 쿼리 실행
- **데이터 변환**: 데이터 형식 변환
- **필터**: 조건부 데이터 필터링
- **병합**: 여러 데이터 소스 결합
- **분할**: 데이터 분기
- **대기**: 일시 정지
- **에러 처리**: 예외 처리
- **알림**: 알림 전송

### 노드 연결

1. 소스 노드의 오른쪽 핸들(파란색 점)을 클릭합니다
2. 타겟 노드의 왼쪽 핸들까지 드래그합니다
3. 연결선(엣지)이 생성됩니다

### 노드 삭제

- 노드를 선택하고 `Delete` 또는 `Backspace` 키를 누릅니다
- 연결선도 같은 방법으로 삭제할 수 있습니다

### 워크플로우 저장

1. 상단의 워크플로우 이름을 입력합니다
2. 오른쪽 속성 패널에서 설명과 태그를 추가합니다
3. "저장" 버튼을 클릭합니다
4. API를 통해 워크플로우가 저장됩니다

## API 연동

### 워크플로우 생성 API

**엔드포인트**: `POST /v2/workflows`

**요청 형식**:
```json
{
  "name": "워크플로우 이름",
  "description": "워크플로우 설명",
  "tags": ["태그1", "태그2"],
  "nodes": [
    {
      "id": "node-1",
      "type": "turbo",
      "position": { "x": 0, "y": 100 },
      "data": {
        "title": "트리거",
        "subtitle": "워크플로우 시작",
        "icon": "Play"
      }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "node-1",
      "target": "node-2"
    }
  ]
}
```

**응답 형식**:
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "워크플로우 이름",
    "status": "INACTIVE",
    "nodes": "[...]",
    "edges": "[...]",
    "createdAt": "2025-01-10T12:00:00",
    "updatedAt": "2025-01-10T12:00:00"
  },
  "message": "success"
}
```

### 워크플로우 수정 API

**엔드포인트**: `PUT /v2/workflows/{workflowId}`

요청 형식은 생성 API와 동일합니다.

## 컴포넌트 구조

```
src/
├── components/
│   ├── WorkflowEditor.js      # 메인 편집기 컴포넌트
│   ├── WorkflowEditor.css
│   ├── TurboNode.js            # 커스텀 노드 컴포넌트
│   ├── TurboNode.css
│   ├── NodeToolbar.js          # 노드 타입 목록 패널
│   ├── NodeToolbar.css
│   ├── WorkflowProperties.js   # 워크플로우 속성 패널
│   └── WorkflowProperties.css
├── services/
│   └── workflowApi.js          # API 통신 서비스
└── App.js                      # 앱 진입점
```

## 데이터 구조

### Node 구조

```javascript
{
  id: string,                  // 노드 고유 ID
  type: 'turbo',               // 노드 타입
  position: { x: number, y: number },  // 캔버스 상 위치
  data: {
    title: string,             // 노드 제목
    subtitle: string,          // 노드 부제목
    icon: string,              // Lucide 아이콘 이름
    parameters: object,        // 노드별 파라미터
    disabled: boolean,         // 비활성화 여부
    notes: string,             // 노트
  },
  draggable: boolean,          // 드래그 가능 여부
  selectable: boolean,         // 선택 가능 여부
  connectable: boolean,        // 연결 가능 여부
}
```

### Edge 구조

```javascript
{
  id: string,                  // 엣지 고유 ID
  source: string,              // 소스 노드 ID
  target: string,              // 타겟 노드 ID
  label: string,               // 엣지 라벨
  type: 'smoothstep',          // 엣지 타입
  animated: boolean,           // 애니메이션 여부
}
```

## 키보드 단축키

- `Delete` / `Backspace`: 선택한 노드/엣지 삭제
- 노드 드래그: 노드 위치 이동
- 캔버스 드래그: 전체 뷰 이동
- 마우스 휠: 줌 인/아웃

## 커스터마이징

### 새로운 노드 타입 추가

`src/components/NodeToolbar.js`의 `nodeTypes` 배열에 새로운 노드 타입을 추가합니다:

```javascript
{
  id: 'custom-node',
  title: '커스텀 노드',
  subtitle: '설명',
  icon: 'IconName',  // Lucide 아이콘
  description: '상세 설명',
}
```

### 아이콘 변경

Lucide React 아이콘 라이브러리를 사용합니다.
사용 가능한 아이콘: https://lucide.dev/icons/

## 문제 해결

### API 연결 실패

1. `.env` 파일의 `REACT_APP_API_BASE_URL` 확인
2. API 서버가 실행 중인지 확인
3. JWT 토큰이 로컬스토리지에 저장되어 있는지 확인
4. CORS 설정 확인

### 노드 드래그가 작동하지 않음

- 브라우저의 자바스크립트가 활성화되어 있는지 확인
- 콘솔에서 에러 메시지 확인

## 추가 개발 계획

- [ ] 노드 속성 편집 패널
- [ ] 워크플로우 실행 기능
- [ ] 워크플로우 목록 조회
- [ ] 워크플로우 버전 관리
- [ ] 실시간 협업 기능
- [ ] 워크플로우 템플릿
- [ ] 노드 검색 기능
- [ ] 실행 히스토리 조회

## 라이센스

MIT
