import * as React from 'react';
import { ITheme, IStyle } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface ISearchBox {
  /**
   * Sets focus inside the search input box.
   */
  focus(): void;
}

export interface ISearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ISearchBox) => void;

  /**
  * Label text for the SearchBox.
  * @default "Search"
  */
  labelText?: string;

  /**
  * Callback function for when the typed input for the SearchBox has changed.
  */
  onChange?: (newValue: any) => void;

  /**
   * Callback executed when the user presses enter in the search box.
   */
  onSearch?: (newValue: any) => void;

  /**
   * Callback executed when the user clears the search box by either clicking 'X' or hitting escape.
   */
  onClear?: (ev?: any) => void;

  /**
   * Callback executed when the user presses escape in the search box.
   */
  onEscape?: (ev?: any) => void;

  /**
   * Deprecated at v0.52.2, use 'onChange' instead.
   * @deprecated
   */
  onChanged?: (newValue: any) => void;

  /**
  * The value of the text in the SearchBox.
  */
  value?: string;

  /**
  * CSS class to apply to the SearchBox.
  */
  className?: string;

  /**
   * The aria label of the SearchBox for the benefit of screen readers.
   * @defaultvalue labelText
   */
  ariaLabel?: string;

  /**
   * Whether or not the SearchBox is underlined.
   * @default false
   */
  underlined?: boolean;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<ISearchBoxProps, ISearchBoxStyles>;
}

export interface ISearchBoxStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  hasFocus?: boolean;
  underlined?: boolean;
  hasInput?: boolean;
}

export interface ISearchBoxStyles {
  root?: IStyle;
  iconContainer?: IStyle;
  icon?: IStyle;
  field?: IStyle;
  clearButton?: IStyle;
}