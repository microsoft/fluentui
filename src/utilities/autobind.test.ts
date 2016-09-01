let { expect } = chai;
import { autobind } from './autobind';

class Greeter {
  private _hello = 'hello';

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
});
