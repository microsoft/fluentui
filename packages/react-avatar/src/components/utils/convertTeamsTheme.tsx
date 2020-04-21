import { Theme } from './ThemeProvider';

const fontFaceStylesheet = `
@font-face {
  font-family: "Segoe UI Web (West European)";
  src: url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-light.woff2')
      format('woff2'),
    url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-light.woff')
      format('woff');
  font-weight: 100 299;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Segoe UI Web (West European)";
  src: url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-semilight.woff2')
      format('woff2'),
    url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-semilight.woff')
      format('woff');
  font-weight: 300 399;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Segoe UI Web (West European)";
  src: url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-regular.woff2')
      format('woff2'),
    url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-regular.woff')
      format('woff');
  font-weight: 400 599;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Segoe UI Web (West European)";
  src: url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-semibold.woff2')
      format('woff2'),
    url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-semibold.woff')
      format('woff');
  font-weight: 600 699;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Segoe UI Web (West European)";
  src: url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-bold.woff2')
      format('woff2'),
    url('https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean/segoeui-bold.woff')
      format('woff');
  font-weight: 700 999;
  font-style: normal;
  font-display: swap;
}
`;

const SegoeFontFamily =
  `"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont,` +
  ` Roboto, "Helvetica Neue", sans-serif`;

// tslint:disable-next-line:no-any
export const convertTeamsTheme = (theme: any): Theme => {
  const { siteVariables: v, componentVariables: c } = theme;
  const b = c.Button(v);
  const newTheme = {
    tokens: {
      site: {
        body: {
          fill: v.bodyBackground,
          text: v.bodyColor,
          fontFamily: SegoeFontFamily, // v.bodyFontFamily,
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
        fontWeight: 600,
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
    },
    stylesheets: [...theme.staticStyles, fontFaceStylesheet],
  };

  return newTheme as Theme;
};
