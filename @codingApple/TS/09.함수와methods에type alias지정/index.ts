/**
 *  # function type 도 저장가능
 * 
 *  함수에 들어갈 파라미터와 return으로 
 *  뱉을 값들을 타입지정할 수 있다고 배워봤습니다. 
 *  함수 타입도 type alias로 저장해서 쓸 수 있습니다. 
 *  
 *  예를 들어서 
 *  1. 숫자 두개를 파라미터로 입력할 수 있고
 *  2. 숫자를 return 하는 함수를 별명을 지어서 사용하려면
 * 
 *  함수 타입 쓰는 법
 *  type 함수타입 = () => {}
 *  let 함수명 :함수타입 = function() {}
 */
type NumOut = (x : number, y : number ) => number ;

/**
 *  이걸 함수 만들 때 사용하려면
 *  function 함수이름 :NumOut (){}
 *  이런 식은 불가능합니다. 
 * 
 *  function 키워드에는 () 이거 내부랑 오른쪽에만 타입지정이 가능해서요.
 *  그래서 이렇게 합니다. 
 * 
 *  함수를 만들 때
 *  let 함수명 = function(){} 이렇게 해도 되니까
 *  함수명 오른쪽에 함수명 : 타입별명
 *  이렇게 지정해서 사용하는 것입니다.
 * 
 *  type alias 만들기 싫으면 
 *  그냥 함수만들 때 직접 타입작성하면 되겠죠 뭐 
 */
let ABC :NumOut = function(x,y){
   return x + y
}



/**
 *  # methods 안에 타입지정하기
 * 
 *  plusOne 그리고 changeName 함수를 
 *  object 자료에 집어넣었습니다.
 *  
 *  arrow function, 일반함수 전부 object 안에 
 *  맘대로 집어넣을 수 있습니다. 
 *  넣은 함수들은 똑같이 점찍어서 사용가능합니다. 
 * 
 *  왜 넣냐고요? 
 *  그냥 함수도 자료안에 보관해서 쓰고싶을 때가 있기 때문입니다.
 *  근데 저거 타입지정 어떻게 하게요 
 *  그건 여러분도 알고있으니 숙제로 알아서 해보길 바랍니다. 
 */
/*
let 회원정보 = {
  name : 'kim',
  age : 30,
  plusOne (x){
    return x + 1
  },
  changeName : () => {
    console.log('안녕')
  }
}
회원정보.plusOne(1);
회원정보.changeName();
*/

/**
 * (숙제1) 위 코드에서 회원정보라는 변수에 타입지정 알아서 해보십시오. 
 *    - plusOne이라는 속성은 함수여야하고, 
 *      숫자를 넣어서 숫자를 뱉는 함수여야합니다.
 * 
 *    - changeName이라는 속성은 함수여야하고, 
 *      아무것도 return하면 안됩니다. 
 * 
 *    - type 키워드를 쓰든 말든 알아서 합시다. 
 */
type Member = {
  name : string,
  age : number,
  plusOne : ( x :number ) => number,
  changeName : () => void
}
let 회원정보:Member = {
  name : 'kim',
  age : 30,
  plusOne (x){
    return x + 1
  },
  changeName : () => {
    console.log('안녕')
  }
}
회원정보.plusOne(1);
회원정보.changeName();

/**
 * (숙제2) 다음 함수2개를 만들어보고 타입까지 정의해보십시오.
 *    - cutZero()라는 함수를 만듭시다. 
 *      이 함수는 문자를 하나 입력하면 맨 앞에 '0' 문자가 있으면 제거하고 
 *      문자 type으로 return 해줍니다.
 * 
 *    - removeDash()라는 함수를 만듭시다. 
 *      이 함수는 문자를 하나 입력하면 대시기호 '-' 가 있으면 전부 제거해주고 
 *      그걸 숫자 type으로 return 해줍니다. 
 *    
 *    - 함수에 타입지정시 type alias를 꼭 써보도록 합시다. 
 *  
 * 물론 문자제거 하는 방법을 모른다면 구글검색이 필요합니다. 
 */
type CutType = (x :string) => string

let cutZero :CutType = function (x){
    let result = x.replace(/^0+/, "");
    return result
}

type RemoveType = (x :string) => number
let removeDash:RemoveType = function (x) {
// function removeDash(x :string) :number{
    let result = x.replace(/-/g, "");
    return parseFloat(result)
}

/**
 * (풀이 과정)
 * 한개만 type alias 써봤는데 나머지도 써보십시오.
 * cutZero는 파라미터 입력하면 첫 글자 0을 제거해주고 return,
 * removeDash는 파라미터 입력하면 - 대시제거해주고 return 하라고 썼습니다. 
 * /어쩌구/ 이건 정규식문법인데 정규식은 글자에서 원하는 글자를 찾는 식일 뿐입니다.
 * 처음본다면 검색해보도록 합시다. 
 * 그리고 removeDash는 return 하기 전에 숫자로 변형했습니다. 
 */



/**
 * (숙제3) 함수에 함수를 집어넣고 싶습니다.
 * 숙제2에서 만든 함수들을 파라미터로 넣을 수 있는 함수를 제작하고 싶은 것입니다. 
 * 이 함수는 파라미터 3개가 들어가는데 
 * 첫째는 문자, 둘째는 함수, 셋째는 함수를 집어넣을 수 있습니다. 
 * 
 * 이 함수를 실행하면
 *    1. 첫째 파라미터를 둘째 파라미터 (함수)에 파라미터로 집어넣어줍니다.
 *    2. 둘째 파라미터 (함수)에서 return된 결과를 셋째 파라미터(함수)에 집어넣어줍니다.
 *    3. 셋째 파라미터 (함수)에서 return된 결과를 콘솔창에 출력해줍니다. 
 * 
 * 이 함수는 어떻게 만들면 될까요?
 * 둘째 파라미터엔 cutZero, 셋째 파라미터엔 removeDash 라는 
 * 함수들만 입력할 수 있게 파라미터의 타입도 지정해봅시다.
 * 
 * (실행예시)
 * 만들함수('010-1111-2222', cutZero, removeDash)
 * 
 * 이렇게 사용하면 문자에 
 * 1. cutZero를 해주고, 
 * 2. removeDash를 해주고 
 * 그 결과를 콘솔창에 1011112222 이렇게 출력해줍니다. 
 * 
 * 이런거 처음이면 어려울 수 있으니 하루 드림 
 */
function 만들함수(x: string, y:CutType, z:RemoveType) {
  const result1 = y(x);
  const result2 = z(result1);
  
  console.log(result2);
}
만들함수('010-1111-2222', cutZero, removeDash)