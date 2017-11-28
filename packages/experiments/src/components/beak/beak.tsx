import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { IbeakProps } from './beak.types';

export class beak extends BaseComponent < IbeakProps, {} > {
  public render() {
    return(
      <div>Hello World!</div>
    );
  }
};