
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
        color: theme.semanticColors.bodyText,
        '&.ms-Fabric': { color: theme.semanticColors.bodyText }, // overwrite default ms-Fabric's color with one that themes
        '& button': inheritFont,
        '& input': inheritFont,
        '& textarea': inheritFont
      }
    ])
  };
});
