
import {
  memoizeFunction
} from '../../Utilities';
import {
  ITheme,
  IStyle,
  mergeStyles
} from '../../Styling';

const inheritFont = { fontFamily: 'inherit' };

export interface IFabricStyles {
  root: IStyle;
}

export const getStyles = memoizeFunction((
  theme: ITheme
): IFabricStyles => {
  return {
    root: mergeStyles([
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        '& button': inheritFont,
        '& input': inheritFont,
        '& textarea': inheritFont
      }
    ])
  };
});
