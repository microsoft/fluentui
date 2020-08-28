import { ITheme, IStyle, IStyleFunctionOrObject } from 'office-ui-fabric-react';
export interface IChartHoverCardProps {
  /**
   * X  value for hover card
   */
  XValue?: string;

  /**
   * Y value for hover card
   */
  YValue?: string | number | Date;

  /**
   * Legend value  for hover card
   */
  Legend?: string | number | Date;

  /**
   * color for hover card
   */
  color?: string;
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChartHoverCardStyleProps, IChartHoverCardStyles>;
}

export interface IChartHoverCardStyles {
  /**
   * styles for callout root-content
   */
  calloutContentRoot?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutDateTimeContainer?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutInfoContainer?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutBlockContainer?: IStyle;

  /**
   * styles for callout y-content
   */
  calloutlegendText?: IStyle;

  /**
   * styles for callout x-content
   */
  calloutContentX?: IStyle;
  /**
   * styles for callout y-content
   */
  calloutContentY?: IStyle;
}

export interface IChartHoverCardStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * color for hover card
   */
  color?: string;

  /**
   * X  value for hover card
   */
  XValue?: string;
}
