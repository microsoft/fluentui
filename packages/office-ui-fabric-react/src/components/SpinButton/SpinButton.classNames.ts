import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
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

    ) as string,
    labelWrapper: mergeStyles(
    ) as string,
    icon: mergeStyles(

    ) as string,
    label: mergeStyles(

    ) as string,
    root: mergeStyles(

    ) as string,
    input: mergeStyles(
      disabled
    ) as string,
    arrowBox: mergeStyles(

    ) as string,
    upButton: mergeStyles(
      'ms-UpButton'
    ) as string,
    downButton: mergeStyles(
      'ms-DownButton'
    ) as string,
  };
});

/**
 * Returns the class name corresponding to the label position
 */
function getClassNameForLabelPosition(labelPosition: Position): string {
  let className: string = '';

  switch (labelPosition) {
    case Position.start:
      className = styles.start;
      break;
    case Position.end:
      className = styles.end;
      break;
    case Position.top:
      className = styles.top;
      break;
    case Position.bottom:
      className = styles.bottom;
  }

  return className;
}