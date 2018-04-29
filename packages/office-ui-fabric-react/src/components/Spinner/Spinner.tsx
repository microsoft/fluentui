import { styled } from '../../Utilities';
import { SpinnerBase } from './Spinner.base';
import { getStyles } from './Spinner.styles';
import { ISpinnerProps } from './Spinner.types';

export const Spinner: (props: ISpinnerProps) => JSX.Element = styled(
  SpinnerBase,
  getStyles
);
