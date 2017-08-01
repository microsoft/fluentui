import * as React from 'react';
import TeachingDialogContent from './TeachingDialogContent';

/**
 * TeachingDialogPage props.
 */
export interface ITeachingDialogViewProps extends React.Props<TeachingDialogContent> {

  /**
   * headline is displayed outside of the dialog at the top center.
   */
  headline?: string;

  /**
   * The string for the animation displayed on the page
   */
  image: string;

  /**
   * Optional flag for the left button to it lighter
   */
  isLeftButtonLight: boolean;

  /**
   * Optional flag for the right button to make it lighter
   */
  isRighButtonLight: boolean;

  /**
   * The text of the left button
   */
  leftButtonText: string;

  /**
   * Optional callback for the left button in addition to the default behavior
   * By default, left button navigate to previous page
   */
  onLeftButton?: () => void;

  /**
   * Optional callback for the right button in addition to the default behavior
   * By default, right button navigate to next page
   */
  onRightButton?: () => void;

  /**
   * The text of the right button
   */
  rightButtonText: string;

  /**
   * The page text content.
   */
  textContent: string;

  /**
   * The page title inside the dialog.
   */
  title: string;
}