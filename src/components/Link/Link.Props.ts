import * as React from 'react';
import Link from './Link';

export interface ILinkProps extends React.Props<Link> {
  /**
   * Text to display as the link
   */
  text: string;

  /**
   * Url to navigate to upon activation
   */
  url: string;

  /**
   * Target window for the link navigation
   */
  target?: string;
}