import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <ScrollablePane />
      </div>
    );
  }
}
