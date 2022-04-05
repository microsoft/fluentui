/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/typedef */

/**
 * Reduces extra spaces in HTML tagged templates.
 *
 * @param {string} data - the fragment value
 * @returns string
 */
export function transformHTMLFragment(data) {
  data = data.replace(/\s*([<>])\s*/g, '$1'); // remove spaces before and after angle brackets
  return data.replace(/\s{2,}/g, ' '); // Collapse all sequences to 1 space
}

/**
 * Reduces extra spaces in CSS tagged templates.
 *
 * Breakdown of this regex:
 *   (?:\s*\/\*(?:.|\s)+?\*\/\s*)  Remove comments (non-capturing)
 *   (?:;)\s+(?=\})  Remove semicolons and spaces followed by property list end (non-capturing)
 *   \s+(?=\{)  Remove spaces before property list start (non-capturing)
 *   (?<=:)\s+  Remove spaces after property declarations (non-capturing)
 *   \s*([{};,])\s*  Remove extra spaces before and after braces, semicolons, and commas (captures)
 *
 * @param {string} data - the fragment value
 * @returns string
 */
export function transformCSSFragment(data) {
  return data.replace(/(?:\s*\/\*(?:.|\s)+?\*\/\s*)|(?:;)\s+(?=\})|\s+(?=\{)|(?<=:)\s+|\s*([{};,])\s*/g, '$1');
}
