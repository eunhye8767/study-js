// 간단한 변수 타입 지정 가능
let 이름 :string = 'kim';

// array 적용할 때
let 이름2 :string[] = ['kim', ' lee'];
//          ㄴ string이 담긴 array만 가능핟

// 오브젝트
// ? 경우, 포함 유무가 확정이지 않을 때 ?을 써준다.
// 어디에선 사용하고 어디에선 사용하지 않을 때 유용하다.
let 이름3 :{
  name: string,
  age?: number
} = { name :'kim'}

// Unio Type
let 이름4 :string | number = 123;

// 타입은 변수에 담아쓸 수 있음
// Type alias
// 타입 네임은 일반적으로 대문자로 시작한다.
type Typename = string | number;
let 이름5 :Typename = 123;
 


/**
 *  # 함수에 타입 지정 가능
*/
function 함수(x: string) :number {
  // 이 함수는 파라미터로 string, return 값으로 number
  return parseInt(x) * 2;
}

/**
 *  # array에 쓸 수 있는 tuple 타입
 * 
 *    type Member 참고
 *     ㄴ 무조건 첫번째 자료는 number, 두번째 자료는 boolean
*/
type Member = [number, boolean];
let john:Member = [100, false];

/**
 *  # object에 타입 지정해야할 속성이 너무 많으면
*/
type Member2 = {
  // [key :string] ==> 모든 object 속성
  // 글자로 된 모든 object 속성의 타입은 string
  [key :string] : string
}

/**
 *  # class 타입지정 가능
 */
class User {
  // 타입지정을 미리 해야함
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}