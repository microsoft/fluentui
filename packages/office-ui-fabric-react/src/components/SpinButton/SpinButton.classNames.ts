import { memoizeFunction } from '../../Utilities';
import { mergeStyles, IStyle } from '../../Styling';
import { ISpinButtonStyles } from './SpinButton.Props';
import { KeyboardSpinDirection } from './SpinButton';
import { Position } from '../../utilities/positioning';

export interface ISpinButtonClassNames {
  container: string;
  labelWrapper: string;
  icon: string;
  label: string;
  root: string;
  input: string;
  arrowBox: string;
}

export const getClassNames = memoizeFunction((
  styles: ISpinButtonStyles,
  disabled: boolean,
  isFocused: boolean,
  keyboardSpinDirection: KeyboardSpinDirection,
  labelPosition: Position
): ISpinButtonClassNames => {
  return {
    container: mergeStyles(
      styles.container
    ) as string,
    labelWrapper: mergeStyles(
      styles.labelWrapper,
      _getStyleForLabelBasedOnPosition(labelPosition, styles)
    ) as string,
    icon: mergeStyles(
      styles.icon,
    ) as string,
    label: mergeStyles(
      styles.label
    ) as string,
    root: mergeStyles(
      styles.root,
      _getStyleForRootBasedOnPosition(labelPosition, styles),
      !disabled && [
        {
          ':hover': styles.rootHovered
        },
        isFocused && {
          // This is to increase the specifity of the focus styles
          // and make it equal to that of the hover styles.
          '&&': styles.rootFocused
        }
      ],
      disabled && styles.rootDisabled
    ) as string,
    input: mergeStyles(
      'ms-spinButton-input',
      styles.input,
      !disabled && {
        '::selection': styles.inputTextSelected
      },
      disabled && styles.inputDisabled,
    ) as string,
    arrowBox: mergeStyles(
      styles.arrowButtonsContainer,
      disabled && styles.arrowButtonsContainerDisabled
    ) as string,
  };
});

/**
 * Returns the Style corresponding to the label position
 */
function _getStyleForLabelBasedOnPosition(labelPosition: Position, styles: ISpinButtonStyles): IStyle {
  switch (labelPosition) {
    case Position.start:
      return styles.labelWrapperStart;
    case Position.end:
      return styles.labelWrapperEnd;
    case Position.top:
      return styles.labelWrapperTop;
    case Position.bottom:
      return styles.labelWrapperBottom;
  }
}

/**
 * Returns the Style corresponding to the label position
 */
function _getStyleForRootBasedOnPosition(labelPosition: Position, styles: ISpinButtonStyles): IStyle {
  switch (labelPosition) {
    case Position.top:
    case Position.bottom:
      return styles.rootTopBottom;
    default:
      return {

      };
  }
}