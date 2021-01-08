import * as React from 'react';
import { ISelection } from '../../utilities/selection/interfaces';
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IStyleFunction } from '../../Utilities';

/**
 * {@docCategory MarqueeSelection}
 */
export interface IMarqueeSelection {}

/**
 * {@docCategory MarqueeSelection}
 */
export interface IMarqueeSelectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IMarqueeSelection interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IMarqueeSelection>;

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
   * @defaultvalue true
   */
  isEnabled?: boolean;

  /**
   * Optional flag to restrict the drag rect to the root element, instead of allowing the drag
   * rect to start outside of the root element boundaries.
   * @defaultvalue false
   */
  isDraggingConstrainedToRoot?: boolean;

  /**
   * Additional CSS class(es) to apply to the MarqueeSelection.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunction<IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>;
}

/**
 * {@docCategory MarqueeSelection}
 */
export interface IMarqueeSelectionStyleProps {
  theme: ITheme;
  className?: string;
}

/**
 * {@docCategory MarqueeSelection}
 */
export interface IMarqueeSelectionStyles {
  root?: IStyle;
  dragMask?: IStyle;
  box?: IStyle;
  boxFill?: IStyle;
}
