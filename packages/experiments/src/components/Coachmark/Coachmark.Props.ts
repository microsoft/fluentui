import * as React from 'react';
import { Coachmark } from './Coachmark';

export interface ICoachmark {
}

export interface ICoachmarkProps extends React.Props<Coachmark> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: ICoachmark) => void;
}
