/**
 *  # 함수에 타입지정하려면 2곳 가능
 * 
 *  변수, 함수 - 파라미터에 타입을 지정하지 않으면 any 타입
 *  => let y;  
 *  => function 함수(x) {}
 * 
 *  그래서 함수는 총 두 군데 타입지정이 가능합니다.
 *      1. 함수로 들어오는 자료 (파라미터)
 *           ㄴ 함수로 들어오는 파라미터 타입지정은 
 *              파라미터 옆에 적으면 됩니다.
 * 
 *      2. 함수에서 나가는 자료 (return)
 *           ㄴ 함수가 실행된 후 남는 값 
 *              (return 우측에 있는 값) 타입지정하고 싶으면 
 *              함수명() 우측에 적으면 됩니다.
 * 
 *  함수에 멋있게 타입 실드를 장착했기 때문에
 *  이제 파라미터와 리턴값이 이상해지면 자동으로 혼내줍니다. 
 *  파라미터에 타입을 지정하면 필수 파라미터가 됩니다. 
 */

function 내함수(x :number) :number { 
  return x * 2 
} 



/**
 *  # 함수는 void 타입이 있음
 * 
 *  함수는 특이하게도 void라는 타입을 사용가능합니다
 *  '아무것도 없이 공허함'을 뜻하는 타입인데  
 *  return할 자료가 없는 함수의 타입으로 사용가능합니다.
 * 
 *  그럼 이제 이 함수에서 뭔가를 return하려고할 때 에러를 냅니다.
 *  함수에 return 방지장치를 주고 싶을 때 void 타입을 활용하시면 되겠습니다. 
 * 
 *  => retirm 하게 되면 에러가 발생되게
 *  => 실수로 뭔가 return 하게 되는 걸 막아준다.
 */

function 내함수2(x :number) :void { 
  // return x * 2 //여기서 에러남 
} 



/**
 *  # 파라미터가 옵션일 경우
 * 
 *  함수에 파라미터자리를 만들어놨지만 가끔 파라미터 없이 쓸 때도 있습니다. 
 *  그럴 경우 타입스크립트에선 미리 
 *  "이 파라미터는 옵션임" 이렇게 정의를 해주셔야 에러가 나지 않습니다.
 * 
 *  파라미터 우측에 그냥 물음표치면 됩니다. 
 *  그럼 앞으로 내함수3()를 사용할 때 파라미터없이도 쓸 수 있습니다.
 * 
 *  근데 물음표는 실은 
 *  x : number | undefined 이거랑 똑같은 의미입니다 (중요)
 * 
 *  파라미터가 정의가 안되면 
 *  자동으로 undefined가 되니까 그걸 반영한거라고 볼 수도 있겠습니다. 
 * 
 *  => 변수 ?:number === 변수: number | undefined
 */

function 내함수3(x? :number) { 

}
내함수3(); //가능
내함수3(2); //가능



/**
 *  # 함수도 예외없이 Union type을 사용하면 
 * 
 *  Q. 예를 들어서 함수에 숫자 또는 문자를 집어넣으면 
 *     + 1 해주는 함수를 만들어봅시다. 
 * 
 *    A. 
 */

/*
  그냥 쌩 자바스크립트에서는 문자나 숫자나 모두 +1 이 가능하지만 
  타입스크립트에선 변수의 타입이 number | string 이런 union type인 경우 
  자료 조작을 금지시킵니다. 
  아직 이 파라미터의 타입이 확실하지 않으니까 
  파라미터 조작을 일단 실드로 막고 금지하는 것입니다.
  
function 자릿수세기(x :number | string){ 
  return x + 1 
} 

*/

/*
  이런 코드도 타입스크립트가 엄격하게 금지합니다.

  x라는 파라미터는 옵션이고, 
  옵션인 파라미터는 number | undefined 이런 식으로 
  타입정의가 된다고 하지 않았습니까.
  
  그래서 아직 x라는 파라미터가 
  뭔지 확실하지 않기 때문에 에러를 내줍니다.

function 내함수4(x? :number) :number { 
  return x * 2 
} 

*/



/**
 * (숙제1) 
 * 이름을 파라미터로 입력하면 콘솔창에 "안녕하세요 홍길동"을 출력해주고
 * 아무것도 파라미터로 입력하지 않고 
 * 함수를 사용하면 "이름이 없습니다" 를 출력하는 함수를 만들어봅시다.
 * 파라미터와 return 타입지정도 잘 해봅시다.
 */
function fncName(x? :string) {
  (x) ? console.log(`안녕하세요 ${x}`) : console.log("이름이 없습니다");
}
fncName();



/**
 * (숙제2) 
 * 함수에 숫자 또는 문자를 집어넣으면 
 * 자릿수를 세어 출력해주는 함수를 만들어보십시오.
 * 예를 들어 '245' 이런 문자를 입력하면 
 * 3이 return 되어야합니다.
 * 
 * 숫자도 마찬가지로 9567 
 * 이런 숫자를 입력하면 4가 return 되어야합니다.
 * 
 * 숫자 또는 문자 이외의 자료가 들어오면 안됩니다. 
 * 
 * 
 * ㄴ 관련 참고
 * 구글에 물어보니 문자에 .length 붙이면 자릿수 세준다고 하네요. 
 * 근데 숫자는 .length를 붙여줄 수 없으니까 
 * 우선 문자로 변환했다고 합니다.
 * 변환하는 함수도 역시 구글에 물어보니 .toString() 쓰면 된다고 하는군요.
 * 
 * 물론 더 정확하게 하려면
 * 만약에 x가 숫자일 경우 이렇게, 문자일 경우 이렇게 하라고 코드짜는게 좋습니다. 
 */
function fncNumber(x :string | number) :number {
  return x.toString().length;
}
console.log(fncNumber(98151651));



/**
 * (숙제3) 
 * 결혼 가능 확률을 알려주는 함수를 만들어봅시다.
 * 
 * 1. 함수의 파라미터로 
 *    월소득(만원단위), 집보유여부(true/false), 매력점수 ('상' or '중' or '하') 를 
 *    입력할 수 있어야합니다. 
 * 
 * 2. 월소득은 만원 당 1점, 
 *    집보유시 500점 & 미보유시 0점, 
 *    매력점수는 '상'일 때만 100점으로 계산합니다. 
 * 
 * 3. 총 점수가 600점 이상일 경우 
 *    "결혼가능"을 return 해줘야합니다. 
 *    
 * 그 외엔 아무것도 return하지 않습니다.
 * 
 * (예시)
 * 결혼가능하냐(700, false, '중') 이렇게 사용할 경우 "결혼가능"을 return 해줍니다.
 * 결혼가능하냐(100, false, '상') 이렇게 사용할 경우 아무것도 return되지 않습니다.
 */
function 결혼가능하냐(x:number, y :boolean, z:string) :string | void {
  const total = x + (y ? 500 : 0) + (z === '상' ? 100 : 0);
  if (total >= 600) return `결혼가능 (${total}점)`;
}

console.log(결혼가능하냐(300, false, "상"))