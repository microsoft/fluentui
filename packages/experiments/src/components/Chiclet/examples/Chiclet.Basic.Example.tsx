import * as React from 'react';
import {
  BaseChiclet
} from '../BaseChiclet';
import { ChicletSize } from '../Chiclet.types';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <BaseChiclet url="http://localhost:4322" size={ ChicletSize.medium }
        actions={ ["Breadcrumb", "Save", "Share"] }
      />
    );
  }

}