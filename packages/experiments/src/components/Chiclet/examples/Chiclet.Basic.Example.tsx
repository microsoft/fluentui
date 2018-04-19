import * as React from 'react';
import {
  Chiclet
} from '../Chiclet';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h2>Hello, this is a chiclet!</h2>
        <Chiclet url="https://bing.com" />
      </div>
    );
  }

}