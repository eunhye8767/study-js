/**
 *  # 필드값 타입지정
 * 
 *  class 내부에는 모든 자식 object들이 사용가능한 
 *  속성같은걸 만들 수 있습니다. 
 *  예를 들어서 모든 Person 클래스의 자식들에게 data 라는 속성을 
 *  부여해주고 싶으면 
 * 
 *  class Person {
      data = 0;
    }

    let john = new Person();
    let kim = new Person();

    console.log(john.data);
    console.log(kim.data); 
 *
 *  그냥 class 중괄호 안에다가 변수처럼 만들면 됩니다. 
 *  (var let 키워드 안씀) 
 *  그럼 Person이 출산한 모든 자식에게 
 *  data = 0을 하나씩 복사해줍니다.
 * 
 *  당연히 자식들은 object 자료형이니 점찍고 data 쓰면 됩니다. 
 *  class 안에 저렇게 대충 만드는 속성을 필드라고 합니다. 
 * 
 *  근데 타입이 없군요.
 *  저거 data라는 속성엔 number만 들어올 수 있다고 타입지정을 해봅시다. 
 *  어떻게 할까요? 감으로 해보셈  
 * 
 *  저거 가만히 냅두셔도 자동으로 number 타입이 됩니다.
 *  타입스크립트는 많은 것들을 알아서 자동으로 타입지정해준다니까요. 
 *  굳이 명시하고 싶으면 일반 변수처럼 타입 지정해주면 끝임 
 */
class Person {
  data:number = 0;
}

let john = new Person();
let kim = new Person();

console.log(john.data);
console.log(kim.data); 



/**
 *  # constructor 타입지정
 * 
 *  class는 간단히 말하면 object 복사기계라고 했습니다. 
 *  예를 들어서 { name : 어쩌구, age : 어쩌구 } 이렇게 생긴 object 자료를 
 *  복사해주는 기계를 만들어봅시다. 
 *  ES6 신문법에선 constructor 함수를 쓰면 된다고 했습니다. 
 *  
 *  class Person {
      constructor (){
        this.name = 'kim';
        this.age = 20;
      }
    }
 * 
 *  이렇게 생겼는데 실은 타입스크립트에선 이 문법이 맞지 않습니다.
 *  에러날걸요 Error : Property 'name' does not exist on type 'Person' 
 *  this.어쩌구를 사용하고 싶으면 어쩌구를 미리 필드값으로 만들어줘야합니다. 
 *  안그러면 에러남 
 * 
 *  필드 값으로 name, age가 미리 정의되어있어야 
 *  constructor 안에서도 사용가능합니다.
 * 
 *  constructor 함수엔 변수를 집어넣을 수 있다고 했습니다.
 *  그러면 이제 new Person('hello') 할 때 소괄호안에 들어가는 'hello' 이런 자료가 
 *  저기 a라는 파라미터자리에 들어갑니다.
 *  생산되는 object마다 각각 다른 이름을 부여하고 싶을 때 유용하겠군요.
 *  근데 저거 a라는 파라미터에 타입지정을 미리 해줘야할듯 합니다. 
 */

/**
 *  Q. 타입지정은 어떻게하게요 
 *     name 속성에는 string만 들어올 수 있게 타입지정 해보십시오. 
 *  
 *  A. 뭔가 함수같이 생긴 것들은 함수처럼 타입지정하면 됩니다. 
 *     class 내부라고 다른거 아님 
 * 
 *     class Person {
          name;
          age;
          constructor ( a :string ){
            this.name = a;
            this.age = 20;
          }
        }
 * 
 *     혹은 함수 문법 중에 기본 파라미터 이런게 있습니다
 *     (default parameter)
 *     파라미터에 값을 입력 안하면 자동으로 할당해주는 그런걸 지정가능한데
 *     파라미터 = 자료 이렇게 씁니다.
 *     이런거 활용하면 그냥 타입지정 안해도 될 듯
 * 
 *      class Person {
          name;
          age;
          constructor ( a = 'kim' ){
            this.name = a;
            this.age = 20;
          }
        }
 *
 *
 *     참고로 constructor 함수는 return 타입지정을 하면 안됩니다.
 *     constructor에 의해서 항상 object자료가 생산되기 때문에 생각해보면 의미없습니다.
 */



/**
 *  # methods 타입지정
 * 
 *  class 내부엔 함수를 입력할 수 있습니다.
 *  그냥 함수명(){} 이거 넣으면 끝인데
 *  이 함수는 Person이라는 클래스의 prototype에 추가됩니다. .
 *  
 *  class Person {
      add(숫자){
        console.log(숫자 + 1)
      }
    }
 * 
 *  이러면 모든 Person의 자식들은 add 라는 함수를 이용가능합니다.
 *  이 때 add라는 함수 타입지정은 어떻게 하게요
 *  그냥 함수랑 똑같습니다.
 *  파라미터 & return 타입지정 자유롭게 할 수 있습니다. 해보십시오. 
 */


/**
 * (숙제1) Car 클래스를 만들고 싶습니다.
 * 1. 대충 { model : '소나타', price : 3000 } 이렇게 생긴 
 *    object를 복사해주는 class를 만들어보십시오.
 * 
 * 2. 그리고 복사된 object 자료들은 
 *    .tax() 라는 함수를 사용가능한데 현재 object에 저장된 
 *    price의 10분의1을 출력해주어야합니다. 
 * 
 * 3. model과 price 속성의 타입지정도 알아서 잘 해보십시오. 
 *    tax() 함수의 return 타입도요. 
 */
class Car {
  model :string;
  price :number;

  constructor (model:string, price: number) {
    this.model = model;
    this.price = price;
  }

  tax() :number {
    return this.price * 0.1;
  }
}

let car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());



/**
 * (숙제2) class인데 파라미터가 잔뜩 들어가는 class Word를 만들어봅시다.
 * 1. object 만들 때 new Word() 소괄호 안에 숫자 혹은 문자를 입력하면 
 * 2. 숫자는 전부 object 안의  num 속성 안에 array 형태로 저장되고 
 * 3. 문자는 전부 object 안의 str 속성 안에 array 형태로 저장되는 class를 만들어봅시다.
 * 4. class 만들 때 넣을 수 있는 숫자와 문자 갯수는 일단 제한은 없습니다. 
 *    그리고 타입 빼먹지 마셈
 * 
 * (동작 예시)
 * let obj = new Word('kim', 3, 5, 'park');
 * console.log(obj.num) //[3,5]
 * console.log(obj.str) //['kim', 'park']
 * 
 */
class Word {
  num :number[];
  str :string[];
  
  constructor(...param) {
    let 숫자들 :number[] = [];
    let 문자들 :string[] = [];

    param.forEach((i) => {
      if (typeof i === 'string') {
        문자들.push(i)
      } else {
        숫자들.push(i)
      }
    })

    this.num = 숫자들;
    this.str = 문자들;
  }
}

let obj = new Word('kim', 3, 5, 'park', 'lee', 87, 71, 3);
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park'] 