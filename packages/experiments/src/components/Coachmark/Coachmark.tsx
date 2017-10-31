import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';

export class Coachmark extends BaseComponent < ICoachmarkProps, {} > {
  public render() {
    return(
      <div>Hello World!</div>
    );
  }
};