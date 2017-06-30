import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { StickyHeader } from 'office-ui-fabric-react/lib/StickyHeader';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { lorem } from '@uifabric/example-app-base';
import './ScrollablePane.Example.scss';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    let contentAreas: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
      contentAreas.push(this._createContentArea(i));
    }

    return (
      <div>
        <div>{ lorem(60) }</div>
        <ScrollablePane className='scrollablePaneDefaultExample'>
          { contentAreas.map((ele) => {
            return ele;
          }) }
        </ScrollablePane>
      </div>
    );
  }

  private _createHeader(index) {
    return (
      <div className='exampleContentHeader'>this is a new header for this content area { index }</div>
    );
  }

  private _createContentArea(index) {
    return (
      <div key={ index }>
        <StickyHeader>
          <div className='sticky'>
            THIS IS WRAPPED IN STICKY { index }
          </div>
        </StickyHeader>
        <div className='content'>
          THIS IS THE CONTEXT AREA FOR scrollable pane default example lorem ipsum blah blha blah
          THIS IS THE CONTEXT AREA FOR scrollable pane default example lorem ipsum blah blha blah
          </div>
      </div>
    );
  }
}
