import * as React from 'react';
import { styled } from '../../Utilities';
import { SpinnerBase } from './Spinner.base';
import { getStyles } from './Spinner.styles';
import type { ISpinnerProps, ISpinnerStyles, ISpinnerStyleProps } from './Spinner.types';

export const Spinner: React.FunctionComponent<ISpinnerProps> = styled<
  ISpinnerProps,
  ISpinnerStyleProps,
  ISpinnerStyles
>(SpinnerBase, getStyles, undefined, { scope: 'Spinner' });
