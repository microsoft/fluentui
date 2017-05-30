
import {
  memoizeFunction,
} from '../../Utilities';
import {
  ITheme,
  IStyle,
  getTheme
} from '../../Styling';

const inheritFont = { fontFamily: 'inherit' };

export interface IFabricStyles {
  root: IStyle;
}

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme()
): IFabricStyles => {
  return {
    root: [
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        '& button': inheritFont,
        '& input': inheritFont
      }
    ]
  };
});
