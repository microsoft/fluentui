import * as React from 'react';
import { DialogFooterBase } from './DialogFooter.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Dialog}
 */
export interface IDialogFooter {}

/**
 * {@docCategory Dialog}
 */
export interface IDialogFooterProps extends React.Props<DialogFooterBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDialogFooter>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDialogFooterStyleProps, IDialogFooterStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogFooterStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogFooterStyles {
  /**
   * Style for the actions element.
   */
  actions: IStyle;

  actionsRight: IStyle;
  action: IStyle;
}
