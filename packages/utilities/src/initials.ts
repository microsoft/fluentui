/**
 * Regular expression matching characters to ignore when calculating the initials.
 * The first part matches characters within parenthesis, including the parenthesis.
 * The second part matches special ASCII characters except space, plus some unicode special characters.
 */
const UNWANTED_CHARS_REGEX: RegExp = /\([^)]*\)|[\0-\u001F\!-/:-@\[-`\{-\u00BF\u0250-\u036F\uD800-\uFFFF]/g;

/** Regular expression matching one or more spaces. */
const MULTIPLE_WHITESPACES_REGEX: RegExp = /\s+/g;

/**
 * Regular expression matching languages for which we currently don't support initials.
 * Arabic:   Arabic, Arabic Supplement, Arabic Extended-A.
 * Korean:   Hangul Jamo, Hangul Compatibility Jamo, Hangul Jamo Extended-A, Hangul Syllables, Hangul Jamo Extended-B.
 * Japanese: Hiragana, Katakana.
 * CJK:      CJK Unified Ideographs Extension A, CJK Unified Ideographs, CJK Compatibility Ideographs, CJK Unified Ideographs Extension B
 */
/* tslint:disable:max-line-length */
const UNSUPPORTED_TEXT_REGEX: RegExp = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD869][\uDC00-\uDED6]/;
/* tslint:enable:max-line-length */

function getInitialsLatin(displayName: string, isRtl: boolean): string {
  let initials = '';

  const splits: string[] = displayName.split(' ');

  if (splits.length === 2) {
    initials += splits[0].charAt(0).toUpperCase();
    initials += splits[1].charAt(0).toUpperCase();
  } else if (splits.length === 3) {
    initials += splits[0].charAt(0).toUpperCase();
    initials += splits[2].charAt(0).toUpperCase();
  } else if (splits.length !== 0) {
    initials += splits[0].charAt(0).toUpperCase();
  }

  if (isRtl && initials.length > 1) {
    return initials.charAt(1) + initials.charAt(0);
  }

  return initials;
}

function cleanupDisplayName(displayName: string): string {
  displayName = displayName.replace(UNWANTED_CHARS_REGEX, '');
  displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX, ' ');
  displayName = displayName.trim();

  return displayName;
}

/**
 * Get (up to 2 characters) initials based on display name of the persona.
 *
 * @public
 */
export function getInitials(displayName: string | undefined | null, isRtl: boolean): string {
  if (!displayName) {
    return '';
  }

  displayName = cleanupDisplayName(displayName);

  if (UNSUPPORTED_TEXT_REGEX.test(displayName)) {
    return '';
  }

  return getInitialsLatin(displayName, isRtl);
}
