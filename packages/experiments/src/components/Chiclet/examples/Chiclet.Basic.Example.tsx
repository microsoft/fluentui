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
        <Chiclet url="http://localhost:4322" size="medium" />
      </div>
    );
  }

}