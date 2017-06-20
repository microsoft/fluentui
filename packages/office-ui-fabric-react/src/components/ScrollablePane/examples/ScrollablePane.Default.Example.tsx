import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { lorem } from '@uifabric/example-app-base';
import './ScrollablePane.Example.scss';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    let contentAreas = [];
    for (let i = 0; i < 5; i++) {
      let newContent = {
        header: this._createHeader(i),
        content: this._createContentArea()
      };
      contentAreas.push(newContent);
    }

    return (
      <ScrollablePane contentAreas={ contentAreas } />
    );
  }

  private _createHeader(index) {
    return (
      <div className='exampleContentHeader'>this is a new header for this content area { index }</div>
    );
  }

  private _createContentArea() {
    return (
      <div>{ lorem(200) }</div>
    );
  }
}
