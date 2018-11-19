import { styled } from '../../Utilities';
import { IProgressIndicatorProps, IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types';
import { ProgressIndicatorBase } from './ProgressIndicator.base';
import { getStyles } from './ProgressIndicator.styles';

/**
 * ProgressIndicator description
 */
export const ProgressIndicator = styled<IProgressIndicatorProps, IProgressIndicatorStyleProps, IProgressIndicatorStyles>(
  ProgressIndicatorBase,
  getStyles,
  undefined,
  { scope: 'ProgressIndicator' }
);
