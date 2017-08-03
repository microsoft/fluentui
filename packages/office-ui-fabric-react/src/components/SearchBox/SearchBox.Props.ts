import * as React from 'react';
import { SearchBox } from './SearchBox';

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
}
