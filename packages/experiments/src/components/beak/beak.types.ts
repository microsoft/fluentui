import * as React from 'react';
import { beak } from './beak';
import { IStyle } from '../../Styling';

export interface Ibeak {
}

export interface IbeakProps extends React.Props<beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: Ibeak) => void;
}
