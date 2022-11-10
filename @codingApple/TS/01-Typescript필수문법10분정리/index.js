// 간단한 변수 타입 지정 가능
var 이름 = 'kim';
// array 적용할 때
var 이름2 = ['kim', ' lee'];
//          ㄴ string이 담긴 array만 가능핟
// 오브젝트
// ? 경우, 포함 유무가 확정이지 않을 때 ?을 써준다.
// 어디에선 사용하고 어디에선 사용하지 않을 때 유용하다.
var 이름3 = { name: 'kim' };
// Unio Type
var 이름4 = 123;
var 이름5 = 123;
/**
 *  # 함수에 타입 지정 가능
*/
function 함수(x) {
    // 이 함수는 파라미터로 string, return 값으로 number
    return parseInt(x) * 2;
}
var john = [100, false];
/**
 *  # class 타입지정 가능
 */
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
