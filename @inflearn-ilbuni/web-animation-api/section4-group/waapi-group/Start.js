export default class Start {
  constructor(number) {
    this.element = document.createElement('div');
    this.element.classList.add('star');
    this.element.innerHTML = number;
    document.body.append(this.element);
  }
}