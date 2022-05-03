function hello() {
  bye();
}
function bye() {
  hello();
}
hello();