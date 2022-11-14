/**
 * 
 * function 내함수(x: number | string) {
    return x + 1;
   }

 * Operator '+' cannot be applied to types 'string | number' and 'number'
 * 위와 같은 에러가 발생하게 된다.
 * 
 * string | number 같은 union type 에는 
 * 일반적으로 조작을 못하게 막아놔서 그렇습니다. 
 * 
 * 이런 메세지를 보면 
 *  1. 타입을 하나로 Narrowing 해주거나 
 *  2. Assert 해주거나 
 * 둘 중 하나 해주면 됩니다. 
 */

/**
 *  # Type Narrowing 
 * 
 *  if문 등으로 타입을 하나로 정해주는 것을 뜻합니다. 
 *  그래서 아까 함수를 사용할 때
 * 
 *  if문과 typeof 키워드로 현재 파라미터의 타입을 검사해서 
 *    "이게 'number' 타입일 경우 이렇게 해주세요~"
 *    "이게 'string' 타입일 경우 이렇게 해주세요~"
 *  이렇게 코드를 짜야 정상적으로 사용이 가능합니다. 
 * 
 *  타입스크립트는 타입 애매한걸 싫어해서 귀찮아도 하셔야함 
 *  타입이 확실하지 않을 때 생기는 부작용을 막기위한 장치라고 보시면 되겠습니다. 
 *  가끔 이걸 "defensive 하게 코딩한다"라고 하기도 합니다.
 * 
 *  근데 또 함수 안에서 
 *  if문 쓸 때는 마지막에 else {} 이거 없으면 에러가 납니다.
 *  return 하지않는 조건문이 있다면 
 *  나중에 버그가 생길 수 있어서 에러를 내주는 것인데 
 * 
 *   "noImplicitReturns": false,  
 *  
 *  이게 성가시다면 tsconfig.js 파일에서 이걸 추가하면 됩니다. 
 *  근데 굳이 수정하는 것 보다는 엄격하게 씁시다. 
 * 
 *    - 꼭 typeof를 쓸 필요는 없고 타입을 하나로 확정지을 수 있는 코드라면 
 *      어떤 것도 Narrowing 역할을 할 수 있습니다. 
 *    - in, instanceof 키워드도 사용가능합니다.
 */

function 내함수1(x :number | string){
  if (typeof x === 'number') {
    return x + 1
  } 
  else if (typeof x === 'string') {
    return x + 1
  }
  else {
    return 0
  }
}

/**
 * Narrowing 으로 판정해주는 문법들
 *  typeof 변수
 *  속성명 in 오브젝트자료
 *  인스턴스 instanceof 부모
 */



/**
 *  # Type Assertion ( == 타입 덮어쓰기)
 * 
 *  아니면 타입을 간편하게 assert 할 수도 있습니다. 
 *    "이 변수의 타입을 number로 생각해주세요"
 *  이런 뜻으로 코드를 짜면 타입스크립트 컴파일러가 눈감아줍니다. 
 *  
 *  변수명 as string
 *  
 *  이런 식으로 as라는 키워드 쓰면 됩니다.
 * 
 *  변수명 as number 라고 쓰시면
 *  "나는 이 변수를 number라고 주장하겠습니다~" 라는 뜻이며 
 *  실제로 그렇게 타입을 변경해줍니다.
 *  아무튼 이렇게 타입스크립트 컴파일러에게 반기를 들 수 있습니다. 
 *  
 *  근데 이러려면 내가 "함수에 무조건 숫자가 들어올 것이다"라는 사실을 알고 있어야 
 *  안전하게 쓸 수 있는 문법이겠죠?
 *  
 *  as 키워드 사용시 특징이 있는데 
 *    1. as 키워드는 union type 같은 복잡한 타입을 
 *       하나의 정확한 타입으로 줄이는 역할을 수행합니다. 
 *       (number 타입을 as string 이렇게 바꾸려고 하면 에러날걸요)
 * 
 *    2. 실은 그냥 타입실드 임시 해제용입니다.  
 *       실제 코드 실행결과는 as 있을 때나 없을 때나 거의 동일합니다.
 *       아무튼 그러면 이제 변수를 숫자로 가정해서 가공할 수 있습니다.
 */
function 내함수2(x :number | string){ 
  return (x as number) + 1 
}
console.log( 내함수2(123) )      // 124
console.log( 내함수2("123") )    // 1234

/**
 *  Q. 근데 내함수('123') 이렇게 숫자말고 문자를 입력하면 어떻게 됩니까
 * 
 *      A. as number라고 썼긴 했지만 number 타입처럼 +1 해주진 않습니다. 
 *         콘솔창에 결과 출력해보면 '1231' 이렇게 출력될걸요
 *         as는 그냥 주장만 하는거지 << 실제로 타입을 바꿔주는건 아니기 때문 >> 입니다. 
 * 
 * 
 *  as 쓰면 간편해쥬금 하지만 정확히 코드짜려면 narrowing을 씁시다.  
 *  as 키워드는 맘대로 타입을 개발자 맘대로 주장하는 역할이라 때문에 
 *  엄격한 타입체크기능을 잠깐 안쓰겠다는 뜻과 동일합니다.
 * 
 *  그래서 as 문법은 이럴 때 쓰도록 합시다.
 *    1. 왜 타입에러가 나는지 정말 모르겠는 상황에 임시로 에러해결용으로 사용하거나
 *    2. 내가 어떤 타입이 들어올지 정말 확실하게 알고 있는데 컴파일러 에러가 방해할 때
 *  
 *  알겠죠? 뉴비처럼 온갖군데 as 키워드 붙이면 안됩니다. 
 *  물론 대부분의 상황에선 as 보다 훨씬 엄격하고 
 *  좋은 type narrowing으로 해결할 수 있습니다.
 */



/**
 *  # 혹은 as는 이럴 때 유용하게 쓰기도 합니다
 * 
 *  가끔 타입을 강제로 부여하는 기계를 하나 만들어쓰고 싶은 때가 있습니다.
 *  그럴 때 함수에 데이터를 넣으면 as 타입명을 붙여서 
 *  return 하는 함수를 만들어서 사용하면 됩니다. 
 * 
 *  변환기라는 함수를 만들었는데 
 *  이 함수에 자료를 입력하면 as 키워드로 타입을 하나 붙여줍니다. 
 * 
 *  하지만 아직 배우지 않은 문법이 등장합니다.
 *  <타입을 파라미터로 넣는 방법> 그리고 type 키워드 이런게 등장하는데 
 *  지금은 그렇구나~ 까지만 느끼면 되고 나중가면 알게될 것입니다.
 */

type Person = {
  name : string
}
function 변환기<T>(data: string): T {
  return JSON.parse(data) as T;
}
const jake = 변환기<Person>('{"name":"kim"}');



/**
 * (숙제1) 숫자여러개를 array 자료에 저장해놨는데
 * 가끔 '4', '5' 이런 식의 문자타입의 숫자가 발견되고 있습니다.
 * 이걸 클리닝해주는 함수가 필요합니다. 
 * 
 * 클리닝함수( ['1', 2, '3'] ) 이렇게 숫자와 문자가 섞인 array를 입력하면
 * [1,2,3] 이렇게 숫자로 깔끔하게 변환되어 나오는 클리닝함수를 만들어오고 
 * 타입지정까지 확실히 해보십시오.
 * 
 * 모르는 부분은 구글검색해도 봐드림 
 */
function test01(x:(number | string)[]) {
  const array :number[] = [];

  x.forEach(a => {
    if (typeof a === 'string') {
      // parseFloat()는 문자열을 실수로 바꾸는 함수
      array.push(parseFloat(a))
    } else {
      array.push(a)
    }
  })
  
  return array;
}

console.log(test01([1,"2","3"]));




/**
 * (숙제2) 다음과 같은 함수를 만들어보십시오.
 * 
 * let 철수쌤 = { subject : 'math' }
 * let 영희쌤 = { subject : ['science', 'english'] }
 * let 민수쌤 = { subject : ['science', 'art', 'korean'] }
 * 
 * 지금 여러 변수에 선생님이 가르치고 있는 과목이 저장이 되어있습니다. 
 * 과목 1개만 가르치는 쌤들은 문자 하나로 과목이 저장이 되어있고
 * 과목 2개 이상 가르치는 쌤들은 array 자료로 과목들이 저장되어있습니다. 
 * 
 * 철수쌤같은 선생님 object 자료를 집어넣으면 
 * 그 선생님이 가르치고 있는 과목중 맨 뒤의 1개를 return 해주는 함수를 만들어봅시다.
 * 그리고 타입지정도 엄격하게 해보도록 합시다. 
 * 
 * (동작예시)
 * 만들함수( { subject : 'math' } )  //이 경우 'math'를 return
 * 만들함수( { subject : ['science', 'art', 'korean'] } ) //이 경우 'korean'을 return
 * 만들함수( { hello : 'hi' } )  //이 경우 타입에러 나면 됩니다 
 */

// function 만들함수({subject: string}) :string {
function 만들함수(x: {subject: string | string[]}) :string {
  const val = x.subject;

  if (typeof val === 'string') {
    return val;
  // } else if (typeof val === 'object') {
  } else if (Array.isArray(val) ) {
    // Array.isArray() => 배열인지? 아닌 지? 판단
    return val[val.length - 1];
  } else {
    for (const key in x) {
      if (Object.prototype.hasOwnProperty.call(x, key)) {
        return `${key} 타입 항목이 없어요` 
      }
    }
  }
}

// console.log(만들함수({ subject : ['science', 'art', 'korean'] }));
// console.log(만들함수({ subject : 'math'}));
// console.log(만들함수( { hello : 'hi' }));