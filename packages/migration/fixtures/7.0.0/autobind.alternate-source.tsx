import { autobind } from 'random-npm-package';

class Foo {
  @autobind
  private _foo() {
    return 'bar';
  }
}
