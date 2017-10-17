import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.Props';

export class VerticalDivider extends BaseComponent<IVerticalDividerProps, {}> {
  public render() {
    const classNames = getDividerClassNames();

    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}