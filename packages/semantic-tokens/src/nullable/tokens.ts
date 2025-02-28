import {
  textStyleAiHeaderCaseRaw,
  textStyleArticleHeaderCaseRaw,
  textStyleCodeHeaderCaseRaw,
  textStyleDatavizHeaderCaseRaw,
  textStyleDefaultHeaderCaseRaw,
  textStyleQuoteHeaderCaseRaw,
} from './variables';

// TODO: Check header default? undefined? uppercase?
export const textStyleDefaultHeaderCase = `var(${textStyleDefaultHeaderCaseRaw}, 'uppercase')`;
export const textStyleCodeHeaderCase = `var(${textStyleCodeHeaderCaseRaw}, 'uppercase')`;
export const textStyleAiHeaderCase = `var(${textStyleAiHeaderCaseRaw}, 'uppercase')`;
export const textStyleArticleHeaderCase = `var(${textStyleArticleHeaderCaseRaw}, 'uppercase')`;
export const textStyleDatavizHeaderCase = `var(${textStyleDatavizHeaderCaseRaw}, 'uppercase')`;
export const textStyleQuoteHeaderCase = `var(${textStyleQuoteHeaderCaseRaw}, 'uppercase')`;
