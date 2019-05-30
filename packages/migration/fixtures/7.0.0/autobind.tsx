import { Foo } from 'bar';

import { IBaseProps, autobind } from 'office-ui-fabric-react/lib/Utilities';

class Foo {
  @autobind
  private _foo() {
    return 'bar';
  }
}
