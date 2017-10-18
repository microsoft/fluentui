import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames, IVerticalDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.Props';
import { mergeStyleSets, getTheme } from '../../Styling';

export class VerticalDivider extends BaseComponent<IVerticalDividerProps, {}> {
  public render() {
    const theme = getTheme();
    const classNames = this.props.getClassNames ? this.props.getClassNames(theme) : getDividerClassNames(theme);

    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}