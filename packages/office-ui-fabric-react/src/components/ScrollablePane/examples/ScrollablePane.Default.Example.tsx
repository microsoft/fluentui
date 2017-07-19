import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky } from 'office-ui-fabric-react/lib/Sticky';
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
    for (let i = 0; i < 4; i++) {
      contentAreas.push(this._createContentArea(i));
    }

    return (
      <div>
        <div className='largeSpacing'></div>
        <ScrollablePane className='scrollablePaneDefaultExample'>
          { contentAreas.map((ele) => {
            return ele;
          }) }
        </ScrollablePane>
        <div className='largeSpacing'></div>
      </div>
    );
  }

  private _getRandomColor() {
    let letters = 'BCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  private _createContentArea(index: number) {
    const style = {
      backgroundColor: this._getRandomColor()
    }

    return (
      <div key={ index }>
        <div className='spacing'></div>
        <Sticky>
          <div className='sticky' style={ style }>
            Sticky Component #{ index }
          </div>
        </Sticky>
      </div>
    );
  }
}
