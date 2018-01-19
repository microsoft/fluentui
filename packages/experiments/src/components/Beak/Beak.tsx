import * as React from 'react';

import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';

export interface IBeakState { }

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  public render() {
    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div className={ css("ms-Beak", classNames.root) }>
      </div>
    );
  }
};