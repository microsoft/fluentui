import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames, IVerticalDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.Props';
import { mergeStyleSets } from '../../Styling';

export class VerticalDivider extends BaseComponent<IVerticalDividerProps, {}> {
  public render() {
    const classNames: IVerticalDividerClassNames = mergeStyleSets(getDividerClassNames(), this.props.classNames);

    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}