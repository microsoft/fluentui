import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const messageBarButtonStyles: IButtonStyles = {
      root: {
        height: 24,
        width: 84,
        borderColor: theme.palette.neutralTertiaryAlt
      }
    };

    return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles)!;
  }
);
