interface Person {
  age :number,
  name :string
}

type PersonKeys = keyof Person;  // age | name
let a :PersonKeys = 'name'

// 타입 변환기 만들기
type Car = {
  color :boolean,
  model :boolean,
  price :boolean | number
}

// 맵핑(mapping)
type TypeChanger<MyType> = {
  [key in keyof MyType] :string
}
type 새로운타입 = TypeChanger<Car>

type Bus = {
  color : string,
  model : boolean,
  price : number
}

type TypeChanger2<OriType> = {
  [key in keyof OriType] :string | number
}

type NewBus = TypeChanger2<Bus>;

let objbus = {
  color : 'blue',
  model : 'ver2',
  price : 13000
}