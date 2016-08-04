import * as React from 'react';
import { ISelection } from './interfaces';
import { MarqueeSelection } from './MarqueeSelection';

export interface IMarqueeSelectionProps extends React.Props<MarqueeSelection> {
  /**
   * The selection object to interact with when updating selection changes.
   */
  selection: ISelection;

  /**
   * The base element tag name to render the marquee bounding area within.
   * @default div
   */
  rootTagName?: string;

  /**
   * Optional props to mix into the root element.
   */
  rootProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * Optional callback that is called, when the mouse down event occurs, in order to determine
   * if we should start a marquee selection. If true is returned, we will cancel the mousedown
   * event to prevent upstream mousedown handlers from executing.
   */
  onShouldStartSelection?: (ev: React.MouseEvent) => boolean;
}
