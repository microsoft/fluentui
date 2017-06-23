import * as React from 'react';
import { ScrollablePane } from './ScrollablePane';

export interface IScrollablePaneProps extends React.Props<ScrollablePane> {
  /**
   * Class name to apply to the root in addition to ms-ScrollablePane.
  */
  className?: string;

  contentAreas: IContentArea[];
}

export interface IContentArea {
  content: JSX.Element;
}
