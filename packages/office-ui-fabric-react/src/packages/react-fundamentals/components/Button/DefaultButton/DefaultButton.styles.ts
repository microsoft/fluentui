import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, FontWeights } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';

import { primaryStyles, standardStyles } from '../ButtonThemes';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MIN_WIDTH = '80px';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, primary?: boolean): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
    const defaultButtonStyles: IButtonStyles = {
      root: {
        minWidth: DEFAULT_BUTTON_MIN_WIDTH,
        height: DEFAULT_BUTTON_HEIGHT
      },
      label: {
        fontWeight: FontWeights.semibold
      }
    };

    return concatStyleSets(
      baseButtonStyles,
      defaultButtonStyles,
      primary ? primaryStyles(theme) : standardStyles(theme),
      splitButtonStyles,
      customStyles
    )!;
  }
);
