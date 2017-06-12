import * as React from 'react';
import { ISelection } from '../../utilities/selection/interfaces';
import { MarqueeSelection } from './MarqueeSelection';

export interface IMarqueeSelection {

}

export interface IMarqueeSelectionProps extends React.Props<MarqueeSelection> {
  /**
   * Optional callback to access the IMarqueeSelection interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IMarqueeSelection) => void;

  /**
   * The selection object to interact with when updating selection changes.
   */
  selection: ISelection;

  /**
   * Optional props to mix into the root DIV element.
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Optional callback that is called, when the mouse down event occurs, in order to determine
   * if we should start a marquee selection. If true is returned, we will cancel the mousedown
   * event to prevent upstream mousedown handlers from executing.
   */
  onShouldStartSelection?: (ev: MouseEvent) => boolean;

  /**
   * Optional flag to control the enabled state of marquee selection. This allows you to render
   * it and have events all ready to go, but conditionally disable it. That way transitioning
   * between enabled/disabled generate no difference in the DOM.
   * @default true
   */
  isEnabled?: boolean;

  /**
   * Optional flag to restrict the drag rect to the root element, instead of allowing the drag
   * rect to start outside of the root element boundaries.
   * @default false
   */
  isDraggingConstrainedToRoot?: boolean;
}
