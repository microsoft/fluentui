import * as React from 'react';
import { IPivotTitleProps } from './Pivot.Props';

export class PivotTitle extends React.Component<IPivotTitleProps, {}> {
  public render() {
    let { item } = this.props;

    return (
      <div className='ms-Pivot-title'>
        <span className='ms-Pivot-titleText'>{ item.name }</span>
        <span className='ms-Pivot-selectedTitleText' role='decoration'>{ item.name }</span>
      </div>
    );
  }
}
