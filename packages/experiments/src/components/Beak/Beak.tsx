import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { IBeakProps } from './Beak.types';

export class Beak extends BaseComponent < IBeakProps, {} > {
  public render() {
    return(
      <div>Hello World!</div>
    );
  }
};