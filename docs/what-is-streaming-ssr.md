# Streaming SSR 과정 이해하기

## 목표

- 서버에서 렌더링 개념을 이해합니다.
- Streaming 렌더링 과정을 이해합니다.

## 서버에서 렌더링 이해하기

### 서버 렌더링

서버에서 렌더링은 서버 측에서 React 컴포넌트를 HTML로 변환하는 과정을 의미합니다. 서버에서 렌더링을 진행하면 컴포넌트를 script가 아닌 HTML 형태로 전송할 수 있습니다.

### Streaming 렌더링

Streaming SSR은 [Node.js stream](https://nodejs.org/api/stream.html)을 이용하여 React 컴포넌트를 렌더링하는 과정입니다. Streaming 렌더링은 chunk 단위로 HTML을 전송합니다.

서버는 Streaming 기반 렌더링을 진행하는 경우 chunk 단위를 통신하기 위해 [Transfer-Encoding: chunked](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Transfer-Encoding) HTTP 헤더를 사용합니다.
