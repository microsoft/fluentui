import * as React from 'react';
import {
  BaseChiclet
} from '../BaseChiclet';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <BaseChiclet url="http://localhost:4322" size="medium"
        actions={ ["Breadcrumb", "Save", "Share"] }
      />
    );
  }

}