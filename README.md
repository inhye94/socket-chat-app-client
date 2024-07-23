[📎 Site Link](https://personal-chat-application.netlify.app/)

<img width="1680" alt="스크린샷 2024-07-23 오후 4 19 35" src="https://github.com/user-attachments/assets/1e29d2a7-953f-4b17-86ab-61d067f73297">

## 개요 및 제작 목표

- 개요: React와 Node.js를 사용하여 실시간 채팅 사이트를 개발. 주요 기능으로는 채팅방 생성, 실시간 채팅 등이 포함됨
- 역할 및 책임: 개인 프로젝트로 클라이언트와 서버를 구축
- 제작 목표: 실무(WWWOW)에서 구현하지 못한 웹 소켓 기능을 구현

## 제작 기간

- 2024.07.12 - 2024.07.19 (약 1주)

## 사용스택

- React: 패키지 관리 및 반복되는 UI를 효율적으로 구축하고자 사용했습니다.
- Node.js: 동일한 언어(Javascript)로 서버를 구현할 수 있어서 사용했습니다.
- Express: 서버를 간편하게 설정하고, 많은 튜토리얼과 문서가 제공되어 신속히 문제를 해결하기 위해 사용했습니다.
- socket.io: 자동 재연결 및 크로스 브라우징 호환성을 제공하여 해당 라이브러리를 사용했습니다.

## 폴더 구조

- Page group
  - 웹 사이트를 구성하는 Page 그룹
  - component가 중첩되어 있음
- Feature group
  - 특정 목적의 기능을 가진 Feature 그룹
  - context, hook, api
- Assets group
  - 페이지에서 사용하는 Assets 그룹
  - image, font ...
- Shared group
  - 공통적으로 사용되는 함수 및 스타일 그룹
  - util 함수, 공통 UI ...

<img width="3336" alt="chat-app_after" src="https://github.com/user-attachments/assets/b70fe129-af61-401c-b32a-3c803b81b2a2">

### Page group
<img width="2496" alt="chat-app_after_page" src="https://github.com/user-attachments/assets/d68c3f59-46d3-4d14-a9f3-47800aa9c0ab">

### Feature group
<img width="2496" alt="chat-app_after_feature" src="https://github.com/user-attachments/assets/41bcfa9d-55eb-458f-8382-f302cb176b0d">

### Assets group
<img width="2496" alt="chat-app_after_asset" src="https://github.com/user-attachments/assets/00b38245-7970-486e-9df9-d145c3e85301">

### Shared group
<img width="2496" alt="chat-app_after_shared" src="https://github.com/user-attachments/assets/3e150696-f701-4e76-8342-7c0c7d5c7f24">


## 프로젝트 설계

### Join
<img width="3520" alt="chat-app_architecture_join" src="https://github.com/user-attachments/assets/80673329-fa7c-400c-ba11-6bbdc9303812">

### Redirect
<img width="3520" alt="chat-app_architecture_redirect" src="https://github.com/user-attachments/assets/c68b38fb-9894-4f55-832c-80c24a53e0c3">

### Chat
<img width="5424" alt="chat-app_architecture_chat" src="https://github.com/user-attachments/assets/8ed60b5c-0624-49d1-b570-fa8cdef8ed8f">

### AirConditioner
<img width="4544" alt="chat-app_architecture_air" src="https://github.com/user-attachments/assets/20095b24-8531-4b9e-95a6-b806e623ff8c">

## 문제 해결

1. concurrently로 서버와 클라이언트를 하나로 묶어서 배포하려 했으나 build 에러 발생
- 서버와 클라이언트를 함께 배포할 수 없다는 것을 확인하고, 서버는 fly.io에 클라이언트는 netlify에 배포

2. 서버 배포하고 나서 502 에러 발생
- 서버 과부하 및 네트워크 문제가 아님을 파악하고, 서버 설정에서 달리 설정된 port 값을 확인한 후 동일한 값으로 수정

3. 배포 후에 새로고침 또는 링크 직접 접근 에러
- client-side routing을 지원하기 위해 public 폴더에 \_redirect 설정 추가
