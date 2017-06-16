import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { lorem } from '@uifabric/example-app-base';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    let contentAreas = [];
    for (let i = 0; i < 5; i++) {
      contentAreas.push(this._createContentArea());
    }

    return (
      <div>
        <ScrollablePane contentAreas={ contentAreas } />
      </div>
    );
  }

  private _createContentArea() {
    return (
      <div>{ lorem(200) }</div>
    );
  }
}
