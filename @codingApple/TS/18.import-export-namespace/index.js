"use strict";
/**
 *  # a.ts -> b.ts 이렇게 변수나 함수를 가져다쓰고 싶은 경우
 *
 *  (a.ts)

    export var 이름 = 'kim';
    export var 나이 = 30;
 *
 *  (b.ts)

    import {이름, 나이} from './a'
    console.log(이름)
 *
 *  이렇게 사용하면 됩니다.
 *    1. 우선 변수를 다른 파일에서 쓰이게 내보내고 싶으면
 *       export 문법으로 내보내야하고
 *
 *    2. export된 변수를 가져와서 쓰고 싶으면 import 문법으로 가져와야합니다.
 *       export 하고 싶으면 변수나 함수 정의부분 왼쪽에 export 키워드 붙이면 되고
 *       import 하고 싶으면 import {변수명} from 파일경로
 *
 *  이렇게 쓰면 됩니다.
 *  경로는 ./ 부터 시작해야합니다
 *  현재경로라는 뜻이고 ts 파일 확장자는 안붙여야합니다.
 *
 *  import * from './a';
    console.log(이름);
    console.log(나이);
 *
 *  변수명 쓰기 귀찮으면 import * 하셔도 됩니다.
 *  파일에서 export된 변수를 전부 import 해오는 문법입니다.
 *  참고로 export default 이런 것도 있는데 첨 들어보면 나중에 찾아보도록 합시다.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var 이름 = 'kim';
var 함수 = function (a) { return a + 10; };
/**
 *  # 과거엔 namespace를 썼습니다
 *
 *  타입스크립트 1.5 버전 이하였나 그 때는 자바스크립트 import / export 문법이 없었습니다.
 *  그냥 <script src=""> 이걸 여러개 써서 파일들을 첨부해서 썼는데
 *  그 문법의 문제는 파일이 많아질 수록 변수명이 겹치는 위험이 발생한다는 점입니다.
 *
 *  그래서 외부 파일에서 사용하지 않을 변수들은 함수로 감싸거나 그랬는데
 *  타입변수들은 namespace 문법으로 숨겼습니다.
 *
 */
// (a.ts)
var MyNamespace;
(function (MyNamespace) {
    ;
})(MyNamespace || (MyNamespace = {}));
// (b.ts)
/// <reference path="./a.ts" />
var 이름 = '민수';
var 나이 = { age: 10 };
/**
 *  ★★★
 *  그러면 ts 파일은 이상한 "<reference/> 라는 태그를 이용"해서 다른 파일을 "import"해올 수 있는데
 *  그럼 이제 그 파일에 있던 namespace를 사용가능합니다.
 *  ★★★
 *
 *    네임스페이스명.타입명
 *
 *  이렇게 쓰면 다른 파일에 있던 타입변수를 자유롭게 쓸 수 있습니다.
 */
//  (b.ts)
/// <reference path="./a.ts" />
var 이름 = '민수';
var 나이 = { age: 10 };
var 빠방이 = { wheel: 4, model: 'Sonata' };
var 함수 = function (a) {
    console.log(a);
};
함수({ abc: '안뇽' });
var BadDog;
(function (BadDog) {
    ;
})(BadDog || (BadDog = {}));
var dog1 = 'bark';
var dog2 = { name: 'paw' };
/**
 * 배운 기념으로 namespace 써보십쇼
 *
 * 저는 namespace를 2개 만들고 각각 다른 타입을 담았습니다.
 * 그럼 이제 첫째 타입은 GoodDog.Dog 이렇게 쓸 수 있고
 * 둘째 타입은 BadDog.Dog 이렇게 쓸 수 있습니다.
 */ 
