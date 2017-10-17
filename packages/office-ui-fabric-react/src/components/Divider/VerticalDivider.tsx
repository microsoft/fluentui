import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.Props';

export class VerticalDivider extends BaseComponent<IVerticalDividerProps, {}> {
  public render() {
    const { dividerHeight, dividerColor, dividerHorizontalMargin } = this.props;
    const classNames = getDividerClassNames(dividerHeight, dividerColor, dividerHorizontalMargin || 0);

    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}