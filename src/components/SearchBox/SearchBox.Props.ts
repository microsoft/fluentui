import * as React from 'react';
import { SearchBox } from './SearchBox';

export interface ISearchBoxProps extends React.Props<SearchBox> {

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
   * @deprecated
   * Deprecated at v0.52.2, to be removed at >= v1.0.0. Use 'onChange' instead.
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
}
