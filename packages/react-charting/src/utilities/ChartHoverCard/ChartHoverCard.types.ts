import { ITheme, IStyle, IStyleFunctionOrObject } from '@fluentui/react';
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
   * ratio to show
   * first number is numerator
   * and second number is denominator
   */
  ratio?: [number, number];
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
  /**
   * description message in the callout
   */
  descriptionMessage?: string;
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChartHoverCardStyleProps, IChartHoverCardStyles>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;
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
  /**
   * styles for denomination
   */
  ratio?: IStyle;
  /**
   * styles for numerator
   */
  numerator?: IStyle;
  /**
   * styles for denominator
   */
  denominator?: IStyle;
  /**
   * styles for the description
   */
  descriptionMessage?: IStyle;
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

  /**
   * indicate if denomination is present
   */
  isRatioPresent?: boolean;
}
