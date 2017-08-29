let { expect } = chai;
import { autobind } from './autobind';

class Greeter {
  // tslint:disable-next-line:no-inferrable-types
  private _hello: string = 'hello';

  @autobind
  public sayHello(): string {
    return this._hello;
  }
}

describe('autobind', () => {
  it('can bind a method', () => {
    let greeter = new Greeter();
    let sayHello = greeter.sayHello;

    expect(sayHello()).equals('hello', 'autobind did not bind the sayHello method to the object instance.');
  });

  it('does not bind again every time method is called', () => {
    let greeter = new Greeter();

    const sayHello1 = greeter.sayHello;
    const sayHello2 = greeter.sayHello;

    expect(sayHello1).equals(sayHello2, 'autobind did not cache the bound method.');
  });
});
