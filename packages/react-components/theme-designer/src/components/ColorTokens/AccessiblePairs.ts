export type AccessiblePairs = Record<string, [string, number][]>;

/**
 * Made using token pairs as defined in this spreadsheet:
 * https://microsoft-my.sharepoint.com/:x:/p/t-emmajiang/Ec_h-Eb-fd9LmXNWgFmNwBYBZNaHRQFoUFVxsfCeB2YCAQ?e=Q9S6z9
 *
 * For components that need to be tested against a transparent background, only colorNeutralBackground1 is tested.
 */
export const accessiblePairs: AccessiblePairs = {
  colorNeutralForeground2BrandHover: [
    ['colorTransparentBackgroundHover', 4.5],
    ['colorSubtleBackgroundHover', 3],
  ],
  colorNeutralForeground2BrandPressed: [
    ['colorTransparentBackgroundPressed', 4.5],
    ['colorSubtleBackgroundPressed', 3],
  ],
  colorNeutralForeground2BrandSelected: [
    ['colorTransparentBackgroundSelected', 4.5],
    ['colorSubtleBackgroundSelected', 3],
  ],
  colorNeutralForeground3BrandHover: [],
  colorNeutralForeground3BrandPressed: [],
  colorNeutralForeground3BrandSelected: [],
  colorBrandForegroundLink: [['colorNeutralBackground1', 4.5]],
  colorBrandForegroundLinkHover: [['colorNeutralBackground1', 4.5]],
  colorBrandForegroundLinkPressed: [['colorNeutralBackground1', 4.5]],
  colorBrandForegroundLinkSelected: [['colorNeutralBackground1', 4.5]],
  colorCompoundBrandForeground1: [
    ['colorNeutralBackground1', 3],
    ['colorTransparentBackground', 3],
    ['colorSubtleBackground', 3],
  ],
  colorCompoundBrandForeground1Hover: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralBackground1Hover', 3],
    ['colorTransparentBackgroundHover', 3],
    ['colorSubtleBackgroundHover', 3],
  ],
  colorCompoundBrandForeground1Pressed: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralBackground1Pressed', 3],
    ['colorTransparentBackgroundPressed', 3],
    ['colorSubtleBackgroundPressed', 3],
  ],
  colorBrandForeground1: [['colorNeutralBackground1', 4.5]],
  colorBrandForeground2: [['colorBrandBackground2', 4.5]],
  colorBrandForegroundInverted: [],
  colorBrandForegroundInvertedHover: [],
  colorBrandForegroundInvertedPressed: [],
  colorBrandForegroundOnLight: [],
  colorBrandForegroundOnLightHover: [],
  colorBrandForegroundOnLightPressed: [],
  colorBrandForegroundOnLightSelected: [],
  colorBrandBackground: [
    ['colorNeutralForegroundOnBrand', 4.5],
    ['colorNeutralForegroundInvertedLink', 4.5],
    ['colorNeutralForegroundInvertedLinkHover', 4.5],
    ['colorNeutralForegroundInvertedLinkPressed', 4.5],
    ['colorNeutralForegroundInvertedLinkSelected', 4.5],
  ],
  colorBrandBackgroundHovered: [['colorNeutralForegroundOnBrand', 4.5]],
  colorBrandBackgroundPressed: [['colorNeutralForegroundOnBrand', 4.5]],
  colorBrandBackgroundSelected: [['colorNeutralForegroundOnBrand', 4.5]],
  colorCompoundBrandBackground: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralForegroundOnBrand', 3],
  ],
  colorCompoundBrandBackgroundHover: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralForegroundOnBrand', 3],
  ],
  colorCompoundBrandBackgroundPressed: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralForegroundOnBrand', 3],
  ],
  colorBrandBackgroundStatic: [['colorNeutralForegroundOnBrand', 4.5]],
  colorBrandBackground2: [['colorBrandForeground2', 4.5]],
  colorBrandBackgroundInvertedHover: [],
  colorBrandBackgroundInvertedPressed: [],
  colorBrandBackgroundInvertedSelected: [],
  colorNeutralStrokeAccessibleSelected: [],
  colorBrandStroke1: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralBackground4', 3],
  ],
  colorBrandStroke2: [],
  colorCompoundBrandStroke: [
    ['colorNeutralBackground1', 3],
    ['colorNeutralBackground3', 3],
    ['colorTransparentBackground', 3],
    ['colorSubtleBackground', 3],
  ],
  colorCompoundBrandStrokeHover: [
    ['colorNeutralBackground1', 3],
    ['colorTransparentBackgroundHover', 3],
    ['colorSubtleBackgroundHover', 3],
  ],
  colorCompoundBrandStrokePressed: [
    ['colorNeutralBackground1', 3],
    ['colorTransparentBackgroundPressed', 3],
    ['colorSubtleBackgroundPressed', 3],
  ],
};
