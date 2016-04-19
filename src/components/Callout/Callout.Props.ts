import * as React from 'react';
import Callout from './Callout';

export interface ICalloutProps extends React.Props<Callout> {
  /**
   * The title text for the callout
   */
  title: string;

  /**
   * The subtext for the callout.
   */
  subText: string;

  /**
   * Dirction that the arrow should point.
   * @defaultvalue ArrowDirection.left
   */
  arrowDirection?: ArrowDirection;

  /**
   * A list of additional links to render in the callout
   */
  links?: ILink[];
}

export enum ArrowDirection {
  left,
  top,
  right,
  bottom
}

export interface ILink {
  name: string;
  url: string;
}