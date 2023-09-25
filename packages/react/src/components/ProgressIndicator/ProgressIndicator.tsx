import * as React from 'react';
import { styled } from '../../Utilities';
import { ProgressIndicatorBase } from './ProgressIndicator.base';
import { getStyles } from './ProgressIndicator.styles';
import type {
  IProgressIndicatorProps,
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles,
} from './ProgressIndicator.types';

/**
 * ProgressIndicator description
 */
export const ProgressIndicator: React.FunctionComponent<IProgressIndicatorProps> = styled<
  IProgressIndicatorProps,
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles
>(ProgressIndicatorBase, getStyles, undefined, { scope: 'ProgressIndicator' });
