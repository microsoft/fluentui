import * as React from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { lorem } from '@uifabric/example-app-base';
import './ScrollablePane.Example.scss';

const colors = [
  '#eaeaea',
  '#dadada',
  '#d0d0d0',
  '#c8c8c8',
  '#a6a6a6',
  '#c7e0f4',
  '#71afe5',
  '#eff6fc',
  '#deecf9'
];

export class ScrollablePaneDefaultExample extends React.Component {
  public render() {
    const contentAreas: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      contentAreas.push(this._createContentArea(i));
    }

    return (
      <div
        style={ {
          height: '900px',
          position: 'relative',
          maxHeight: 'inherit'
        } }
      >
        <ScrollablePane className='scrollablePaneDefaultExample'>
          { contentAreas.map((ele) => {
            return ele;
          }) }
        </ScrollablePane>
      </div>
    );
  }

  private _createContentArea(index: number) {
    const color = colors.splice(Math.floor(Math.random() * colors.length), 1)[0];

    return (
      <div
        key={ index }
        style={ {
          backgroundColor: color
        } }
      >
        <Sticky
          stickyPosition={ StickyPositionType.Both }
        >
          <div className='sticky'>
            Sticky Component #{ index + 1 }
          </div>
        </Sticky>
        <div className='textContent'>
          { lorem(200) }
        </div>
      </div>
    );
  }
}
