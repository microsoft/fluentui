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
