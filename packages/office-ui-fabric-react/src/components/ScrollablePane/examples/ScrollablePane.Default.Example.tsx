import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { StickyHeader } from 'office-ui-fabric-react/lib/StickyHeader';
import { lorem } from '@uifabric/example-app-base';
import './ScrollablePane.Example.scss';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    let contentAreas = [];
    for (let i = 0; i < 2; i++) {
      let newContent = {
        content: this._createContentArea(i)
      };
      contentAreas.push(newContent);
    }

    return (
      <div>
        <div>{ lorem(60) }</div>
        <ScrollablePane className='scrollablePaneDefaultExample' contentAreas={ contentAreas } />
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
      <div>
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
