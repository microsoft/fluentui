import * as React from 'react';
import { DialogFooterBase } from './DialogFooter.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IDialogFooterProps extends React.Props<DialogFooterBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IDialogFooterProps) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<IDialogFooterStyleProps, IDialogFooterStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the DialogFooter
   * @defaultvalue undefined
   */
  className?: string;

  // Insert DialogFooter props below
}

export interface IDialogFooterStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert DialogFooter style props below
}

export interface IDialogFooterStyles {
  /**
   * Style for the root element.
   */
  actions?: IStyle;

  // Insert DialogFooter classNames below
}