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
  upButton: string;
  downButton: string;
}

export const getClassNames = memoizeFunction((
  styles: ISpinButtonStyles,
  disabled: boolean,
  keyboardSpinDirection: KeyboardSpinDirection,
  labelPosition: Position
): ISpinButtonClassNames => {
  return {
    container: mergeStyles(
      styles.container
    ) as string,
    labelWrapper: mergeStyles(
      styles.labelWrapper,
      getStyleForLabelBasedOnPosition(labelPosition, styles)
    ) as string,
    icon: mergeStyles(
      styles.icon,
    ) as string,
    label: mergeStyles(
      styles.label
    ) as string,
    root: mergeStyles(
      styles.root,
      getStyleForRootBasedOnPosition(labelPosition, styles)
    ) as string,
    input: mergeStyles(
      styles.input,
      disabled && styles.inputDisabled,
    ) as string,
    arrowBox: mergeStyles(
      styles.arrowBox,
      disabled && styles.arrowBoxDisabled
    ) as string,
    upButton: mergeStyles(
      'ms-UpButton',
      styles.arrowButton,
      disabled && styles.arrowButtonDisabled
    ) as string,
    downButton: mergeStyles(
      'ms-DownButton',
      styles.arrowButton,
      disabled && styles.arrowButtonDisabled
    ) as string,
  };
});

/**
 * Returns the Style corresponding to the label position
 */
function getStyleForLabelBasedOnPosition(labelPosition: Position, styles: ISpinButtonStyles): IStyle {
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
function getStyleForRootBasedOnPosition(labelPosition: Position, styles: ISpinButtonStyles): IStyle {
  switch (labelPosition) {
    case Position.top:
    case Position.bottom:
      return styles.rootTopBottom;
    default:
      return {

      };
  }
}