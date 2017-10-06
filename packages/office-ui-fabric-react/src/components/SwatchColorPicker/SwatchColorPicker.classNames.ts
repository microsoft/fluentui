import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  IPalette,
  mergeStyleSets,
  getFocusStyle
} from '../../Styling';

export interface ISwatchColorClassName {
  themeClass?: string | undefined;
}

export const getClassNames = memoizeFunction((
  theme: ITheme,
  color: string
): ISwatchColorClassName => {
  const themedColor: string | undefined = getSwatchThemeColor(theme, color);

  return mergeStyleSets({
    themeClass: [themedColor ?
      {
        fill: themedColor
      } :
      undefined
    ]
  });

});

function getSwatchThemeColor(theme: ITheme, color: string) {
  const palette: IPalette = theme.palette;
  switch (color) {
    case palette.neutralDark:
      return palette.neutralDark;
    case palette.neutralLight:
      return palette.neutralLight;
    case palette.neutralLighter:
      return palette.neutralLighter;
    case palette.neutralLighterAlt:
      return palette.neutralLighterAlt;
    case palette.neutralPrimary:
      return palette.neutralPrimary;
    case palette.neutralPrimaryAlt:
      return palette.neutralPrimaryAlt;
    case palette.neutralQuaternary:
      return palette.neutralQuaternary;
    case palette.neutralQuaternaryAlt:
      return palette.neutralQuaternaryAlt;
    case palette.neutralSecondary:
      return palette.neutralSecondary;
    case palette.neutralTertiary:
      return palette.neutralTertiary;
    case palette.neutralTertiaryAlt:
      return palette.neutralTertiaryAlt;
    case palette.themeDark:
      return palette.themeDark;
    case palette.themeDarkAlt:
      return palette.themeDarkAlt;
    case palette.themeDarker:
      return palette.themeDarker;
    case palette.themeLight:
      return palette.themeLight;
    case palette.themeLighter:
      return palette.themeLighter;
    case palette.themeLighterAlt:
      return palette.themeLighterAlt;
    case palette.themePrimary:
      return palette.themePrimary;
    case palette.themeSecondary:
      return palette.themeSecondary;
    case palette.themeTertiary:
      return palette.themeTertiary;
    default:
      return undefined;
  }
}
