# object index signatures

object 자료에 타입을 미리 만들어주고 싶은데<br />
1. object 자료에 어떤 속성들이 들어올 수 있는지 아직 모르는 경우<br />
2. 타입지정할 속성이 너무 많은 경우<br />
index signatures 를 사용하면 편리합니다.

<br />
<br />
<br />

> index signatures
object 용 타입을 하나 만들고 싶습니다. 근데 아직 어떤 속성이 들어올지 모르는 겁니다.<br />
그럴 땐 이렇게 작성해봅시다. 

```javascript
interface StringOnly {
  [key: string]: string
}

let obj :StringOnly = {
  name : 'kim',
  age : '20',
  location : 'seoul'
}
```

StringOnly 라는 interface를 하나 만들었습니다.<br />
근데 안에 타입을 적을 때 `[어쩌구 : string] : string` 이렇게 적으면<br />
**모든 string으로 들어오는 key값에 할당되는 value는 string** 이어야합니다~ 라는 타입이 됩니다.<br />
쉽게 말하면 `{ 모든속성 : string }` 이라는 뜻과 동일합니다<br />
이제 이 object에 들어오는 모든 속성은 우측에 string을 가져야합니다<br />
딱 코드 한 줄로 모든 속성 타입지정이 가능해서 편리할 수 있습니다. 

<br />
<br />

```javascript
interface StringOnly {
  age : number,   ///에러남 ㅅㄱ
  [key: string]: string,
}

interface StringOnly {
  age : string,   ///가능  
  [key: string]: string,
}
```

`[ ]` 이 문법은 다른 속성과 함께 사용할 수 있지만<br />
`{ 모든 속성 : string, age : number }` 이건 뭔가 논리적으로 말이 되지 않아 금지시킵니다.

<br />
<br />

```javascript
interface StringOnly {
  age : number,   ///가능
  [key: string]: string | number,
}
```

이건 가능합니다. <br />
`{ 모든속성 : string | number, age : number }` 이렇게 해주면 논리적으로 말이 됩니다.

<br />
<br />
<br />

> array 형태도 가능
자바스크립트에서 array와 object는 실은 별 다를게 없는 같은 자료형입니다. 

```javascript
let obj = {
  0 : 'kim'
  1 : '20',
  2 : 'seoul'
}
console.log(obj[2]) //이러면 'seoul' 출력됨  
```

위 코드를 보면 array랑 똑같이 사용가능하죠?<br />
아무튼 object로도 array 처럼 사용가능  <br />
(object 자료도 대괄호쳐서 안에 있는 데이터 뽑을 수 있습니다)

<br />
<br />

```javascript
interface StringOnly {
  [key: number]: string,
}

let obj :StringOnly = {
  0 : 'kim'
  1 : '20',
  2 : 'seoul'
}
```

`[ ]` 여기 안에 key값의 타입을 number 로 지정할 수도 있습니다.<br />
**(대괄호 안엔 string 또는 number만 가능)**<br />
그럼 이제 object의 키값이 숫자로 들어오는 경우 value로 string을 가져야한다는 타입입니다. <br />
**쉽게 말하면** `{ 모든숫자속성 : string }` **이라는 뜻과 동일**합니다.<br />
그래서 array처럼 쓰고싶은 object가 있으면 저렇게 타입지정도 가능하다는 소리입니다. <br />
숫자 key만 넣을거면 그냥 array + tuple 타입 쓰는게 더 직관적일 수 있습니다.

<br />
<br />
<br />

> Recursive Index Signatures
여러분 이런거 타입지정할 생각 해본 적 있습니까

```javascript
let obj = {
  'font-size' : {
    'font-size' : {
      'font-size' : 14
    }
  }
}
```
object 안에 object 안에 object가 들어있습니다. <br />
실제로는 별로 쓸모가 없어보이지만 아무튼 중첩된 object들을 한 번에 타입지정하려면 어떻게 해야할까요. <br />
직접 interface 안에 {} 이걸 3번 중첩되게 만드셔도 되긴 하지만

<br />
<br />

```javascript
interface MyType {
  'font-size' : {
    'font-size' : {
      'font-size' : number
    }
  }
}
```
귀찮을 경우 이런 테크닉을 사용할 수 있습니다. 

<br />
<br />

```javascript
interface MyType {
  'font-size': MyType | number
}

let obj :MyType = {
  'font-size' : {
    'font-size' : {
      'font-size' : 14
    }
  }
}
```
MyType을 만들었는데<br />
'font-size' 속성은 MyType 이거랑 똑같이 생겼다고 타입을 만들었습니다.<br />
그럼 이제 타입 귀찮게 길게 중첩해서 안써도 됩니다. <br />
그리고 object자료가 4중첩 5중첩 X중첩되어도 대응가능 <br />
실은 숙제내려고 쓸데없이 가르쳐드린 내용임 

<br />
<br />
<br />
<br />
<br />

### (숙제1) 다음 자료의 타입을 지정해보십시오.

```javascript
let obj = {
  model : 'k5',
  brand : 'kia',
  price : 6000,
  year : 2030,
  date : '6월',
  percent : '5%',
  dealer : '김차장',
}
```
귀찮으니까 한번에 지정하기 위해 index signature 이걸 써봅시다.

<br />
<br />

- 풀기

```javascript
interface TypeObj {
  [key :string] : string | number
}

let obj :TypeObj = {
  model : 'k5',
  brand : 'kia',
  price : 6000,
  year : 2030,
  date : '6월',
  percent : '5%',
  dealer : '김차장',
}
```

<br />
<br />
<br />

### (숙제2) 다음 object 자료의 타입을 interface 써서 만들어보십시오. 

```javascript
let obj = {
  'font-size' : 10,
  'secondary' : {
    'font-size' : 12,
    'third' : {
      'font-size' : 14
    }
  }
}
```
object 안에 object 안에 object가 들어있습니다.<br />
타입지정 해보도록 합시다. <br />
물론 비슷한 object들이 더 중첩되어도 가능하게 recursive한 타입을 써보는건 어떨까요. 

<br />
<br />

- 풀기
```javascript
interface MytypeObj {
  'font-size' : number,
  [key :string] : MytypeObj | number,
}

let obj :MytypeObj = {
  'font-size' : 10,
  'secondary' : {
    'font-size' : 12,
    'third' : {
      'font-size' : 14
    }
  }
}
```
1 MyType을 만들었는데 여기 안엔 'font-size' 속성, 그리고 모든 문자 속성이 들어갈 수 있습니다.<br />
2 모든 문자 속성이 들어오면 `number | MyType`을 가져야한다고 타입지정해놨습니다.<br />
그럼 이제 여러분들이 object 안에 object를 집어넣어도 MyType 타입과 비슷하게 생기면 통과시켜줍니다.