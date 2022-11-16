var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 *  # 잠깐 rest 파라미터 개념설명
 *
 *  함수에 어떤 파라미터가 몇개 들어올지
 *  미리 정의가 불가능한 경우가 있습니다.
 *  3개일지 4개일지 100개일지 모른다면 점3개 ...로
 *  rest 파라미터를 만들어주면 됩니다.
 *
 *  함수 파라미터 작명할 때 점3개 붙여주면
 *  여기엔 파라미터 잔뜩 들어올 수 있습니다~라고 정의가 가능합니다.
 *
 *  전문 용어로 rest 파라미터라고 합니다.
 *    - rest 파라미터는 다른 일반 파라미터 뒤에만 올 수 있습니다.
 *    - rest 파라미터자리에 집어넣은 값들은 전부 [ ] 안에 담겨있습니다.
 *      출력해보시면 진짜임
 */
function 전부더하기() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    console.log(a);
}
전부더하기(1, 2, 3, 4, 5);
/**
 *  # rest 파라미터 타입지정은
 *  rest 파라미터는 항상 [ ] 안에 담겨오기 때문에
 *  타입지정도 array처럼 해주시면 됩니다.
 */
function 전부더하기2() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    console.log(a);
}
전부더하기2(1, 2, 3, 4, 5);
/**
 *  # Spread operator와 다른겁니다
 *
 *  코드짜다보면 점 3개 붙이는 경우가 또 있는데
 *  array 혹은 object 괄호 벗기고 싶을 때 왼쪽에 사용합니다.
 *
 *  array 혹은 object 왼쪽에 점3개 붙이면 괄호 벗겨주세요~ 라는 뜻입니다.
 *  그래서 arr2 출력해보면 [1,2,3,4,5] 나옵니다.
 *
 *  괄호벗겨주는 ...spread는 array, object 자료 왼쪽에,
 *  여러개의 파라미터를 의미하는 ...rest는
 *  함수선언할 때 소괄호 안에 출몰합니다.
 */
var arr = [3, 4, 5];
var arr2 = __spreadArray([1, 2], arr, true);
console.log(arr2);
/**
 *  # 잠깐 Destructuring 문법 개념설명
 *
 *  let 사람 = { student : true, age : 20 }
    let student = 사람.student;
    let age = 사람.age
 *
 *  이렇게 쓰면 되긴 하는데 개발자들이 귀찮아서 새로운 문법을 만들어냈습니다.
 *  Destructuring 이라는 것인데 변수로 빠르고 쉽게 뺄 수 있도록 도와주는 문법입니다.
 */
/**
 *  이렇게 쓰면 똑같이 변수로 뺄 수 있습니다.
 *  진짭니다 student 한 번 출력해보셈 true 들어있을 걸요
 *  이걸 destructuring 문법이라고 하며
 *  왼쪽 오른쪽 틀린그림찾기처럼 변수 작명해주시면 끝입니다.
 */
var _a = { student: true, age: 20 }, student = _a.student, age = _a.age;
/**
 *  array 자료도 왼쪽오른쪽 똑같아보이게
 *  변수 작명해주시면 변수로 쉽게 뺄 수 있습니다.
 *
 *  다만 특징은 object destructuring할 땐
 *  변수이름을 속성이름과 맞춰주는게 편리하고 (안맞추면 더 복잡함)
 *
 *  array destructuring할 땐
 *  변수이름 맘대로 작명가능합니다.
 */
var _b = ['안녕', 100], a = _b[0], b = _b[1];
/**
 *  # Destructuring 문법도 함수 파라미터에 사용가능
 *
 *  왜냐면 함수 파라미터 작명하는 것도 변수만드는 문법과 똑같아서 그렇습니다
 *  변수만들 때 기존 object에 있던 자료를 파라미터로 집어넣고 싶으면
 */
var person = { student: true, age: 20 };
function 함수(a, b) {
    console.log(a, b);
}
함수(person.student, person.age);
/**
 *  기존 object에 있던걸 person.student 이렇게
 *  각각 찝어서 집어넣으면 되긴 되는데
 *  destructuring 문법을 이용하면 약간 더 쉽게 사용가능합니다.
 */
var person2 = { student: true, age: 20 };
function 함수2(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age);
}
함수2({ student: true, age: 20 });
var person3 = { student: true, age: 20 };
// function 함수3({student, age} :{student : boolean, age : number}){
function 함수3(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age);
}
함수3({ student: true, age: 20 });
/**
 * (숙제1) 숫자 여러개를 입력하면 최댓값을 return 해주는 함수를 만들어봅시다.
 *         최댓값(6,3,7,2) 이렇게 쓰면 7이 return 되어야합니다.
 *
 * (조건1)
 * 넣을 수 있는 숫자 갯수는 제한없음, 0 이상의 정수만 가능합니다.
 *
 * (조건2)
 * Math.max() 사용금지 반복문이나 쓰셈
*/
function maxNumber() {
    // Math.max() => 최댓값 구하기
    // Math.max(...num)
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    var max = num[0];
    for (var i = 0; i < num.length; i++) {
        if (max < num[i]) {
            max = num[i];
        }
    }
    return max;
}
console.log(maxNumber(6, 3, 7, 2));
// 선생님 코드
function 최댓값() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var result = 0;
    x.forEach(function (i) {
        if (result < i) {
            result = i;
        }
    });
    return result;
}
console.log(최댓값(4, 6, 3, 2));
function fncTest1(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user, comment, admin);
}
fncTest1({ user: 'kim', comment: [3, 5, 4], admin: false });
var arrData = [40, 'wine', false];
function fncTest2(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a, b, c);
}
// fncTest2([40, 'wine', false]);
fncTest2(arrData);
