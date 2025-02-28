// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';
import {
  textRampItembodyFontsizeRaw,
  textRampItembodyLineheightRaw,
  textRampItemheaderFontsizeRaw,
  textRampItemheaderLineheightRaw,
  textRampLegalLineheightRaw,
  textRampMetadataFontsizeRaw,
  textRampMetadataLineheightRaw,
  textRampPageheaderFontsizeRaw,
  textRampPageheaderLineheightRaw,
  textRampReadingbodyFontsizeRaw,
  textRampReadingbodyLineheightRaw,
  textRampSectionheaderFontsizeRaw,
  textRampSectionheaderLineheightRaw,
  textRampSmPageheaderFontsizeRaw,
  textRampSmPageheaderLineheightRaw,
  textRampSmSectionheaderFontsizeRaw,
  textRampSubsectionheaderFontsizeRaw,
  textRampSubsectionheaderLineheightRaw,
  textStyleAiHeaderFontfamilyRaw,
  textStyleAiHeaderLetterspacingRaw,
  textStyleAiHeaderWeightRaw,
  textStyleAiRegularFontfamilyRaw,
  textStyleAiRegularLetterspacingRaw,
  textStyleAiRegularWeightRaw,
  textStyleArticleHeaderFontfamilyRaw,
  textStyleArticleHeaderLetterspacingRaw,
  textStyleArticleRegularFontfamilyRaw,
  textStyleArticleRegularLetterspacingRaw,
  textStyleArticleRegularWeightRaw,
  textStyleCodeHeaderFontfamilyRaw,
  textStyleCodeHeaderLetterspacingRaw,
  textStyleCodeHeaderWeightRaw,
  textStyleCodeRegularFontfamilyRaw,
  textStyleCodeRegularLetterspacingRaw,
  textStyleCodeRegularWeightRaw,
  textStyleDatavizHeaderFontfamilyRaw,
  textStyleDatavizHeaderLetterspacingRaw,
  textStyleDatavizHeaderWeightRaw,
  textStyleDatavizRegularFontfamilyRaw,
  textStyleDatavizRegularLetterspacingRaw,
  textStyleDatavizRegularWeightRaw,
  textStyleDefaultHeaderFontfamilyRaw,
  textStyleDefaultHeaderLetterspacingRaw,
  textStyleQuoteHeaderLetterspacingRaw,
  textStyleQuoteHeaderWeightRaw,
  textStyleQuoteRegularFontfamilyRaw,
  textStyleQuoteRegularLetterspacingRaw,
  textStyleQuoteRegularWeightRaw,
} from './variables';

// Our optional tokens can fallback to control tokens
import {
  textGlobalBody1FontsizeRaw,
  textGlobalBody2FontsizeRaw,
  textGlobalBody2LineheightRaw,
  textGlobalBody3FontsizeRaw,
  textGlobalBody3LineheightRaw,
  textGlobalCaption1FontsizeRaw,
  textGlobalCaption1LineheightRaw,
  textGlobalCaption2LineheightRaw,
  textGlobalSubtitle1FontsizeRaw,
  textGlobalSubtitle1LineheightRaw,
  textGlobalSubtitle2FontsizeRaw,
  textGlobalSubtitle2LineheightRaw,
  textGlobalTitle2FontsizeRaw,
  textGlobalTitle2LineheightRaw,
  textStyleDefaultHeaderWeightRaw,
  textStyleDefaultRegularFontfamilyRaw,
  textStyleDefaultRegularLetterspacingRaw,
  textStyleDefaultRegularWeightRaw,
} from '../control/variables';

// Optional tokens

export const textStyleDefaultHeaderFontfamily = `var(${textStyleDefaultHeaderFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleDefaultHeaderLetterspacing = `var(${textStyleDefaultHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleAiRegularFontfamily = `var(${textStyleAiRegularFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleAiRegularWeight = `var(${textStyleAiRegularWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleAiRegularLetterspacing = `var(${textStyleAiRegularLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleAiHeaderFontfamily = `var(${textStyleAiHeaderFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleAiHeaderWeight = `var(${textStyleAiHeaderWeightRaw}, var(${textStyleDefaultHeaderWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleAiHeaderLetterspacing = `var(${textStyleAiHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleArticleRegularFontfamily = `var(${textStyleArticleRegularFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleArticleRegularWeight = `var(${textStyleArticleRegularWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleArticleRegularLetterspacing = `var(${textStyleArticleRegularLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleArticleHeaderFontfamily = `var(${textStyleArticleHeaderFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleArticleHeaderWeight = `var(${textStyleDefaultHeaderWeightRaw}, var(${textStyleDefaultHeaderWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleArticleHeaderLetterspacing = `var(${textStyleArticleHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleCodeRegularFontfamily = `var(${textStyleCodeRegularFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyMonospace}))`;
export const textStyleCodeRegularWeight = `var(${textStyleCodeRegularWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleCodeRegularLetterspacing = `var(${textStyleCodeRegularLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleCodeHeaderFontfamily = `var(${textStyleCodeHeaderFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyMonospace}))`;
export const textStyleCodeHeaderWeight = `var(${textStyleCodeHeaderWeightRaw}, ${textStyleDefaultHeaderWeightRaw})`;
export const textStyleCodeHeaderLetterspacing = `var(${textStyleCodeHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleDatavizRegularFontfamily = `var(${textStyleDatavizRegularFontfamilyRaw},var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleDatavizRegularWeight = `var(${textStyleDatavizRegularWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleDatavizRegularLetterspacing = `var(${textStyleDatavizRegularLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleDatavizHeaderFontfamily = `var(${textStyleDatavizHeaderFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleDatavizHeaderWeight = `var(${textStyleDatavizHeaderWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightSemibold}))`;
export const textStyleDatavizHeaderLetterspacing = `var(${textStyleDatavizHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleQuoteRegularFontfamily = `var(${textStyleQuoteRegularFontfamilyRaw}, var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase}))`;
export const textStyleQuoteRegularWeight = `var(${textStyleQuoteRegularWeightRaw}, var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular}))`;
export const textStyleQuoteRegularLetterspacing = `var(${textStyleQuoteRegularLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textStyleQuoteHeaderWeight = `var(${textStyleQuoteHeaderWeightRaw}, var(${textStyleDefaultHeaderWeightRaw}, ${tokens.fontWeightSemibold}))`;
export const textStyleQuoteHeaderLetterspacing = `var(${textStyleQuoteHeaderLetterspacingRaw}, var(${textStyleDefaultRegularLetterspacingRaw}, 'normal'))`;
export const textRampPageheaderFontsize = `var(${textRampPageheaderFontsizeRaw}, var(${textGlobalTitle2FontsizeRaw}, ${textGlobalSubtitle1FontsizeRaw}))`;
export const textRampPageheaderLineheight = `var(${textRampPageheaderLineheightRaw}, var(${textGlobalTitle2LineheightRaw}, ${textGlobalSubtitle1LineheightRaw}))`;
export const textRampSectionheaderFontsize = `var(${textRampSectionheaderFontsizeRaw}, var(${textGlobalSubtitle1FontsizeRaw}, ${textGlobalSubtitle2FontsizeRaw}))`;
export const textRampSectionheaderLineheight = `var(${textRampSectionheaderLineheightRaw}, var(${textGlobalSubtitle1LineheightRaw}, ${textGlobalSubtitle2LineheightRaw}))`;
export const textRampSubsectionheaderFontsize = `var(${textRampSubsectionheaderFontsizeRaw}, ${textGlobalSubtitle2FontsizeRaw})`;
export const textRampSubsectionheaderLineheight = `var(${textRampSubsectionheaderLineheightRaw}, ${textGlobalSubtitle2LineheightRaw})`;
export const textRampReadingbodyFontsize = `var(${textRampReadingbodyFontsizeRaw}, ${textGlobalBody2FontsizeRaw})`;
export const textRampReadingbodyLineheight = `var(${textRampReadingbodyLineheightRaw}, ${textGlobalBody2LineheightRaw})`;
export const textRampItemheaderFontsize = `var(${textRampItemheaderFontsizeRaw}, ${textGlobalBody2FontsizeRaw})`;
export const textRampItemheaderLineheight = `var(${textRampItemheaderLineheightRaw}, ${textGlobalBody2LineheightRaw})`;
export const textRampItembodyFontsize = `var(${textRampItembodyFontsizeRaw}, var(${textGlobalBody3FontsizeRaw}, ${tokens.fontSizeBase300}))`;
export const textRampItembodyLineheight = `var(${textRampItembodyLineheightRaw}, var(${textGlobalBody3LineheightRaw}, ${tokens.lineHeightBase300}))`;
export const textRampMetadataFontsize = `var(${textRampMetadataFontsizeRaw}, ${textGlobalCaption1FontsizeRaw})`;
export const textRampMetadataLineheight = `var(${textRampMetadataLineheightRaw}, ${textGlobalCaption1LineheightRaw})`;
export const textRampLegalLineheight = `var(${textRampLegalLineheightRaw}, ${textGlobalCaption2LineheightRaw})`;
export const textRampSmPageheaderFontsize = `var(${textRampSmPageheaderFontsizeRaw}, var(${textGlobalSubtitle1FontsizeRaw}, ${textGlobalSubtitle2FontsizeRaw}))`;
export const textRampSmPageheaderLineheight = `var(${textRampSmPageheaderLineheightRaw}, var(${textGlobalSubtitle1LineheightRaw}, ${textGlobalSubtitle2LineheightRaw}))`;
export const textRampSmSectionheaderFontsize = `var(${textRampSmSectionheaderFontsizeRaw}, var(${textGlobalSubtitle2FontsizeRaw}, ${textGlobalBody1FontsizeRaw}))`;
