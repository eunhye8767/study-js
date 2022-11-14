/** 
 *  # 타입 정의가 너무 길면 Type Aliases (별칭)
 * 
 *  매우 길고 복잡하게 타입을 나열하는 경우가 많습니다. 
 *    1. 이게 길고 보기싫으면
 *    2. 나중에 또 사용하고 싶으면
 *  변수에 담아쓰십시오. 
 *  
 *  변수만드는 것처럼 type 이라는 키워드를 쓰면 됩니다. 
 *  type 키워드 쓰는걸 type alias 라고 합니다.
 *  alias를 번역하자면 별칭인데 저는 그냥 쉽게 변수라고 부르겠습니다. 
 * 
 *  
 *  # type 타입변수명 = 타입종류
 *  타입을 변수처럼 만들어서 쓰는 alias 문법입니다. 
 *  관습적으로 << 대문자로 시작 >> 합니다. 
 *  일반 자바스크립트 변수랑 차별을 두기 위해 AnimalType 
 *  이런 식으로 작명하는게 어떨까요. 
 * 
 * 
 *  # 타입 작명 팁
 *  AnimalType => 대문자로 시작하면서 뒤에 Type 붙여주는 방법 권장.
*/
type Animal = string | number | undefined;
let 동물 :Animal;



/**
 *  # object 타입도 저장가능합니다
 */
type 사람 = {
  name : string,
  age : number,
}

let teacher1 :사람 = { name : 'john', age : 20 } 

// typo 키워드를 안 쓰면 아래와 같이 보여진다.
let teacher2 :{
  name : string,
  age : number,
} = { name : 'john', age : 20 } 



/**
 *  # readonly로 잠그기
 * 
 *  object 자료를 const에 집어넣어도 object 내부는 마음대로 변경가능합니다. 
 *  const 변수는 재할당만 막아줄 뿐이지 
 *  그 안에 있는 object 속성 바꾸는 것 까지 관여하지 않기 때문입니다. 
 *  object 속성을 바뀌지 않게 막고 싶으면 타입스크립트 문법을 쓰십시오. 
 * 
 *  readonly 키워드는 속성 왼쪽에 붙일 수 있으며
 *  특정 속성을 변경불가능하게 잠궈줍니다. 
 */
type Girlfriend = {
  readonly name : string,
}

let 여친 :Girlfriend = {
  name : '엠버'
}

/**
 * 한번 부여된 후엔 앞으로 바뀌면 안될 속성들을 readonly로 잠궈봅시다.  
 * (물론 readonly는 컴파일시 에러를 내는 것일 뿐 변환된 js 파일 보시면 잘 바뀌긴 합니다)
 */
여친.name = '유라' //readonly라서 에러남



/**
 *  # 속성 몇개가 선택사항이라면 
 * 
 *  그니까 어떤 object자료는 color, width 속성이 둘다 필요하지만
 *  어떤 object 자료는 color 속성이 선택사항이라면 
 *  type alias를 여러개 만들어야하는게 아니라 물음표연산자만 추가하면 됩니다.
 * 
 *  Square라는 type alias를 적용한 object 자료를 하나 만들었습니다.
 *  근데 color 속성이 없어도 에러가 나지 않습니다.
 *  함수시간에 배웠죠? 넘어가도록 합시다. 
 *  실은 물음표는 "undefined 라는 타입도 가질 수 있다~"라는 뜻임을 잘 기억해둡시다.
 *  진짠지 확인하고싶으면 마우스 올려보면 됩니다. 
 */
type Square = {
  color? : string,
  width : number,
}

let 네모2 :Square = { 
  width : 100 
}



/**
 *  # type 키워드 여러개를 합칠 수 있습니다.
 * 
 *  OR 연산자를 이용해서 Union type을 만들 수도 있습니다. 
 *  아래 코드에서 NewOne 타입에 마우스 올려보시면 string | number라고 나올겁니다. 
 */
type Name = string;
type Age = number;
type NewOne = Name | Age; 

/**
 *  object에 지정한 타입의 경우 합치기도 가능합니다. 
 *  & 기호를 쓴다면 object 안의 두개의 속성을 합쳐줍니다. 
 *  아래 코드에서 XandY 타입은 
 *  { x : number, y : number } 이렇게 정의되어있을 겁니다. 
 * 
 *  합치기는 초딩용어고 멋진 개발자말로 extend 한다라고 합니다. 
 *  물론 Type alias & Type alias 만 가능한게 아니라 
 *  Type alias & { name : string } 이런 것도 가능합니다. 
 */
type PositionX = { x: number };
type PositionY = { y: number };
type XandY = PositionX & PositionY
let 좌표 :XandY = { x : 1, y : 2 }

// Type alias & { name : string } 이런 것도 가능
type Test = Age | PositionX;
let 테스트1 :Test = 20;
let 테스트2 :Test = {x: 111}



/**
 *  # type 키워드는 재정의가 불가능합니다.
 * 
 *  이러면 에러가 날 겁니다. 
 *  나중에 type 키워드랑 매우 유사한 interface 키워드를 배우게 될텐데
 *  이 키워드를 쓰면 재정의가 가능합니다. 
 *  재정의하면 & 하는거랑 똑같은 기능을 하는데 하지만 재정의 불가능한 편이 
 *  더 안전하지 않을까요. 
 */
type Name = string;
type Name = number;



/**
 * (숙제2) 다음 조건을 만족하는 타입을 만들어봅시다. 
 * 
 *    1. 이 타입은 object 자료형이어야합니다.
 *    2. 이 타입은 color 라는 속성을 가질 수도 있으며 항상 문자가 들어와야합니다. 
 *    3. 이 타입은 size 라는 속성이 있어야하며 항상 숫자가 들어와야합니다.
 *    4. 이 타입은 position 이라는 변경불가능한 속성이 있어야하며 
 *       항상 숫자가 담긴 array 자료가 들어와야합니다.  
 * 
 *  type alias로 만들어보셈 
 */
type Obj = {
  color? : string,
  size: number
  readonly position: number[]
}
const myType1 :Obj = {
  size: 100,
  position: [1,5,7]
}



/**
 * (숙제3) 다음을 만족하는 type alias를 연습삼아 간단히 만들어보십시오. 
 *  
 *    1. 대충 이렇게 생긴 object 자료를 다룰 일이 많습니다. 
 *       { name : 'kim', phone : 123, email : 'abc@naver.com' }
 * 
 *    2. object 안에 있는 이름, 전화번호, 이메일 속성이 
 *      옳은 타입인지 검사하는 type alias를 만들어봅시다.
 * 
 *    3. 각 속성이 어떤 타입일지는 자유롭게 정하십시오. 
 */

type Obj2 = {
  name: string,
  phone: number,
  email: string
}
const myType2 :Obj2 = {
  name: 'kim',
  phone: 123014,
  email: 'test@nate.com',
}



/**
 * (숙제4). 다음을 만족하는 type alias를 만들어보십시오.
 * 
 *    1. 숙제2와 똑같은데 이번엔 이름, 전화번호, 이메일, 미성년자여부 속성을 
 *       옳은 타입인지 검사하는 type alias를 만들어봅시다.
 * 
 *    2. 미성년자 여부 속성은 true/false만 들어올 수 있습니다. 
 * 
 *    3. 멋있게 숙제2에서 만들어둔  type alias를 재활용해봅시다.
 */
type User = {
  name: string,
  phone: number,
  email?: string,
}
type Adult = { adult : boolean}
type NewUser = User & Adult;

let member = {
  name: 'kim',
  phone: 10101,
  Adult: true,
}