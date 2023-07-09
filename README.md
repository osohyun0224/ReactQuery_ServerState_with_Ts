## 주니어 FE의 React-Query로 서버 상태 관리하도록 공부하는 저장소

### React-Query란?
- Fetching, Caching, 서버 데이터와의 동기화를 지원해주는 React 오픈소스 라이브러리
- React Application에서 서버 상태를 불러오고 캐싱하고, 지속적으로 동기화하고 업데이트 하는 작업을 도와준다.
- Cashing: 동일한 데이터에 대한 반복적인 비동기 데이터 호출을 방지하며 불필요한 API 호출을 줄여서 서버 부하를 막는다.
- 흔히 Redux와 Recoil을 사용하여 API 통신과 비동기 데이터 관리를 하던 것을 React-Query로 하는 것이다.
- Redux를 사용한 API 요청과 비동기 데이터 관리의 불편함을 극복하기 위하여 React-Query를 통해 Hooks를 사용하여 컴포넌트 내부에서 자연스럽게 데이터를 사용할 수 있게 함.

### 리액트 쿼리를 사용하는 방법 학습 참고 블로그 :) "Kkiri Blog"
#### tip: 커밋 기록 보면서 해당 부분 확인하세요!
- [프로젝트 생성 및 라이브러리 설치 (1)](https://devkkiri.com/post/f14703ea-a105-46e2-89e8-26282de36a3a)
- [State(fresh, fetching, stale, inactive) &  Parallel Queries와 Dynamic Parallel Queries (2)](https://devkkiri.com/post/6783e9be-280a-469d-b377-dac40e7b214f)
- [Dependent Queries , Caching & Background Refetching & Initial Data (3)](https://devkkiri.com/post/e2b6fe00-df76-4b97-af2a-65bd3c79021b)
- [Painated Queries, Infinite Queries (4)](https://devkkiri.com/post/6f0709dc-8120-4ec0-ad31-5db2268f84a9)
- [POST, PUT, DELETE와 같은 데이터를 변화시키는 요청 - 쿼리 무효화,setQueryData "useMutation" (5)](https://devkkiri.com/postb3fe8ba3-46df-4cf0-b260-2c862628c0d9)
- [Optimistic Update(낙관적 업데이트) (6)](https://devkkiri.com/post/7fafd5b1-f034-47a6-8f4b-201701f8f991)
- [리액트 쿼리는 서버사이드 렌더링을 지원하고,그 중 NextJS에서 연동하는 방법(7)](https://devkkiri.com/post/9611766e-dc1f-4355-a94d-6ac1b4fba13a)
