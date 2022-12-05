/**
 * import / export 할게 많으면
 * namespace 쓰든가 import * as 쓰든가
 */
/**
 * "declaration": true 설정했을 때
 * 자동으로 index.d.ts 파일이 생성이 된다. (레퍼런스용)
 *
 * d.ts 자동생성되는 경우 d.ts 파일 수정 불가.
 * 읽기용 파일이라고 생각!
 */
declare let 이름: string;
declare type Age1 = number;
/**
 *  type / common / test.d.ts 적용한 후
 */
declare let 나이: Age;
