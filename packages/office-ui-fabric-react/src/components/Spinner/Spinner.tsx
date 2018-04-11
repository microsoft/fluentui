import { styled } from '../../Utilities';
import { SpinnerBase } from './Spinner.base';
import { ISpinnerProps } from './Spinner.types';
import { getStyles } from './Spinner.styles';

export const Spinner = styled(
  SpinnerBase,
  getStyles
);