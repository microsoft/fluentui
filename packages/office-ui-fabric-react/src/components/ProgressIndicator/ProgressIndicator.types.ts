import * as React from 'react';
import { ProgressIndicatorBase } from './ProgressIndicator.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IProgressIndicator {
  focus: () => void;
}

export interface IProgressIndicatorProps extends React.Props<ProgressIndicatorBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IProgressIndicatorProps | null) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ProgressIndicator
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Label to display above the control.
   */
  label?: string;

  /**
   * Text describing or supplementing the operation.
   */
  description?: string;

  /**
   * Percentage of the operation's completeness. If this is not set, the indeterminate progress animation will be shown instead.
   */
  percentComplete?: number;

  /**
   * Text alternative of the progress status, used by screen readers for reading the value of the progress.
   */
  ariaValueText?: string;

  /**
   * Deprecated at v0.43.0, to be removed at >= v0.53.0. Use 'label' instead.
   * @deprecated
   */
  title?: string;
}

export interface IProgressIndicatorStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;
  indeterminate?: boolean;
  smoothTransition?: boolean;
}

export interface IProgressIndicatorStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  itemName: IStyle;
  itemDescription: IStyle;
  itemProgress: IStyle;
  progressTrack: IStyle;
  progressBar: IStyle;
}