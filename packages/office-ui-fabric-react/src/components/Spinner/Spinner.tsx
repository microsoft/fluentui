import { styled } from '../../Utilities';
import { SpinnerBase } from './Spinner.base';
import { getStyles } from './Spinner.styles';
// tslint:disable-next-line:no-unused-variable
import { ISpinnerProps } from './Spinner.types';

export const Spinner = styled(
  SpinnerBase,
  getStyles
);
