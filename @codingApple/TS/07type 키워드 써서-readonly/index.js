var 동물;
var teacher1 = { name: 'john', age: 20 };
// typo 키워드를 안 쓰면 아래와 같이 보여진다.
var teacher2 = { name: 'john', age: 20 };
var 여친 = {
    name: '엠버'
};
/**
 * 한번 부여된 후엔 앞으로 바뀌면 안될 속성들을 readonly로 잠궈봅시다.
 * (물론 readonly는 컴파일시 에러를 내는 것일 뿐 변환된 js 파일 보시면 잘 바뀌긴 합니다)
 */
여친.name = '유라'; //readonly라서 에러남
var 네모2 = {
    width: 100
};
var 좌표 = { x: 1, y: 2 };
var 테스트1 = 20;
var 테스트2 = { x: 111 };
var myType1 = {
    size: 100,
    position: [1, 5, 7]
};
var myType2 = {
    name: 'kim',
    phone: 123014,
    email: 'test@nate.com',
};
var member = {
    name: 'kim',
    phone: 10101,
    Adult: true,
};
