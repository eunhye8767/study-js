/**
 *  # a.ts -> b.ts 이렇게 변수나 함수를 가져다쓰고 싶은 경우
 * 
 *  (a.ts)

    export var 이름 = 'kim';
    export var 나이 = 30; 
 *  
 *  (b.ts)

    import {이름, 나이} from './a'
    console.log(이름)
 *   
 *  이렇게 사용하면 됩니다. 
 *    1. 우선 변수를 다른 파일에서 쓰이게 내보내고 싶으면 
 *       export 문법으로 내보내야하고
 * 
 *    2. export된 변수를 가져와서 쓰고 싶으면 import 문법으로 가져와야합니다.   
 *       export 하고 싶으면 변수나 함수 정의부분 왼쪽에 export 키워드 붙이면 되고 
 *       import 하고 싶으면 import {변수명} from 파일경로 
 * 
 *  이렇게 쓰면 됩니다. 
 *  경로는 ./ 부터 시작해야합니다 
 *  현재경로라는 뜻이고 ts 파일 확장자는 안붙여야합니다.
 * 
 *  import * from './a';
    console.log(이름);
    console.log(나이);
 * 
 *  변수명 쓰기 귀찮으면 import * 하셔도 됩니다. 
 *  파일에서 export된 변수를 전부 import 해오는 문법입니다. 
 *  참고로 export default 이런 것도 있는데 첨 들어보면 나중에 찾아보도록 합시다. 
 *  
 */

/**
 *  # a.ts -> b.ts 이렇게 정의된 타입을 가져다 쓰고 싶은 경우
 */

// (a.ts)
export type Name = string | boolean;
export type Age = (a :number) => number;

// (b.ts)
import {Name, Age} from './a'
let 이름 :Name = 'kim';
let 함수 :Age = (a) => { return a + 10 } 



/**
 *  # 과거엔 namespace를 썼습니다
 * 
 *  타입스크립트 1.5 버전 이하였나 그 때는 자바스크립트 import / export 문법이 없었습니다.
 *  그냥 <script src=""> 이걸 여러개 써서 파일들을 첨부해서 썼는데 
 *  그 문법의 문제는 파일이 많아질 수록 변수명이 겹치는 위험이 발생한다는 점입니다. 
 * 
 *  그래서 외부 파일에서 사용하지 않을 변수들은 함수로 감싸거나 그랬는데
 *  타입변수들은 namespace 문법으로 숨겼습니다. 
 * 
 */

// (a.ts)
namespace MyNamespace {
  // 중요한 타입정의들을 다른 파일들에서 쓰고 싶으면 
  // 안전하게 namespace 안에 써서 export 해줬습니다. 
  export interface PersonInterface { age : number };
  export type NameType = number | string;
} 

// (b.ts)
/// <reference path="./a.ts" />
let 이름 :MyNamespace.NameType = '민수';
let 나이 :MyNamespace.PersonInterface = { age : 10 };

/**
 *  ★★★
 *  그러면 ts 파일은 이상한 "<reference/> 라는 태그를 이용"해서 다른 파일을 "import"해올 수 있는데 
 *  그럼 이제 그 파일에 있던 namespace를 사용가능합니다.
 *  ★★★
 *  
 *    네임스페이스명.타입명 
 *  
 *  이렇게 쓰면 다른 파일에 있던 타입변수를 자유롭게 쓸 수 있습니다. 
 */

//  (b.ts)
/// <reference path="./a.ts" />

let 이름 :MyNamespace.NameType = '민수';
let 나이 :MyNamespace.PersonInterface = { age : 10 };

type NameType = boolean; //사용 가능
interface PersonInterface {} //사용 가능 

/**
 *  점찍어서 써야하기 때문에 다른 변수명을 오염시키지 않아서 
 *  변수명 중복선언문제를 방지할 수 있어서 유용합니다. 
 * 
 *  근데 자바스크립트 es6 버전이 나온 이후로 
 *  import as 키워드로 나름 namespace 와 유사하게 중복문제를 해결가능해서 
 *  namespace는 그렇게 많이 쓰이진 않습니다.
 * 
 *  (참고) 
 *  옛날 옛적엔 module 키워드를 썼었는데 갑자기 namespace 키워드로 바뀌었습니다. 
 *  참고로 알아둡시다.
 */



/**
 * (숙제1) Car 그리고 Bike 타입을 만들었는데 너무 길어요
 * 
 * (index.ts)
    type Car = {
      wheel : number,
      model : string
    }
    interface Bike {
      wheel : 2,
      model : string
    }
 * 
 * index.ts에 만들어놨는데 더러워서 다른 파일로 옮겨서 사용하고 싶습니다. 
 * 빨리 위 코드를 다른 파일 아무데나 저장하신 후 
 * index.ts에서 가져와서 변수만들 때 사용해보십시오. 
 */
 
//(a.ts)
export type Car = {
  wheel : number,
  model : string
}
export interface Bike {
  wheel : 2,
  model : string
}

// b.ts
import { Car, Bike } from './a';
let 빠방이 :Car = { wheel : 4, model : 'Sonata' }



/**
 * (숙제2) 너무 자주만들어 쓰는 함수가 하나 있습니다
 * 
 * 이 함수는 파라미터로 object자료 하나를 선택적으로 집어넣을 수 있고 
 * 아무것도 return 해주지 않아야합니다. 
 * 함수 만들 때마다 여기에 타입 일일이 붙이기 귀찮아서 그런데
 * 이 타입을 다른 파일에 저장해두고 import 해와서 
 * 함수 만들 때마다 쓰려면 어떻게 코드를 짜야할까요
 * 
 * => 참고로 object 대신 array 자료를 적용해도 괜찮다.
 */

// a.ts
export type objFunction = (a? :object) => void;

// (index.ts)
import {ObjFunction} from './a'

let 함수 :ObjFunction = function(a){
  console.log(a)
}

함수({abc : '안뇽'});



/**
 * (숙제3) 타입 중복이 너무 많이 발생합니다.
 * 
 * type Dog = string;
   interface Dog { name : string };
   let dog1 :Dog = 'bark';
   let dog2 :Dog = { name : 'paw' }
 * 
 * 위 코드에서 에러를 없애야합니다. 
 * 어떻게 코드를 짜면 될까요? 
 * 
 * (조건) 
 * type Dog, interface Dog의 타입이름 변경 금지, 파일 분할 금지 
 * 
 */

namespace GoodDog {
  export type Dog = string;
}
namespace BadDog {
  export interface Dog { name : string };
}

let dog1 :GoodDog.Dog = 'bark';
let dog2 :BadDog.Dog = { name : 'paw' }

/**
 * 배운 기념으로 namespace 써보십쇼
 * 
 * 저는 namespace를 2개 만들고 각각 다른 타입을 담았습니다. 
 * 그럼 이제 첫째 타입은 GoodDog.Dog 이렇게 쓸 수 있고
 * 둘째 타입은 BadDog.Dog 이렇게 쓸 수 있습니다. 
 */