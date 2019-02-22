import * as React from 'react';
import { ProgressIndicatorBase } from './ProgressIndicator.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject, IRenderFunction, IRefObject } from '../../Utilities';

export interface IProgressIndicator {
  focus: () => void;
}

export interface IProgressIndicatorProps extends React.ClassAttributes<ProgressIndicatorBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IProgressIndicator>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;

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
   * Label to display above the control. May be a string or React virtual elements.
   */
  label?: React.ReactNode;

  /**
   * Text describing or supplementing the operation. May be a string or React virtual elements.
   */
  description?: React.ReactNode;

  /**
   * Percentage of the operation's completeness, numerically between 0 and 1. If this is not set,
   * the indeterminate progress animation will be shown instead.
   */
  percentComplete?: number;

  /**
   * Whether or not to hide the progress state.
   */
  progressHidden?: boolean;

  /**
   * A render override for the progress track.
   */
  onRenderProgress?: IRenderFunction<IProgressIndicatorProps>;

  /**
   * Text alternative of the progress status, used by screen readers for reading the value of the progress.
   */
  ariaValueText?: string;

  /**
   * Deprecated at v0.43.0, to be removed at \>= v0.53.0. Use `label` instead.
   * @deprecated Use `label` instead.
   */
  title?: string;

  /**
   * Height of the ProgressIndicator
   * @defaultvalue 2
   */
  barHeight?: number;
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
  barHeight?: number;
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
