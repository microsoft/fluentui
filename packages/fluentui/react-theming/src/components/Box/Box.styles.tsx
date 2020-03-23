import { ITheme } from '../../theme.types';

// recipes (TODO: move these out.)
const backgroundColor = (t: ITheme) => t.colors.background;
const bodyText = (t: ITheme) => t.colors.bodyText;
const defaultFontFamily = (t: ITheme) => t.fonts.default;

export const BoxStyles = {
  root: {
    background: backgroundColor,
    color: bodyText,
    fontFamily: defaultFontFamily,
  },
};

export default BoxStyles;
