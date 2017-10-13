import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { getDividerClassNames } from './Divider.classNames';

export class Divider extends BaseComponent<{}, {}> {
  public render() {
    const classNames = getDividerClassNames();
    return (
      <span className={ classNames.wrapper }>
        <span className={ classNames.divider } />
      </span>);
  }
}