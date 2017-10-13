import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames } from './Divider.classNames';
import { IDividerProps } from './Divider.Props';

export class Divider extends React.PureComponent<IDividerProps, {}> {
  public render() {
    const { dividerHeight, dividerColor, dividerHorizontalMargin } = this.props;
    const classNames = getDividerClassNames(dividerHeight, dividerColor, dividerHorizontalMargin || 0);
    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}