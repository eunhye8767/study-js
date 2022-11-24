/**
 *  # 함수 return 값의 타입이 애매하면
 * 
 *  예를 들어 
 *    1. 아무렇게나 생긴 array 자료를 입력하면 
 *    2. array의 첫 자료를 그대로 출력해주는 함수를 만들었다고 합시다. 
 * 
 *  function 함수(x: unknown[]) {
      return x[0];
    }

    let a = 함수([4,2])
    console.log(a)  
 * 
 *  이러면 콘솔창에 4가 출력됩니다. 
 * 
 *  근데 마우스 올려서 a의 타입을 확인해보면 
 *  숫자는 아니고 unknown 타입입니다.
 *  왜냐면 지금 입력하는 array도 unknown 타입이라서 그렇습니다. 
 *  여기서 중요포인트는 타입스크립트는 타입을 알아서 변경해주지 않습니다. 
 * 
 *  스마트하게 숫자가 return 되면 
 *  "number 타입입니다~" 문자가 return 되면 "string 타입입니다~" 
 *  그런거 안해준다는 것입니다.  
 * 
 */
function 함수(x: unknown[]) {
  return x[0];
}

let a = 함수([4,2])
console.log(a + 1);

/**
 *  그래서 이런 연산도 에러가 납니다. 
 *  a는 사람이 보기에 분명히 숫자가 맞지만 아직 타입은 unknown 타입이니까요. 
 * 
 *  님들이 함수의 return 타입지정을 :number 이런 걸로 
 *  강제로 바꾸기 전까지는 number 타입으로 변하지 않습니다.
 * 
 *  그래서 여러분이 함수에 불확실한 unknown, any, union 타입을 입력하면
 *  나오는 값도 unknown, any, union 타입이고, 이 때문에 일어나는 문제들이 많습니다. 
 * 
 *  예를 들면 "함수가 10을 return 하는데 타입이 unknown 이라서 맘대로 조작을 못하네" 문제요  
 *  
 *  해결책은 
 *    1. narrowing 잘 하면 해결됩니다. 근데 귀찮음
 *    2. 그냥 애초에 타입을 파라미터로 함수에 미리 입력하는 방법도 있습니다. 
 *       그럼 원하는 곳에 가변적으로 타입지정 가능 
 *  
 *  2번을 Generic 이라고 부릅니다. 
 */



/**
 *  # Generic 적용한 함수만들기
 * 
 *  함수에 <> 이런 괄호를 열면 파라미터를 또 입력할 수 있습니다. 
 *  근데 여기 안엔 타입만 입력할 수 있습니다. 타입파라미터 문법임 
 */
function 함수2<MyType>(x: MyType[]) :MyType {
  return x[0];
}

let a2 = 함수2<number>([4,2])
let b2 = 함수2<string>(['kim', 'park'])

/**
 *  그럼 이제 함수를 사용할 때도 
 *  <> 안에 파라미터처럼 타입을 입력할 수 있습니다.
 * 
 *  그럼 님들이 이제 함수<number>( ) 이렇게 쓰는 순간 
 *  MyType 이라는 변수에 number 라는게 들어간다고 보시면 됩니다. 
 * 
 *  그럼 이제 함수( x : number[] ) :number { } 이거랑 똑같이 동작합니다. 
 * 
 *  그럼 뭐가 좋겠습니까. 
 *  아까 unknown 가득한 예제와는 다르게
 *  return 되는 타입이 number입니다. 
 * 
 *  b 변수는 return되는 타입이 뭐게요 맞춰보셈 
 * 
 *  아무튼 결론 
 *  : Generic을 쓰면 여러분이 정한 타입을 return 값으로 뱉는 함수를 
 *  제작가능한 것입니다.
 *  
 *  <> 문법만 잘 쓰면 됩니다.
 */

function 함수3<MyType>(x: MyType[]) :MyType {
  return x[0];
}

let a3 = 함수3([4,2])
let b3 = 함수3(['kim', 'park'])

/**
 *  실은 함수 사용시 
 *  꼭 <> 안써도 알아서 기본 타입을 유추해서 집어넣어줍니다. 
 * 
 *  이래도 결과는 똑같습니다. 
 * 
 *  (참고)
 *    - 타입파라미터는 자유작명가능 보통 <T> 이런걸로 많이 합니다. 
 *    - 일반 함수파라미터 처럼 2개 이상 넣기도 가능합니다 
 */



/**
 *  # 근데 왜 - 1은 불가능함 
 * 
 *  function 함수<MyType>(x: MyType) {
      return x - 1
    }

    let a = 함수<number>(100) 
 * 
 *  <MyType> 자리에 number 이런거 타입 꽂아넣으면
 *  MyType 붙은 곳에 다 집어넣어진다면서요
 *  근데 x - 1 은 불가능하네요? 님 사기꾼인듯 
 * 
 *  <MyType> 이라는 곳에 number 말고도 다른거 혹시 집어넣을 수 있으니까 
 *  저런 - 1 연산을 미리 방지해주는 것입니다. 
 * 
 *  그래서 해결책은 narrowing을 하셔도 되는데 
 *  MyType에 집어넣을 수 있는 타입을 미리 제한하는 것도 하나의 해결책입니다.  
 * 
 */



/**
 *  # Generic 타입 제한하기 (constraints)
 * 
 *  extends 문법을 쓰면 넣을 수 있는 타입을 제한할 수 있습니다. 
 *  그래서 MyType extends number 라고 쓰면 
 *  타입 파라미터에 넣을 수 있는 타입을 제한가능합니다. 
 * 
 *  interface 문법에 쓰는 extends와는 살짝 다른 느낌입니다.
 *  
 *  그 extends는 복사인데 이번 extends는 number와 비슷한 속성을 가지고 있는지 
 *  if 문으로 체크하는 문법이라고 보면 됩니다.
 */
function 함수4<MyType extends number>(x: MyType) {
  return x - 1
}

let a4 = 함수4<number>(100) //잘됩니다

/**
 *  그래서 그렇게 써봤습니다. 이러면 에러없이 잘됩니다. 
 *  return 타입지정을 안한 이유는 숫자 - 숫자를 했으니 알아서 number 타입이 됩니다.
 */



/**
 *  # 언제나 커스텀 타입도 extends 가능
 * 
 *  예를 들어서 문자로 파라미터를 넣으면 자릿수를 세어서 출력해주는 함수를 
 *  Generic으로 만들고 싶습니다.
 * 
 *  function 함수<MyType>(x: MyType) {
      return x.length
    }

    let a = 함수<string>('hello')
 * 
 *  문자에 .length 붙이면 몇자리의 문자인지 출력해주는데
 *  에러나고 안됩니다.
 *  왜냐면 MyType에 님들이 string을 집어넣었지만 
 *  나중에 number 이런거 실수로 집어넣으면 어쩔 것임 
 * 
 *  그럴 수 있어서 아직 .length같은 조작을 일단 방지해주는 것입니다. 
 *  
 *  그래서 MyType을 extends 이런걸로 정확히 제한해주면 되는데
 *  이번엔 interface로 만들어둔 타입을 extends 해봅시다. 제맘임
 * 
 */
interface lengthCheck {
  length : number
}
function 함수5<MyType extends lengthCheck>(x: MyType) {
  return x.length
}

let a5 = 함수5<string>('hello')  //가능
let b5 = 함수5<number>(1234) //에러남

/**
 *  1. length 속성을 가지고 있는 타입을 하나 만들었습니다. 
 *     이름은 lengthCheck로 했습니다. 
 *  
 *  2. 그걸 extends 해주면 MyType도 length 속성을 복사해서 가집니다. 
 * 
 *  3. 그래서 MyType은 length가 분명히 있기 때문에 맘대로 
 *     MyType을 부여받은 x는 .length 조작이 가능합니다. 
 * 
 *  (참고) 
 *  class도 class <MyType> {} 이런 식으로 만들면 
 *  new로 뽑을 때 타입파라미터를 집어넣을 수 있습니다. 
 * 
 *  type Age<MyType> = MyType 이런 식으로 타입변수에도 사용가능
 */



/**
 * (숙제1) 
 * 문자를 집어넣으면 문자의 갯수, 
 * array를 집어넣으면 array안의 자료 갯수를 
 * 콘솔창에 출력해주는 함수는 어떻게 만들까요? 
 * 
 * 연습삼아 Generic 이런걸로 만들어봅시다. 
 * 굳이 Generic 이런게 필요는 없겠지만요 
 * 
 * (동작 예시)
 * 함수<string>('hello') 이렇게 사용하면 콘솔창에 5가 나와야합니다. 
 * 함수<string[]>( ['kim', 'park'] ) 이렇게 사용하면 콘솔창에 2가 나와야합니다. 
 */

function changeFnc<T extends string | string[]> (n: T) {
  // console.log(x.length)
  return n.length;
}
console.log("문자", changeFnc<string>('hello'));
console.log("배열", changeFnc<string[]>(['kim', 'park']));



/**
 * (숙제2) Animal 이라는 타입이 있습니다.
 * 
 * interface Animal {
      name : string;
      age : number 
    }

    let data = '{"name" : "dog", "age" : 1 }'
 *
 * 그리고 data라는 변수도 있습니다. 
 * object처럼 생겼지만 따옴표 쳐진 JSON 자료입니다. 
 * 
 * data라는 JSON 자료를 object { } 자료로 변환을 해서 
 * return 해주는 함수를 만들어보십시오.
 * 
 * 근데 변환된 object의 타입은 Animal이 되었으면 좋겠는데 
 * 어떻게 코드를 짜면 될까요?
 * 
 * 오늘 배운 Generic을 이용해서 구현해보도록 합시다.  
 * 
 * (동작 예시)
 * 함수<Animal>(data) 이렇게 쓰면 
 * 이 자리에 { name : 'dog' , age : 1 } 이런 object 자료가 남아야합니다. 
 * 근데 타입은 Animal임
 * 
 */
interface Animal {
  name : string;
  age : number 
}

let data = '{"name" : "dog", "age" : 1 }'
function fncAnimal<T> (x :string) :T {
  return JSON.parse(x)
}

let 강아지 = fncAnimal<Animal>(data);
console.log(강아지);



/**
 * (숙제3) class 를 수정해봅시다.
 * 
 * class Person {
     name;
     constructor(a){
       this.name = a;
     }
   }
   let a = new Person('어쩌구');
   a.name //any 타입이 되었넹 
 * 
 * 지금 만든 class는 new Person('어쩌구') 라고 
 * 분명 문자를 집어넣었는데 any 타입이 name 속성에 부여됩니다.
 * 
 * 이게 싫어서 파라미터에 
 *    string을 집어넣으면 string 타입
 *    number를 집어넣으면 number 타입
 *    string[]을 집어넣으면 string[] 타입이 되게 하려면 
 * 위의 코드를 어떻게 수정해야할까요? 
 * 
 * 오늘 배운 Generic을 이용해봅시다. 
 * 
 */
class Person<T> {
  name;
  constructor(a :T){
    this.name = a;
  }
}
let a10 = new Person<string>('어쩌구');
a10.name //any 타입이 되었넹

/**
 * 타입파라미터를 입력할 수 있게 만들었습니다.
 * 그럼 이제 new Person 할 때마다 타입 파라미터를 입력할 수 있게 되며
 * 내맘대로 타입지정이 가능합니다. 
 */