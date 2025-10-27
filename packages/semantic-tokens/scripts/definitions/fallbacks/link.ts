import { tokens } from '@fluentui/tokens';
import { GroupFallback } from './fallbacks.types';

export const linkFallbacks: GroupFallback = {
  groupLinkTextUnderlineStrokewidth: {
    fluent: tokens.strokeWidthThin,
  },
  groupLinkTextUnderlineStyle: { fluent: 'solid' },
  groupLinkTextFontfamily: {
    fluent: tokens.fontFamilyBase,
  },
  groupLinkMediumTextFontsize: {
    fluent: tokens.fontSizeBase300,
  },
  groupLinkMediumTextFontweight: {
    fluent: tokens.fontWeightRegular,
  },
  groupLinkBrandTextForeground: {
    fluent: tokens.colorBrandForegroundLink,
  },
  groupLinkBrandTextForegroundHover: {
    fluent: tokens.colorBrandForegroundLinkHover,
  },
  groupLinkBrandTextForegroundPressed: {
    fluent: tokens.colorBrandForegroundLinkPressed,
  },
  groupLinkNeutralTextForeground: {
    fluent: tokens.colorNeutralForeground2,
  },
  groupLinkNeutralTextForegroundHover: {
    fluent: tokens.colorNeutralForeground2Hover,
  },
  groupLinkNeutralTextForegroundPressed: {
    fluent: tokens.colorNeutralForeground2Pressed,
  },
  groupLinkBrandTextForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
  },
  groupLinkNeutralTextForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
  },
  groupLinkMediumTextLineheight: {
    fluent: tokens.lineHeightBase300,
  },
  groupLinkOnpageTextDecorationline: {
    fluent: 'none',
  },
  groupLinkOnpageTextDecorationlineHover: {
    fluent: 'underline',
  },
  groupLinkOnpageTextDecorationlinePressed: {
    fluent: 'underline',
  },
  groupLinkOnpageTextDecorationlineDisabled: {
    fluent: 'none',
  },
};
