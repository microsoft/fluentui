import { styled } from '../../Utilities';
import { SpinnerBase } from './Spinner.base';
import { getStyles } from './Spinner.styles';
import { ISpinnerProps, ISpinnerStyles, ISpinnerStyleProps } from './Spinner.types';

export const Spinner: (props: ISpinnerProps) => JSX.Element = styled<ISpinnerProps, ISpinnerStyleProps, ISpinnerStyles>(
  SpinnerBase,
  getStyles,
  undefined,
  { scope: 'Spinner' }
);
