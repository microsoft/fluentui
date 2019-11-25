import { memoizeFunction } from '../../Utilities';
import { mergeStyles, IStyle } from '../../Styling';
import { ISpinButtonStyles } from './SpinButton.types';
import { KeyboardSpinDirection } from './SpinButton';
import { Position } from '../../utilities/positioning';

export interface ISpinButtonClassNames {
  root: string;
  labelWrapper: string;
  icon: string;
  label: string;
  spinButtonWrapper: string;
  input: string;
  arrowBox: string;
}

export const getClassNames = memoizeFunction(
  (
    styles: ISpinButtonStyles,
    disabled: boolean,
    isFocused: boolean,
    keyboardSpinDirection: KeyboardSpinDirection,
    labelPosition: Position = Position.start,
    className: string | undefined = undefined
  ): ISpinButtonClassNames => {
    return {
      root: mergeStyles(styles.root, className),
      labelWrapper: mergeStyles(styles.labelWrapper, _getStyleForLabelBasedOnPosition(labelPosition, styles)),
      icon: mergeStyles(styles.icon, disabled && styles.iconDisabled),
      label: mergeStyles(styles.label),
      spinButtonWrapper: mergeStyles(
        styles.spinButtonWrapper,
        _getStyleForRootBasedOnPosition(labelPosition, styles),
        !disabled && [
          {
            selectors: {
              ':hover': styles.spinButtonWrapperHovered
            }
          },
          isFocused && {
            // This is to increase the specificity of the focus styles
            // and make it equal to that of the hover styles.
            selectors: {
              '&&': styles.spinButtonWrapperFocused
            }
          }
        ],
        disabled && styles.spinButtonWrapperDisabled
      ),
      input: mergeStyles(
        'ms-spinButton-input',
        styles.input,
        !disabled && {
          selectors: {
            '::selection': styles.inputTextSelected
          }
        },
        disabled && styles.inputDisabled
      ),
      arrowBox: mergeStyles(styles.arrowButtonsContainer, disabled && styles.arrowButtonsContainerDisabled)
    };
  }
);

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
      return styles.spinButtonWrapperTopBottom;
    default:
      return {};
  }
}
