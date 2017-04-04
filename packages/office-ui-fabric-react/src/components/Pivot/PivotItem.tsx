import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { IPivotItemProps } from './PivotItem.Props';

export class PivotItem extends BaseComponent<IPivotItemProps, {}> {

  public render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
