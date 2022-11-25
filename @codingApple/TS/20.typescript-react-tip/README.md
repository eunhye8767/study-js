# React + TypeScript 사용할 때 알아야할 점

## 리액트프로젝트 설치는 이런 명령어를 사용합니다.
```
npx create-react-app 프로젝트명 --template typescript
```

#### 기존 프로젝트에 타입스크립트 추가
기존 프로젝트에 타입스크립트만 더하고 싶으면   
기존 프로젝트 경로에서 터미널을 오픈하신 후
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

<br />
<br />
<br />

> 1 일반 변수, 함수 타입지정
- 그냥 타입스크립트 배웠던 대로 똑같이 하면 됩니다. 
- JSX 문법을 쓰는 파일은 `.tsx`
- 일반 파일은 `.ts`

<br />
<br />
<br />

> 2 JSX 타입지정
- 리액트에선 변수나 자료에 `<div></div>` 이런걸 쌩으로 담아서 쓸 수 있습니다. 
- 왜냐면 리액트에서 `<div></div>` 이렇게 쓰면 HTML이 아니라 JSX라고 부르는 자료가 됩니다. 
- 이런 자료를 타입지정하고 싶으면 `JSX.Element` 라는 타입을 쓰시면 됩니다.

```javascript
let 박스 :JSX.Element = <div></div>
let 버튼 :JSX.Element = <button></button>
```

<br />
<br />
<br />

> 3 function component 타입지정
```javascript
function App () {
  return (
    <div>안녕하세요</div>
  )
}
```

리액트의 컴포넌트는 이렇게 생겼습니다.   
컴포넌트 타입지정은 어떻게 하게요   
당연히 함수니까 파라미터와 return 타입지정하면 됩니다.   
파라미터는 항상 props기 때문에 props가 어떻게 생겼는지 조사해서 타입지정하시면 되고    
근데 컴포넌트는 JSX를 return 한다는게 문제입니다.    
return 타입에 대체 뭘 기입해야하죠 

<br />
<br />

```javascript
// 강의 에시
type profileType = {
  name: string;
}

function App() {
  return (
    <div>
      <h4>안녕하십니까</h4>
      <Profile name="철수"></Profile>
    </div>
  )
}

function Profile(props :profileType) :JSX.Element {
  return (
    <div>{props.name} 프로필입니다.</div>
  )
}
```

<br />
<br />

```javascript
type AppProps = {
  name: string;
}; 

function App (props: AppProps) :JSX.Element {
  return (
    <div>{message}</div>
  )
}
```

props 파라미터는 어떻게 생겼는지 조사해서 알아서 타입지정해주면 되고    
컴포넌트는 return으로 JSX를 뱉으니 당연히 return 타입으로 JSX.Element 써주면 됩니다.    
근데 생략해도 자동으로 타입지정됩니다. 

<br />
<br />

```javascript
<Container a={<h4>안녕</h4>} />

function Container (props) {
  return (
    <div>{props.a}</div>
  )
}
```

참고로 props로 JSX를 입력할 수 있게 코드를 짜는 경우도 있습니다.    
그럴 땐 JSX.IntrinsicElements 라는 이름의 타입을 사용가능합니다.    
`<div> <a> <h4>` 같은 기본 태그들을 표현해주는 타입인데    
그래서 위 컴포넌트에 타입을 넣고 싶으면 

```javascript
type ContainerProps = {
  a: JSX.IntrinsicElements['h4'];
}; 

function Container (props: ContainerProps) {
  return (
    <div>{props.a}</div>
  )
}
```

이런 식으로 넣을 수도 있습니다.     
이제 a라는 props자리에 `<h4>`만 넣을 수 있게 타입쉴드를 씌워놓은 것임    
(참고) 아마 리액트 18버전부터는 `JSX.IntrinsicElements`는 props 타입넣을 때만 사용가능

<br />
<br />
<br />

> 4 state 문법 사용시 타입지정 
state 만들 땐 그냥 자동으로 타입이 할당되어서 걱정할 필요는 없습니다.    
state 타입이 나중에 변화할 수 있다고요?    
그런 경우는 흔치 않겠지만 그러면 미리 지정하십시오.     

```javascript
const [user, setUser] = useState<string | null>('kim');
```

그냥 `<>` 열고 타입넣으시면 됩니다.
Generic 문법을 이용해서 타입을 useState함수에 집어넣는 식으로 설정하면 됩니다. 

<br />
<br />
<br />

> 5 type assertion 문법 사용할 때 
```javascript
let code: any = 123; 
let employeeCode = <number> code; //안됩니다
```

assertion 하고 싶으면 `as` 또는 `<>` 쓰면 되는데    
리액트에서 컴포넌트로 오해할 수 있어서 꺾쇠 괄호는 리액트에서 쓰지않습니다.    
as 키워드만 씁시다.    
하지만 as 키워드는 타입스크립트 보안해제기 때문에 타입이 100% 확실할 때만 사용하도록 합시다. 

<br />
<br />
<br />

결론은 타입스크립트 쓴다고 뭔가 리액트 개발방식이 달라지는게 아니라    
함수 변수 정의부분 타입지정을 할 수 있다는 것만 달라집니다.     
"props엔 무조건 `{ name : string }`만 들어올 수 있습니다"    
이런 문법을 작성하는게 끝이고 그냥 에디터 부가기능 수준일 뿐임     
여러분이 변수 함수 class 타입지정 하는 법을 잘 배우셨으면 누구나 응용가능합니다.