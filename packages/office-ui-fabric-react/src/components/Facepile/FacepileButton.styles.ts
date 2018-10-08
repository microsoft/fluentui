import { ITheme, concatStyleSets } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { IButtonStyles } from '../../Button';
import { getStyles as getBaseButtonStyles } from '../Button/BaseButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);

    return concatStyleSets(baseButtonStyles, customStyles)!;
  }
);
