import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;

  isHeader?: boolean;

  selected?: boolean;

  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;

  anySelected?: boolean;

  canSelect: boolean;

  /**
   * Optional className to attach to the slider root element.
   */
  className?: string;
}

export type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> &
  Pick<IDetailsRowCheckProps, 'isHeader' | 'selected' | 'isSelected' | 'anySelected' | 'canSelect' | 'className'> & {
    isVisible?: boolean;
  };

export interface IDetailsRowCheckStyles {
  root: IStyle;
  check: IStyle;
  owner: IStyle;
  isDisabled: IStyle;
  isSelected: IStyle;
  anySelected: IStyle;
  isVisible: IStyle;
}
