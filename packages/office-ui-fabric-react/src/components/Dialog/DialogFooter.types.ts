import * as React from 'react';
import { DialogFooterBase } from './DialogFooter.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IDialogFooterProps extends React.Props<DialogFooterBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IDialogFooterProps | null) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<IDialogFooterStyleProps, IDialogFooterStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
  * Optional override class name
  */
  className?: string;
}

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

export interface IDialogFooterStyles {
  /**
   * Style for the actions element.
   */
  actions: IStyle;

  actionsRight: IStyle;
  action: IStyle;
}