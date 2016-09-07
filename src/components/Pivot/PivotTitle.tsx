import * as React from 'react';
import { IPivotTitleProps } from './Pivot.Props';

export class PivotTitle extends React.Component<IPivotTitleProps, {}> {
  public render() {
    let { item } = this.props;

    return (
      <div className='ms-Pivot-title' data-selected-overlay={ item.name }>
        <span className='ms-Pivot-titleText'>{ item.name }</span>
      </div>
    );
  }
}
