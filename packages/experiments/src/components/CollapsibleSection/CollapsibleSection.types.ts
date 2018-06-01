import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react';

import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

// TODO: consider view vs. state props. should they be identical?
//       do we want to have private view props that aren't exposed beyond combined component?

export interface ICollapsibleSectionProps extends React.Props<{}> {
  // TODO: how to incorporate className into createComponent?
  className?: string;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  titleAs: React.ReactType<ICollapsibleSectionTitleProps>;
  titleProps?: ICollapsibleSectionTitleProps;
}

export interface ICollapsibleSectionStyles {
  child: IStyle;
}
