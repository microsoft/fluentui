/*
 * Control level tokens are generic tokens that can be used across multiple components.
 *
 * Components with a different fluent 2 fallback than the control should define a component specific token instead.
 */
// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';
import {
  textGlobalBody1FontsizeRaw,
  textGlobalBody1LineheightRaw,
  textGlobalBody2FontsizeRaw,
  textGlobalBody2LineheightRaw,
  textGlobalBody3FontsizeRaw,
  textGlobalBody3LineheightRaw,
  textGlobalCaption1FontsizeRaw,
  textGlobalCaption1LineheightRaw,
  textGlobalCaption2FontsizeRaw,
  textGlobalCaption2LineheightRaw,
  textGlobalDisplay1FontsizeRaw,
  textGlobalDisplay1LineheightRaw,
  textGlobalDisplay2FontsizeRaw,
  textGlobalDisplay2LineheightRaw,
  textGlobalSubtitle1FontsizeRaw,
  textGlobalSubtitle1LineheightRaw,
  textGlobalSubtitle2FontsizeRaw,
  textGlobalSubtitle2LineheightRaw,
  textGlobalTitle1FontsizeRaw,
  textGlobalTitle1LineheightRaw,
  textGlobalTitle2FontsizeRaw,
  textGlobalTitle2LineheightRaw,
  textStyleDefaultHeaderWeightRaw,
  textStyleDefaultRegularFontfamilyRaw,
  textStyleDefaultRegularLetterspacingRaw,
  textStyleDefaultRegularWeightRaw,
} from './variables';

// Font sizes and line heights
// TODO: Check fallbacks for below font size fallbacks (some unknowns)
export const textGlobalDisplay1Fontsize = `var(${textGlobalDisplay1FontsizeRaw})`;
export const textGlobalDisplay1Lineheight = `var(${textGlobalDisplay1LineheightRaw})`;
export const textGlobalDisplay2Fontsize = `var(${textGlobalDisplay2FontsizeRaw})`;
export const textGlobalDisplay2Lineheight = `var(${textGlobalDisplay2LineheightRaw})`;
export const textGlobalTitle1Fontsize = `var(${textGlobalTitle1FontsizeRaw})`;
export const textGlobalTitle1Lineheight = `var(${textGlobalTitle1LineheightRaw})`;
export const textGlobalTitle2Fontsize = `var(${textGlobalTitle2FontsizeRaw})`;
export const textGlobalTitle2Lineheight = `var(${textGlobalTitle2LineheightRaw})`;
export const textGlobalSubtitle1Fontsize = `var(${textGlobalSubtitle1FontsizeRaw})`;
export const textGlobalSubtitle1Lineheight = `var(${textGlobalSubtitle1LineheightRaw})`;
export const textGlobalSubtitle2Fontsize = `var(${textGlobalSubtitle2FontsizeRaw})`;
export const textGlobalSubtitle2Lineheight = `var(${textGlobalSubtitle2LineheightRaw})`;
// TODO: Unknown font fallbacks end here

// Body and caption fonts
export const textGlobalBody1Fontsize = `var(${textGlobalBody1FontsizeRaw})`;
export const textGlobalBody1Lineheight = `var(${textGlobalBody1LineheightRaw})`;
export const textGlobalBody2Fontsize = `var(${textGlobalBody2FontsizeRaw})`;
export const textGlobalBody2Lineheight = `var(${textGlobalBody2LineheightRaw})`;
export const textGlobalBody3Fontsize = `var(${textGlobalBody3FontsizeRaw})`;
export const textGlobalBody3Lineheight = `var(${textGlobalBody3LineheightRaw})`;
export const textGlobalCaption1Fontsize = `var(${textGlobalCaption1FontsizeRaw})`;
export const textGlobalCaption1Lineheight = `var(${textGlobalCaption1LineheightRaw})`;
export const textGlobalCaption2Fontsize = `var(${textGlobalCaption2FontsizeRaw})`;
export const textGlobalCaption2Lineheight = `var(${textGlobalCaption2LineheightRaw})`;

// Font family and weight
export const textStyleDefaultRegularFontfamily = `var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase})`;
export const textStyleDefaultRegularWeight = `var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular})`;
export const textStyleDefaultRegularLetterspacing = `var(${textStyleDefaultRegularLetterspacingRaw}, 'normal')`;
export const textStyleDefaultHeaderWeight = `var(${textStyleDefaultHeaderWeightRaw})`;
