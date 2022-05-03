<img src='./images/readme_preview.png'>

# 🪜 Javascript Today House Clone!

## 실습 준비
1. 해당 프로젝트 폴더 기준, 터미널에서 `npm init -y` 명령어 실행. => 초기화
2. `package.json` 파일 생성.
3. `yarn add -D json-server` => json-server 개발 환경으로 설치.
    - json-server 패키지 : json 기반의 데이터 통신을 할 수 있는(목데이터 다룰 수 있는) 유틸리티.<br />(* 목데이터 : 실제로 존재하지 않는데 실제 존재하는 데이터처럼 사용 가능.)
    ```javascript
    // package.json
    "devDependencies": {
        "json-server": "^0.17.0"
    }
    ```
4. `package.json`에 단축키 적용하기.
    - json-sever 사이트에 보면 `Start JSON Server` 부분에서 확인 가능.
    - `./db.json` => 해당 파일 위치 경로
    - `-port 1234` => `http://localhost:1234`<br />(index.html 페이지와 포트 번호 다르게)
    - `db.json` 파일 확인이 가능하다. => `http://localhost:1234/posts`
    ```javascript
    // package.json
    "scripts": {
      "db" : "json-server --watch ./db.json --port 1234"
    },
    ```
5. `const postId = new URLSearchParams(window.location.search).get("id");`<br > => `URLSearchParams()` API를 이용하여 해당 페이지 아이디값 가져오기
6. `$titleInput.addEventListener("input", markTitleLength);`<br />=> input 이벤트
<hr />

## Before Start

#### 📌 Local에서 쉽게 서버 띄워보기(Live Server)

1. [Live Server](https://www.npmjs.com/package/live-server) 다운받기

   ```
     npm install -g live-server
   ```

2. 실행하기

   ```
     live-server 실행할_파일들이_있는_폴더명
   ```

#### 📌 Local에서 데이터베이스 서버 띄워보기(Json Server)

1. json-server 설치하기

   ```
     npm install json-server
   ```

2. json-server 실행하기

   ```
     npm run serve
   ```

<b>(+) [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)으로도 사용해볼 수 있어요!</b>

## How To Start?

1. 이 레포지토리를 Clone 받으세요.
2. npm install 을 통해 필요한 패키지를 다운받으세요
3. Live Server를 실행하세요.
4. Json Server를 실행하세요.

## Bug

버그가 있다면 [Issues](https://github.com/ddongule/js-today-house/issues)에 등록해주세요!

## License

이 프로젝트는 [MIT License](https://github.com/ddongule/js-today-house/blob/main/LICENSE)를 따릅니다.
