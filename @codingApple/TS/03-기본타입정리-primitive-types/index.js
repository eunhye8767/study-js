/**
 *  # primitive types
 *
 *     ㄴ let 이름 :타입 = 기본값
 *     ㄴ primitive types 종류 : string, number, boolean, null, undefined
 *     ㄴ array 또는 object 자료 안에도 타입 지정가능
 *
 *
 *  # 하지만 오늘의 프로 팁은
 *
 *     ㄴ 그렇다고 모든 변수에 타입지정하러 다니면 초보티가 납니다.
 *        숙련자들은 타입을 귀찮게 굳이 적지 않습니다.
 *        왜냐면 변수 생성시 타입스크립트가 타입을 자동으로 부여해주니까요.
 */
var 이름 = 'kim';
var 나이 = 50;
var 결혼했니 = true;
var 널 = null;
var 언디파인드 = undefined;
/**
 * array 경우, 타입을 앞에 적용해줘야 한다.
 * string[] , number[]
 *
 * string, number, boolea 등 다양한 타입을 적용하고자 할 땐
 * Union Type을 적용해주면 된다. (설명은 다음번에 자세히..)
 */
var 회원들 = ['kim', 'park'];
/**
 * 변수 하나에 여러 자료 집어넣고 싶으면
 * object 자료형 써도 가능
 */
var 회원들2 = { member1: 'kim', member2: 'park' };
