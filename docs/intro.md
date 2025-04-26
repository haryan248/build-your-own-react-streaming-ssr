# 소개

React Streaming SSR(Server Side Rendering)을 소개합니다.

## 목표

- React streaming SSR 구조를 이해합니다.
- SSR 기반으로 서버에서 컴포넌트를 렌더링 하는 방법을 소개합니다.

## 개발 환경 구성하기

```bash
## 1. Repositry를 clone 합니다.
git clone https://github.com/mugglim/build-your-own-rsc-framework

## 2. 의존성을 설치합니다.
npm install

## 3. 개발 서버을 실행합니다.
## 개발 서버는 기본적으로 https://localhost:3000 로 실행됩니다.
npm run dev
```

## 구현 코드

최종적으로 구현된 코드는 [Github](https://github.com/mugglim/build-your-own-react-streaming-ssr)을 참고해주세요.

## 참고 자료

- [React server components from scratch!](https://www.youtube.com/watch?v=MaebEqhZR84)
- [The Forensics Of React Server Components (RSCs)](https://www.smashingmagazine.com/2024/05/forensics-react-server-components/)
  - [[한국어] 리액트 서버 컴포넌트 톺아보기 (번역)](https://roy-jung.github.io/250323-react-server-components/)
- [SSR의 기쁨과 슬픔: 렌더링의 변화의 흐름을 통해 알아보는 SSR과 Streaming SSR | 인프콘2023](https://www.youtube.com/watch?v=hPyyFu3lrEg)
  - [Sample Code](https://github.com/rotoshine/infcon2023-sample-streaming-ssr/tree/main)
- [TanStack Start Docs](https://tanstack.com/start/latest/docs/framework/react/overview)
  - [react-start](https://github.com/TanStack/router/tree/main/packages/react-start)
  - [react-start-client](https://github.com/TanStack/router/tree/main/packages/react-start-client)
  - [react-start-server](https://github.com/TanStack/router/tree/main/packages/react-start-server)
