import { ISpinButtonProps } from './SpinButton.types';
import { getStyles, getUpArrowButtonStyles, getDownArrowButtonStyles } from './SpinButton.styles';
import { styled } from '../../Utilities';
import { SpinButtonBase } from './SpinButton.base';

const getArrowButtonStyles = (props: ISpinButtonProps): Partial<ISpinButtonProps> => {
  return {
    getUpArrowButtonStyles,
    getDownArrowButtonStyles
  };
};

export const SpinButton = styled(
  SpinButtonBase,
  getStyles,
  getArrowButtonStyles
);
