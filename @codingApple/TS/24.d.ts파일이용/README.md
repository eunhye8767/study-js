# d.ts 파일 이용하기

declare 키워드를 배웠으면 이제 d.ts 파일도 이해가 갑니다. <br />
코드짜다보면 어디선가 d.ts 파일이 등장합니다.<br />
**이 파일은 타입만 저장할 수 있는 파일형식**입니다. (그래서 definition의 약자인 d가 들어감)<br />
**그리고 자바스크립트로 컴파일되지 않습니다.**<br />
<br />
```
어디다 쓰냐면<br />
1. 타입정의만 따로 저장해놓고 import 해서 쓰려고<br />
2. 프로젝트에서 사용하는 타입을 쭉 정리해놓을 레퍼런스용으로 사용
```
<br />
<br />
<br />

> 타입만 따로 d.ts에 모아놓으려면
1. **어쩌구.d.ts 라고 작성하신 파일은 타입 정의만 넣을 수 있**습니다. <br />
type 키워드, interface 이런걸로요.<br />
함수의 경우 함수에 { } 중괄호 붙이기는 불가능합니다. 파라미터 & return 타입만 지정가능합니다.

```javascript
export type Age = number;
export type multiply = (x :number ,y :number) => number
export interface Person { name : string }
```

2. 정의해둔 타입은 export 해서 써야합니다. <br />
d.ts 파일은 ts 파일이 아니기 때문에 그냥 써도 ambient module이 되지 않습니다. <br />
그래서 export를 추가해줘야 다른 ts 파일에서 가져다쓸 수 있습니다. 

<br />
<br />

3. 한 번에 많은 타입을 export 하고 싶은 경우 namespace에 담든가<br />
아니면 자바스크립트 배운 사람처럼 import * as 어쩌구 문법을 쓰십시오.

<br />
<br />
<br />

> d.ts 파일을 레퍼런스용으로 쓰려면 
ts파일마다 d.ts 파일을 자동생성하시면 됩니다.<br />

- `tsconfig.json` 파일에서 ts 파일마다 d.ts 파일을 자동생성하고자 할 땐<br />`"declaration": true` 항목을 추가하여 `true` 적용해준다.
- 그러면 자동으로 `d.ts` 파일이 생성이 된다.

```javascript
// (tsconfig.json)

{
  "compilerOptions": {
      "target": "es5",
      "module": "es6",
      "declaration": true,
  }
}
```

**tsconfig에다가 declaration 옵션을 true로 바꿔주면 됩니다**.<br />
**그럼 저장시 자동으로 ts파일마다 d.ts 파일이 옆에 생성됩니다.**<br />
열어보시면 타입정의만 쭉 정리되어서 담겨있음  

<br />
<br />

```javascript
// (index.ts)

let 이름 :string = 'kim';
let 나이 = 20;
interface Person { name : string } 
let 사람 :Person = { name : 'park' }
```

이렇게 작성하면

```javascript
// (index.d.ts)

declare let 이름: string;
declare let 나이: number;
interface Person {
    name: string;
}
declare let 사람: Person;
```

이런 파일이 생성됩니다. (안생기면 import 문법 다 지워보셈)<br />
<br />
 
어쩌구.d.ts 라는 파일엔 어쩌구.ts 파일에 있는 모든 변수와 함수 타입정의가 들어있습니다.<br />
자동생성의 경우 따로 수정하거나 그럴 순 없어서 (수정해도 어쩌구.ts 저장시 자동생성이라 의미없음)<br />
그냥 레퍼런스용으로 사용하거나 하시면 됩니다. 

<br />
<br />
<br />

> export 없이 d.ts 파일을 글로벌 모듈 만들기
**원래 d.ts 파일은 import export 없어도 로컬모듈**입니다.<br />
그래서 다른 ts파일에서 import를 해서 쓸 수 밖에 없는데<br />
이게 귀찮으면 d.ts를 글로벌 모듈로 만들어보십시오.  <br />
파일이 많아지면 섞이기 때문에 굳이 왜 하나 싶지만 <br />
<br />

**프로젝트 내에 types/common 이런 폴더 두개를 만드시고** <br />
**`tsconfig.json` 파일에 `"typeRoots": ["./types"]` 이런 옵션을 추가해주면 됩니다.**<br />
이러면 ts 파일 작성할 때 타입없으면 자동으로 여기서 타입 찾아서 적용해줌 <br />

```javascript
// tsconfig.jon
"typeRoots": ["./types"]
```

1. `".types"` : 폴더명을 기재해준다. (이름은 아무거나 상관없음.)
2. `".types"` : 여기 있는 타입들은 글로벌 하게 이용 가능
3. `".types"` 폴더에 `common` 폴더를 하나 생성하고 `test.d.ts` 파일도 만든다.
  ```javascript
  // /types/common/test.d.ts
  type Age = number;

  // index.ts
  let 나이 :Age = 30;
  ```

4. `"typeRoots": ["./types"]` 설정해주었기 때문에 `import/export` 없이 `index.ts`에서 사용할 수 있다.
5. 하지만 위험요소가 있기 때문에 왠만하면 `import/export` 사용방식을 권장한다.

<br />
<br />

- 다만 이걸 쓸 경우 파일명.d.ts 자동생성 기능은 끄는게 좋을 듯 합니다. <br />
- d.ts 파일명은 기존 ts 파일명과 안겹치게 작성하는게 좋습니다. <br />
- **하지만 이런거 쓰다가 로컬 타입과 저런 글로벌 타입이 겹치면 어쩌쥬 역시 import export가 안전**합니다. 

<br />
<br />
<br />

> 유명한 JS 라이브러리들은 d.ts 파일을 제공 
님들이 jQuery 혹은 Bootstrap 애니메이션 라이브러리를 가져다 쓴다고 합시다.<br />
근데 이건 당연히 .js 로 끝나는 자바스크립트 파일이겠죠?<br />
그럼 당연히 ts 파일에서 쓰려면 에러가 나겠죠? <br />
<br />

그럼 여러분들이 직접 jquery.d.ts 파일을 만들어서 타입정의를 하시거나 그러면 되는데 <br />
근데 유명한 라이브러리들은 전부 d.ts 파일을 누군가 만들어 놨기 때문에 <br />
그거 찾아서 다운받거나 하시면 됩니다<br />

[Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) 여기가 주로 쓰는 라이브러리 모아놓은 github repository인데 <br />
아마 대부분 라이브러리의 타입정의 파일을 찾을 수 있을 겁니다.
<br />
<br />

근데 **요즘은 npm으로 라이브러리 설치시 타입스크립트 타입정의된 버전을 따로 찾아서 설치하실 수 있습**니다.<br />
[TypeSearch](https://www.typescriptlang.org/dt/search?search=) 여기 들어가면 타입정의된 npm 패키지 찾아볼 수 있음<br />
타입이 정의된 라이브러리를 npm으로 설치하면 <br />
`node_modules/@types` 이런 경로에 타입이 설치됩니다.<br />
그리고 타입스크립트 컴파일러는 자동으로 여기 있는 타입 파일을 참고해서 타입을 가져오게 되어있습니다. <br />
(참고) "typeRoots" 옵션이 있을 경우 `node_modules/@types` 폴더를 추가해야합니다. 아니면 그냥 "typeRoots" 옵션을 제거해보셈 <br />
 <br />
혹은 따로 타입부분만 설치할 수도 있습니다. <br />
예를 들어 타입파일이 제공되지 않는 jQuery 같은 경우 <br />

`npm install --save @types/jquery`<br />
<br />

이렇게 강제로 설치하시면 이제 jQuery 문법 사용할 때 타입정의 안하셔도 됩니다. 

<br />
<br />

> npm install --save @types/jquery 설치 예시
1. 위 명령어를 터미널에서 실행했을 때
2. `node_modules/@types` 폴더 및 관련 자료들이 생성된다.
3. `node_modules/@types` 폴더에 있는 타입들은 글로벌 모듈이다.
4. 근데 `tsconfig.json` 파일에 `"typeRoots": ["./types"]` 처럼 `typeRoots`를 따로 설정해놓으면 자동으로 `@types` 포함을 안해준다.
5. 때문에 `"typeRoots": [""]` 지워주거나 ``"typeRoots": ["./types", ".."]` 경로를 추가 설정해주어야 한다.

<br />
<br />
<br />

> d.ts 파일 용도
- 타입정의 따로 보관할 파일이 필요하면
- 타입 레퍼런스 생성하고 싶으면
- d.ts 파일은 자동으로 글로벌 모듈이 아님.