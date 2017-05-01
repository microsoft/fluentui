import * as React from 'react';
import {
  BaseComponent,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IPivotItemProps } from './PivotItem.Props';

export class PivotItem extends BaseComponent<IPivotItemProps, {}> {

  public render() {
    return (
      <div
        { ...getNativeProps(this.props, divProperties) }>
        { this.props.children }
      </div>
    );
  }
}
