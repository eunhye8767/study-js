/**
 *  # 가장 좋은 Union type 사용
 *   
 *     => Union Type : 타입 2개 이상 합친 새로운 타입만들기
 *  
 *    "이 변수엔 string 또는 number가 들어올 수 있습니다~" 
 *    라고 타입정의를 하고싶으면 | 연산자를 씁시다. 
 *    OR 연산자 같은 느낌인데 이런 타입을 전문용어로 
 *    Union type 이라고 부릅니다.  
 * 
 *    ㄴ 심심하면 괄호쳐도 됩니다. 
 *    ㄴ 이러면 name, age 변수엔 string 또는 number만 들어올 수 있습니다. 
 *    ㄴ 그리고 할당하는 순간 타입은 string 또는 number 중 하나로 변합니다.
 */

let 이름: string | number = 'kim';
let 나이: (string | number) = 100;

/**
 * 그럼 array, object 자료 만들 때 union type (OR 연산자) 쓰려면 어떻게 할까요
 * 
 * 특징은 변수에 정의된 Union 타입은 할당과 동시에 OR 역할이 사라집니다. 
 * array, object에 정의된 Union 타입은 OR 연산자가 유지됩니다. 
 */
var 어레이: (number | string)[] = [1,'2',3]
var 오브젝트: {data : number | string } = { data : '123' }


/**
 *  # 아니면 any 타입이라는 것도 있습니다
 * 
 *    아무 자료나 집어넣을 수 있는 타입입니다. 
 *    쉽게 비유하면 실드해제입니다.
 * 
 *    ㄴ any 타입은 실드 해제 문법이기 때문에 갑자기 타입을 마구 
 *       바꿔도 에러가 나지 않습니다.
 * 
 *    ㄴ any 타입은 좋다고 막쓰면 안되는데 
 *       그럼 타입관련 버그가 생길 경우 왜 그런지 추적하기가 어려우니까요. 
 * 
 *    ㄴ 그래서 비상시 쓰는 변수 타입체크 해제기능 이런 용도로 씁시다.
 */
let 이름2: any = 'kim';
이름2 = 123;
이름2 = undefined;
이름2 = [];


/**
 *  # any 보다는 unknown 타입이 나은듯
 * 
 *    요즘 타입스크립트는 unknown 타입을 사용합니다. 
 *    any와 똑같이 모든 타입을 집어넣을 수 있습니다. 
 * 
 *    ㄴ 아직 어떤 타입이 들어올지 모를 경우, 
 *       다양한 타입을 집어넣어야할 경우 이걸 사용해보시길 바랍니다. 
 * 
 *    ㄴ 중요한 특징은
 *         1. unknown 타입엔 모든 자료 다 집어넣을 수 있음
 *         2. 자료집어넣어도 타입은 그대로 unknown입니다. 
 */
let 이름3: unknown = 'kim';
이름3 = 123;
이름3 = undefined;
이름3 = [];

// unknown 에러 1
let 이름4: unknown;
let 변수1: string = 이름4;
let 변수2: boolean = 이름4;
let 변수3: number = 이름4;

// unknown 에러 2
let 이름5: unknown;
이름5[0];
이름5 - 1;
이름5.data;


/**
 * 그래서 결론은 아직 뭘 집어넣을지 모르겠는데 
 * 약간의 안정성을 도모하고 싶으면 unknown 타입을 써봅시다. 
 * 근데 실은 코드짜다가 any, unknown 부여할 경우는 별로 없습니다. 
 */

/**
 * (참고) 그래서 unknown 타입인 변수를 조작하려면 
 * 내가 조작할 변수의 타입이 무엇인지 
 * 확실하게 체크하는 narrowing 또는 assertion 스킬을 사용해야합니다. 
 * 
 * 그것이 타입스크립트의 근간이 되는 코딩방법이고
 * 변수에 뭐가 들어있을지 애매한, 추측해야하는 상황이 나오는 시점에선 
 * 반드시 사용해야합니다. 
 * 
 * 좀 길어서 그건 나중 강의에서 알아봅시다. 
 */


/**
 *  # (숙제2) 학교라는 변수에 타입지정해보십시오.
 * 
 *  타입지정을 안해줬더니 터미널에 에러가 나는군요.
 *  에러안나게 학교라는 변수에 타입좀 지정해줍시다. 
 */
/*
let 학교 = {
  score : [100, 97, 84],
  teacher : 'Phil',
  friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]
*/

let 학교 : {
  score : (number | boolean)[],
  teacher : string,
  friend : string | string[],
} = {
  score : [100, 97, 84],
  teacher : 'Phil',
  friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]


/**
 * string 타입 + 1 허용
 * number 타입 + 1 허용
 * string | number 타입 + 1 허용불가!
 */

// string | number 타입 지정으로 허용불가. 에러발생
let age : string | number;
age + 1;
