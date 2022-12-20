/**
 * 
 * type Age<T> = T;
 * let a :Age<string>;
 * 
 * 파라미터로 string을 집어 넣으면 string
 * 그게 아니면 unknown
 */

/**
 * 1. type if문은 삼항연산자로
 * 2. 조건식은 extends 써야함.
 */

// type Age<T> = 조건식 ? string : unknown;
type Age<T> = T extends string ? string : unknown;
let a :Age<string>;
let b :Age<number>;

type FirstItem<T> = T extends any[] ? T[0] : any

let age1 :FirstItem<string[]>;
let age2 :FirstItem<number>; 


/**
 *  # infer 키워드 예시
 *     ㄴ array 내부의 타입만 뽑고 싶을 때
 */

type 타입추출<T> = T extends (infer R)[] ? R : unknown
type aaa = 타입추출<string[]>

type 타입추출2<T> = T extends ( ()=> infer R ) ? R : unknown; 
type NewType = 타입추출2< () => number > // NewType은 number 타입입니다 

// =>
/**
 *  함수를 넣으면 함수의 return 타입만 뽑고 싶을 땐
 *  ReturnType 이라는 기본 함수 쓰면 알아서 해준다.
 */


// => 숙제 1, 2
type Age2<T> = T extends [string, ...any] ? T[0] : unknown;

let age11 :Age2<[string, number]>;
let age22 :Age2<[boolean, number]>; 


type 타입뽑기<T> = T extends (x: infer R) => any ? R : any;
type a = 타입뽑기<(x :number) => void> 
type vv = 타입뽑기<(x :string) => void>