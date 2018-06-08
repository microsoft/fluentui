import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react';

import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

// TODO: consider view vs. state props. should they be identical?
//       do we want to have private view props that aren't exposed beyond combined component?

export interface ICollapsibleSectionProps extends React.Props<{}> {
  // TODO: how to incorporate className into createComponent?
  className?: string;

  /**
   * Default and initial collapsed state if collapsed prop is not provided.
   * @default true
   */
  defaultCollapsed?: boolean;

  /**
   * Component to use for CollapsibleSection title.
   */
  // TODO: make optional and use CollapsibleSectionTitle by default
  titleAs: React.ReactType<ICollapsibleSectionTitleProps>;

  /**
   * Optional title props to pass onto title component.
   */
  titleProps?: ICollapsibleSectionTitleProps;
}

export interface ICollapsibleSectionStyles {
  /**
   * Styling for the body content.
   */
  body: IStyle;
}
