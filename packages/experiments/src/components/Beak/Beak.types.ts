import * as React from 'react';
import { Beak } from './Beak';
import { IStyle } from '../../Styling';

export interface IBeak {
}

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak) => void;
}
