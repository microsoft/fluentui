import * as React from 'react';
import {
  Chiclet
} from '../Chiclet';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    var styles = {
      "border": "solid",
    }

    return (
      <div style={ styles }>
        <p>Hello, this is a chiclet!</p>
        <Chiclet url="https://bing.com">
        </Chiclet>
      </div>
    );
  }

}