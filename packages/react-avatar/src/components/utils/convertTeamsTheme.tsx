import { Theme } from './ThemeProvider';

// tslint:disable-next-line:no-any
export const convertTeamsTheme = (theme: any): Theme => {
  const { siteVariables: v, componentVariables: c } = theme;
  const b = c.Button(v);
  const newTheme = {
    site: {
      body: {
        fill: v.bodyBackground,
        text: v.bodyColor,
        fontFamily: v.bodyFontFamily,
        fontWeight: v.bodyFontWeight,
        fontSize: v.bodyFontSize,
        fontLineHeight: v.bodyFontLineHeight,
        margin: v.bodyMargin,
        padding: v.bodyPadding,
      },
      accent: {
        fill: {
          default: b.primaryBackgroundColor,
          hover: b.primaryBackgroundColorHover,
          active: b.primaryBackgroundColorActive,
          disabled: b.primaryBackgroundColorDisabled,
        },
        text: {
          default: b.primaryColor,
          hover: b.primaryColorHover,
          active: b.primaryColorActive,
          disabled: b.primaryColorDisabled,
        },
        borderColor: b.primaryBorderColor,
      },
    },
    button: {
      fill: {
        default: b.backgroundColor,
        hover: b.backgroundColorHover,
        active: b.backgroundColorActive,
        disabled: b.backgroundColorDisabled,
      },
      text: {
        default: b.color,
        hover: b.colorHover,
        active: b.colorActive,
        disabled: b.colorDisabled,
      },
      borderColor: {
        default: b.borderColor,
        hover: b.borderColorHover,
        active: b.borderColorActive,
        disabled: b.borderColorDisabled,
      },
      boxShadow: b.boxShadow,
    },
  };

  return newTheme as Theme;
};
