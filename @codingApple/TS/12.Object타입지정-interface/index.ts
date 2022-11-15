/**
 *  # Object에 쓸 수 있는 interface 문법
 * 
 *  interface 문법을 쓰시면 object 자료형의 타입을 
 *  보다 편리하게 지정가능합니다.
 *  예를 들어서 { color : 'red', width : 100 }
 *  이런 object를 만들고 싶은데 type을 미리 정의하고 싶으면 
 *  interface 키워드를 이렇게 만들어봅시다. 
 */
interface Square { 
  color :string, 
  width :number, 
} 

let 네모 :Square = { color : 'red', width : 100 } 

/**
 *  nterface는 object랑 비슷한 모습으로 작성하면 됩니다. 
 *  type alias와 용도와 기능이 똑같습니다. 
 *  
 *  1. 대문자로 작명하고 
 *  2. { } 안에 타입을 명시해주면 됩니다. 
 * 
 *  만들어두면 앞으로 object자료 만들 때 
 *  interface 만든걸 집어넣으시면 간편하게 타입지정이 가능합니다.
 *  
 *  (참고) 한 줄 끝나면 콤마대신 세미콜론도 가능합니다. 
 */



/**
 *  # interface 장점은 extends도 가능합니다
 * 
 *  Student interface & Teacher interface가 필요하다고 가정해봅시다.
 *  Student는 name 속성이 들어가야하고 
 *  Teacher는 name 속성과 age 속성이 들어가야합니다. 
 * 
 *  어떻게 만들면 되겠습니까 
 * 
 *  이런건 extends 문법쓰시면 줄일 수 있습니다. 
 *  extends 문법은 interface 여기에 복사해달라는 뜻입니다. 
 * 
 *  Student interface를 extends 해달라고 적으면 
 *  Student 안에 있던걸 복사해서 Teacher에 넣어줍니다.
 *  이제 Teacher 타입은 age, name 속성을 가지고 있습니다.
 */
interface Student {
  name: string
}
interface Teacher extends Student {
  age: number;
}



/**
 *  # type 키워드와의 차이점
 * 
 *  type alias와 interface는 거의 똑같은 기능을 제공합니다. 
 *  그래서 차이점은 extends 문법이 약간 다르다 이런건데
 */

// interface의 경우 일반적으로 이렇게 extends 합니다. 
interface Animal { 
  name :string 
} 
interface Cat extends Animal { 
  legs :number 
}

// type alias의 경우 extends는 안되고 & 기호를 쓰면 object 두개를 합칠 수 있습니다.
// 이러면 Cat 타입은 name, legs 속성을 가질 수 있습니다. 
type Animal2 = { 
  name :string 
} 
type Cat2 = Animal2 & { legs: number }

// 실은 interface도 type처럼 & 기호를 이용해도 복사가능 
// & 기호 쓰는걸 intersection이라고 부르는데 extends 와 유사하게 사용가능합니다. 
// (주의) extends 쓸 때 타입끼리 중복속성이 발견될 경우 
// 에러로 혼내주는데 & 쓰면 때에 따라 아닐 수도 있습니다.
interface Student2 {
  name :string,
}
interface Teacher2 {
  age :number
}

let 변수 :Student2 & Teacher2 = { name : 'kim', age : 90 }



/**
 *  # 타입이름 중복선언시
 * 
 *  interface의 경우 타입이름 중복선언을 허용해주며 
 *  중복시 extends 한 것이랑 동일하게 동작합니다. 
 *  이러면 Animal 타입은 name, legs 속성을 가질 수 있습니다. 
 *  
 *  (장점) 
 *  type 선언을 자주 쓰는 외부 라이브러리 이용시 
 *  type 선언을 내가 덮어쓰기, override 하기 편리합니다.
 */
interface Animal3 { 
  name :string 
} 
interface Animal3 { 
  legs :number 
}

/**
 *  type의 경우 중복선언을 허용하지 않습니다.
 *  에러남
 *  (장점) 엄격하고 진지함 
 */
type Animal = { 
  name :string 
} 
type Animal = { 
  legs :number 
}

/**
 *  ★★★★★
 * 
 *  그래서 일반적인 상황에선 type 키워드 자주 활용하면 되는데 
 *  다른 사람이 내 코드를 이용하는 상황이 많으면 
 *  interface로 유연하게 만드는게 좋습니다. 
 * 
 *  그래서 타입스크립트로 작성된 라이브러리들은 
 *  interface로 타입정해놓은 곳이 많습니다. 
 * 
 *  혹은 object 자료형은 전부 interface로 만들고 
 *  다른 자료형은 type 키워드로 만들고 이런 것들도 괜찮습니다.
 *  
 *  type과 interface 문법을 
 *  잘 알고 있으면 기준은 정하기 나름입니다. 
 * 
 *  ★★★★★
 * 
 *  type vs interface
 * 
 *  interface => 중복선언 가능 (유연, ex 외부 라이브러리 경우)
 *  type      => 중복선언 불가
 */



/**
 *  # extend 할 때 object 안의 속성이 중복될 경우
 * 
 *  Animal10을 복사해서 Dog interface를 만들어봤습니다.
 *  근데 name 속성이 중복되네요? 그럼 에러납니다 끝
 */
interface Animal10 { 
  name :string 
} 
interface Dog extends Animal10 { 
  name :number 
}

/**
 *  & 연산자로 Dog, Animal을 합쳐봤습니다.
 *  근데 name 속성이 중복되네요? 그럼 에러납니다 끝
 * 
 *  interface 말고도 type 키워드도 똑같은 현상이 일어납니다. 
 *  
 *  (주의)
 *  근데 name : string , name : number 라서 에러가 나는 것이지
 *  둘다 name : string 타입이면 에러가 나지 않습니다. 하나로 합쳐줌 
 */
interface Animal11 { 
  name :string 
} 
interface Dog11 { 
  name :number
} 

let 변수11 :Dog11 & Animal11 = { name : '멍멍' }



/**
 * (숙제1) interface 이용해서 간단하게 타입을 만들어봅시다
 * 
 * let 상품 = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }
 * 
 * 이런 변수가 있는데 interface 키워드로 타입지정 이쁘게 하고 싶습니다. 
 * 어떻게 코드를 짜면 될까요?
 * 무슨 타입일지는 알아서 기입합시다. 
 */
interface ProdType1 {
  brand: string,
  serialNumber: number,
  model: string[]
}

let 상품 :ProdType1 = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }



/**
 * (숙제2) array 안에 object 여러개가 필요합니다.
 * 
 * 쇼핑몰 장바구니를 구현하려고 하는데 
 * 
 * let 장바구니 = [ 
 *    { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 }
 * ]
 * 
 * 이렇게 생긴 object들이 잔뜩 들어갈 수 있는 array는 어떻게 타입을 지정해야할까요? 
 * 오늘 배운 interface 문법을 써봅시다.
 * 
 * => array에 들어갈 수 있는 object의 타입을 interface로 만들어봤습니다.
 */

interface Cart {
  product: string,
  price: number,
}
let 장바구니 :Cart[] = [{ product : '청소기', price : 7000 }, { product : '삼다수', price : 800 }]



/**
 * (숙제3) 위에서 만든 타입을 extends 해봅시다.
 * 갑자기 서비스가 업데이트되어서 일부 상품은 card 속성이 들어가야합니다. 
 */
interface NewCart extends Cart {
  card: boolean
}
let 장바구니2 :NewCart[] = [ { product : '청소기', price : 7000, card: false } ];



/**
 * (숙제4) object 안에 함수를 2개 넣고 싶은데요 
 * 1. 이 object 자료는 
 *    plus() 함수를 내부에 가지고 있으며 
 *    plus 함수는 파라미터 2개를 입력하면 더해서 return 해줍니다. 
 * 
 * 2. 이 object 자료는 
 *    minus() 함수를 내부에 가지고 있으며 
 *    minus 함수는 파라미터 2개를 입력하면 빼서 return 해줍니다. 
 * 
 * 이 object 자료를 어떻게 만들면 될까요? 
 * interface를 이용해서 object에 타입지정도 해보십시오. 
 */
interface FncType {
  plus: (a:number, b:number) => number,
  minus: (a:number, b:number) => number,
}
const objFnc :FncType = {
  plus(a,b) {
    return a + b;
  },
  minus(a,b) {
    return a - b;
  }
}

console.log(objFnc.plus(4, 9));       // 13
console.log(objFnc.minus(100, 43));   // 57
