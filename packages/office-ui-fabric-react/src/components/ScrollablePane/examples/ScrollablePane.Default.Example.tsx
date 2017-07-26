import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Sticky } from 'office-ui-fabric-react/lib/Sticky';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './ScrollablePane.Example.scss';

export class ScrollablePaneDefaultExample extends React.Component<any, any> {
  constructor() {
    super();
  }

  public render() {
    let contentAreas: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      contentAreas.push(this._createContentArea(i));
    }

    return (
      <ScrollablePane className='scrollablePaneDefaultExample'>
        <div className='largeSpacing'></div>
        { contentAreas.map((ele) => {
          return ele;
        }) }
        <div className='largeSpacing'></div>
      </ScrollablePane>
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
    };

    return (
      <div key={ index }>
        <div className='spacing'></div>
        <Sticky
          stickyClassName='largeFont'>
          <div className='sticky' style={ style }>
            Sticky Component #{ index + 1 }
          </div>
        </Sticky>
      </div>
    );
  }
}
