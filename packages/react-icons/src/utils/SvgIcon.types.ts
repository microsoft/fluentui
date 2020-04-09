import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

// TODO: Do we want to align APIs for the SvgIconProps in both versions?
export interface ISvgIconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom class to style the icon.
   */
  className?: string;
}

export interface ISvgIconStyles {
  root?: IStyle;
}
