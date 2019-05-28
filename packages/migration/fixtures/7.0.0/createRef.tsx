import { createRef, fooBarBaz, IThing } from 'office-ui-fabric-react';
import * as React from 'react';

class Foo {
  private _r = createRef<IButton>();

  constructor(props: {}) {
    super(props);
    this.state = {};
  }
}
