var 네모 = { color: 'red', width: 100 };
var 변수 = { name: 'kim', age: 90 };
var 변수11 = { name: '멍멍' };
var 상품 = { brand: 'Samsung', serialNumber: 1360, model: ['TV', 'phone'] };
var 장바구니 = [{ product: '청소기', price: 7000 }, { product: '삼다수', price: 800 }];
var 장바구니2 = [{ product: '청소기', price: 7000, card: false }];
var objFnc = {
    plus: function (a, b) {
        return a + b;
    },
    minus: function (a, b) {
        return a - b;
    }
};
console.log(objFnc.plus(4, 9)); // 13
console.log(objFnc.minus(100, 43)); // 57
