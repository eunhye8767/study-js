# object 타입 변환기 만들기

가끔 object를 다른 타입으로 변환하고 싶을 때가 있습니다. (실은 없는데 강의를 위해 그런척 하는 것임)<br />
모든 속성들에 문자가 들어오는 타입을 갑자기 숫자가 들어오도록 바꾸고 싶을 때요. <br />
그럴 땐 처음부터 타입을 다시 작성하는 것이 아니라 mapping을 이용하면 됩니다.

<br />
<br />
<br />

> keyof 연산자
그 전에 간단히 keyof 연산자를 짚고 넘어가야합니다.<br />
**keyof는 object 타입에 사용하면 object 타입이 가지고 있는 모든 key값을 union type으로 합쳐서 내보내줍니다.** <br />
object의 key를 뽑아서 새로운 타입을 만들고 싶을 때 사용하는 연산자입니다. 

```javascript
interface Person {
  age: number;
  name: string;
}
type PersonKeys = keyof Person;   //"age" | "name" 타입됩니다
let a :PersonKeys = 'age'; //가능
let b :PersonKeys = 'ageeee'; //불가능
```
Person 타입은 age, name 이라는 key를 가지고 있었기 때문에<br />
이제 PersonKeys는 정말 'age' | 'name' 타입이 됩니다.<br />
literal type이네요

<br />
<br />

```javascript
interface Person {
  [key :string]: number;
}
type PersonKeys = keyof Person;   //string | number 타입됩니다
let a :PersonKeys = 'age'; //가능
let b :PersonKeys = 'ageeee'; //가능
```
Person 타입은 모든 문자 key를 가질 수 있기 때문에<br />
**keyof Person 이렇게 하면 string 타입이 됩니다.**<br />
실은 `string | number` 타입이 됩니다. <br />
object key값에 숫자 넣어도 문자로 치환되어서 그렇습니다.<br />
[key :number] 이렇게 숫자만 들어올 수 있다고 해놓으면 keyof Person 이렇게 하면 number 타입이 됩니다.

<br />
<br />

(참고) 쌩자바스크립트는 .keys() 이런거 붙이면 key값을 array자료로 담아줍니다

<br />
<br />
<br />

> Mapped Types
가끔 object안에 있는 속성들을 다른 타입으로 한번에 싸그리 변환하고 싶을 때가 있습니다.<br />
그럴 때 유용한 타입변환기를 만들어봅시다.

```javascript
type Car = {
  color: boolean,
  model : boolean,
  price : boolean | number,
}; 
```

팀원이 만든 쓰레기같은 Car 타입이 있다고 합시다.<br />
여기 있는 모든 속성을 string 타입으로 바꾸고 싶어진 것입니다.<br />
속성이 3개면 직접 다시 만들어도 되겠지만 100개면 어쩌죠? 매우 귀찮습니다.

<br />
<br />

```javascript
type Car = {
  color: boolean,
  model : boolean,
  price : boolean | number,
};

type TypeChanger <MyType> = {
  [key in keyof MyType]: string;
};
```
그럴 땐 **TypeChanger 처럼 생긴 타입을 만들어**봅시다.<br />
그냥 쓰는 법이 정해져있는데<br />
`[ 자유작명 in keyof 타입파라미터 ] : 원하는 타입`<br />
이렇게 입력하시면 **object 타입을 입력했을 때 속성명은 그대로지만 다른 타입으로 변환해주는 변환기**를 만들 수 있습니다.

<br />
<br />

`in 키워드`는 **왼쪽이 오른쪽에 들어있냐라는 뜻**이고<br />
**keyof는 오브젝트 타입에서 key값만 union type으로 뽑아주는 역할**이라 머리쓰면 이해는 될듯요

<br />
<br />

```javascript
type Car = {
  color: boolean,
  model : boolean,
  price : boolean | number,
};

type TypeChanger <MyType> = {
  [key in keyof MyType]: string;
};

type 새로운타입 = TypeChanger<Car>;

let obj :새로운타입 = {
  color: 'red',
  model : 'kia',
  price : '300',
}
```

이렇게 하면 이제 새로운타입은 color, model, price 속성을 가지고 있으며 전부 string 타입이 됩니다.<br />
key 값이 100개 있는 object 타입을 변경할 일이 있으면 쓰도록 합시다. 

<br />
<br />
<br />
<br />
<br />

#### (숙제1) 다음 타입을 변환기를 돌려보십시오.

```javascript
type Bus = {
  color : string,
  model : boolean,
  price : number
}
```
동료가 잘못 만든 타입입니다.<br />
color, model, price 속성은 전부 string 또는 number 타입이어야합니다.<br />
1 변환기 하나 만드시고<br />
2 기존 Bus 타입을 변환기 돌려서 위 조건을 충족하는 새로운 타입을 하나 만들어보십시오.

<br />
<br />

- 풀이

```javascript
```

<br />
<br />
<br />

#### (숙제2) 이런 변환기는 어떻게 만들어야할까요?

object안에 들어있는 모든 속성을<br />
string, number 이렇게 고정된 타입으로 변환해주는게 아니라<br />
내가 원하는 타입을 입력하면 그걸로 변환해주는 범용성 좋은 변환기를 만들어보십시오.

```javascript
```

