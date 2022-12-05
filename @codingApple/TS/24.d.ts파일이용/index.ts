// import { Age } from './test.d';
// let age :Age;

/**
 * import / export 할게 많으면
 * namespace 쓰든가 import * as 쓰든가
 */
// import * as tp from './test.d';
// let age :tp.Age;

/**
 * "declaration": true 설정했을 때
 * 자동으로 index.d.ts 파일이 생성이 된다. (레퍼런스용)
 * 
 * d.ts 자동생성되는 경우 d.ts 파일 수정 불가. 
 * 읽기용 파일이라고 생각!
 */

let 이름 :string = '김';
type Age1 = number;

/**
 *  type / common / test.d.ts 적용한 후
 */
let 나이 :Age = 30;
