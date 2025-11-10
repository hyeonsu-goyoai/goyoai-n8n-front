# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


구현 내용

✅ 완성된 기능

1. React Flow 설치 - reactflow, lucide-react, axios 패키지 설치
2. API 서비스 (src/services/workflowApi.js)
   - 워크플로우 CRUD 작업
   - JWT 인증 처리
   - 에러 핸들링
3. TurboNode 컴포넌트 (src/components/TurboNode.js)
   - API 명세에 맞는 커스텀 노드
   - 아이콘, 제목, 부제목 표시
   - 비활성화 상태, 노트 지원
   - Handle(연결점) 구현
4. WorkflowEditor (src/components/WorkflowEditor.js)
   - React Flow 캔버스
   - 드래그 앤 드롭으로 노드 추가
   - 노드 연결 (엣지 생성)
   - 키보드 단축키 (Delete/Backspace)
   - 워크플로우 저장 기능
   - MiniMap, Controls, Background
5. NodeToolbar (src/components/NodeToolbar.js)
   - 15개의 사전 정의된 노드 타입
   - 트리거, HTTP, 함수, 조건 분기 등
   - 드래그 가능한 노드 목록
6. WorkflowProperties (src/components/WorkflowProperties.js)
   - 워크플로우 설명 입력
   - 태그 추가/제거
   - 노드/엣지 통계
   - 노드 타입 분석

🎯 API 연동

API 명세대로 React Flow 형식을 그대로 전송합니다:

{
name: "워크플로우 이름",
nodes: [...],  // React Flow nodes
edges: [...],  // React Flow edges
description: "설명",
tags: ["태그1", "태그2"]
}

📁 프로젝트 구조

goyoai-n8n-front/
├── src/
│   ├── components/
│   │   ├── WorkflowEditor.js      # 메인 편집기
│   │   ├── TurboNode.js            # 커스텀 노드
│   │   ├── NodeToolbar.js          # 노드 패널
│   │   └── WorkflowProperties.js   # 속성 패널
│   ├── services/
│   │   └── workflowApi.js          # API 통신
│   └── App.js
├── .env.example                    # 환경 변수 예시
└── WORKFLOW_USAGE.md               # 사용 가이드

🚀 실행 방법

# 환경 변수 설정
cp .env.example .env

# 개발 서버 시작
npm start

브라우저에서 http://localhost:3000 접속

🔑 JWT 토큰 설정

개발 환경에서 브라우저 콘솔에서:
localStorage.setItem('jwt_token', 'your_jwt_token_here');

✨ 주요 기능

- 드래그 앤 드롭: 왼쪽에서 노드를 드래그하여 추가
- 노드 연결: 핸들을 드래그하여 연결선 생성
- 삭제: Delete/Backspace 키로 삭제
- 저장: 상단 "저장" 버튼으로 API 호출
- 속성 관리: 오른쪽 패널에서 설명, 태그 추가

상세한 사용법은 WORKFLOW_USAGE.md 파일을 참고하세요!

