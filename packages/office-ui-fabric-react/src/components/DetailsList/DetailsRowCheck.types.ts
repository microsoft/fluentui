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

  /**
   * Is the check part of the header in a DetailsList
   */
  isHeader?: boolean;

  /**
   * Whether or not this check is selected
   */
  selected?: boolean;

  /**
   * Deprecated. Use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;

  /**
   * Is any selected - also true for isSelectionModal
   */
  anySelected?: boolean;

  /**
   * Can this checkbox be selectable
   */
  canSelect: boolean;

  /**
   * Is this in compact mode?
   */
  compact?: boolean;

  /**
   * Optional className to attach to the slider root element.
   */
  className?: string;
}

export type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> &
  Pick<IDetailsRowCheckProps, 'isHeader' | 'selected' | 'isSelected' | 'anySelected' | 'canSelect' | 'className'> & {
    isVisible?: boolean;
    compact?: boolean;
  };

export interface IDetailsRowCheckStyles {
  root: IStyle;
  check: IStyle;
  isDisabled: IStyle;
}
