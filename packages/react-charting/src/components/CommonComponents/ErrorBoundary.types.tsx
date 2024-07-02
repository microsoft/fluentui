import { IStyle, IStyleFunctionOrObject } from '@fluentui/react';
import { ITheme } from '@fluentui/react/lib/Styling';

export interface IErrorBoundaryProps {
  /**
   * If true, the error boundary will show the empty state.
   */
  hasEmptyState?: boolean;

  /**
   * Custom error state message.
   */
  customErrorMsg?: string;

  /**
   * Custom empty data message.
   */
  customEmptyMsg?: string;

  /**
   * Handle error function to show custom error message.
   * @returns JSX.Element
   */
  handleError?: () => JSX.Element;

  /**
   * Handle empty state function to show custom empty state message.
   * @returns JSX.Element
   */
  handleEmptyState?: () => JSX.Element;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Width of the chart
   */
  width?: number;

  /**
   * Height of the chart
   */
  height?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IErrorBoundaryProps, IErrorBoundaryStyles>;

  /**
   * Additional CSS class(es) to apply to the Error Boundary.
   */
  className?: string;
}

export interface IErrorBoundaryStyles {
  /**
   * Styling for the root container
   */
  root: IStyle;

  /**
   * Additional CSS class(es) to apply to the Error Boundary.
   */
  className?: string;

  /**
   * Style for showing data load error main text
   */
  dataLoadErrorText: IStyle;

  /**
   * Style for showing data load error sub text
   */
  dataLoadErrorSubText: IStyle;

  /**
   * Style for showing error icon
   */
  errorIconDiv: IStyle;

  /**
   * Style for showing error icon in light theme
   */
  errorIconLightTheme: IStyle;

  /**
   * Style for showing error icon in dark theme
   */
  errorIconDarkTheme: IStyle;
}

export interface IErrorBoundaryStyleProps {
  /**
   * Additional CSS class(es) to apply to the Error Boundary.
   */
  className?: string;

  /**
   * Width of the error icon
   */
  width?: number;

  /**
   * Height of the error icon
   */
  height?: number;
}
