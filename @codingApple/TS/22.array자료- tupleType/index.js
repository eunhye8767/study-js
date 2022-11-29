function 함수() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    console.log(x);
}
함수('kim', 123); //가능
var 변수1 = [10];
var 변수2 = [10, 20];
var 변수3 = [10, 20, 10];
var 음식타입1 = ['동서녹차', 4000, true];
var arr = ['동서녹차', 4000, true, false, true, true, false, true];
/**
 *  (숙제3) 함수에 타입지정을 해보도록 합시다.
 *
 *    function 함수(){ }
 *
 *  1. 이 함수의 첫째 파라미터는 문자,
 *  2. 둘째 파라미터는 boolean,
 *  3. 셋째 파라미터부터는 숫자 또는 문자가 들어와야합니다.
 *
 *  그럼 함수에 파라미터를 어떻게 만들고 타입지정은 또 어떻게 해야할까요?
 *  오늘 배운 tuple 타입과 rest parameter를 사용해봅시다.
 */
function 함수1() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest;
}
함수1('a', true, 6, 3, '1', 4);
/**
 *  (숙제4) 다음과 같은 문자/숫자 분류기 함수를 만들어보십시오.
 *
 *  파라미터 중 문자만 모아서 [] 에 담아주고,
 *  숫자만 모아서 [] 에 담아주는 함수가 필요합니다.
 *
 *  문자 숫자 외의 자료는 입력불가능하고 파라미터 갯수 제한은 일단 없습니다.
 *  함수 만들어보시고 함수의 파라미터/return 타입지정도 확실하게 해봅시다.
 *
 *  (동작예시)
 *  함수('b', 5, 6, 8, 'a') 이렇게 사용할 경우
 *  이 자리에 [ ['b', 'a'], [5, 6, 8] ] 이 return 되어야합니다.
 */
function 함수3() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var result = [[], []];
    // let sArr = [];
    // let nArr = [];
    // let result = [];
    rest.forEach(function (a) {
        if (typeof a === "string") {
            result[0].push(a);
        }
        else {
            result[1].push(a);
        }
    });
    return result;
}
// 함수3('b', 5, 6, 8, 'a');
/**
 *  >> 설명
 *
 *  1. 함수 만들었습니다.
 *     파라미터는 몇개가 들어올지 몰라서 rest parameter 썼고
 *     파라미터 타입은 (string|number)[] 이게 좋겠군요.
 *
 *  2. 결과를 저장할 result라는 변수를 만들었습니다.
 *     기본값은 [[], []] 이렇게 만들었고 그거 타입지정은 tuple type을 활용해봤습니다.
 *
 *  3. rest 파라미터에 반복문 돌렸습니다.
 *     타입이 string이면 result[0]에 추가해주고
 *     number면 result[1]에 추가해줍니다.
 *
 *  4. return 해줌 근데 타입은 알아서 지정 잘 되어있어있군요
 */ 
