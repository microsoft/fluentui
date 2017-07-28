import * as React from 'react';
import TeachingDialogContent from './TeachingDialogContent';
import { IImageProps } from '../Image/Image.Props';

/**
 * TeachingDialogPage props.
 */
export interface ITeachingDialogViewProps extends React.Props<TeachingDialogContent> {

  /**
   * headline is displayed outside of the dialog at the top center.
   */
  headline?: string;

  /**
   * The page title inside the dialog.
   */
  title: string;

  /**
   * The page text content.
   */
  textContent: string;

  /**
   * The string for the animation displayed on the page
   */
  image: IImageProps;

  /**
   * The text of the left button
   */
  leftButtonText: string;

  /**
   * The text of the right button
   */
  rightButtonText: string;

  /**
   * Optional flag for the left button to it lighter
   */
  isLeftButtonLight: boolean;

  /**
   * Optional flag for the right button to make it lighter
   */
  isRighButtonLight: boolean;

  /**
   * Optional callback for the left button in addition to the default behavior
   * By default, navigate to previous page, and close on the first page
   */
  onLeftButton?: () => void;

  /**
   * Optional callback for the right button in addition to the default behavior
   * By default, navigate to next page, and close on the last page
   */
  onRightButton?: () => void;
}