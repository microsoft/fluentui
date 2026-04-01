/**
 * Regular expressions matching characters to ignore when calculating the initials.
 */

/**
 * Regular expression matching characters within various types of enclosures, including the enclosures themselves
 *  so for example, (xyz) [xyz] {xyz} all would be ignored
 */
const UNWANTED_ENCLOSURES_REGEX: RegExp = /[\(\[\{][^\)\]\}]*[\)\]\}]/g;

/**
 * Regular expression matching special ASCII characters except space, plus some unicode special characters.
 * Applies after unwanted enclosures have been removed.
 * Note: the range starts at \uE000 (not \uD800) to avoid matching surrogate code units, which would break
 * supplementary Unicode characters (encoded as surrogate pairs in UTF-16) such as GB18030-2022 extension characters.
 */
const UNWANTED_CHARS_REGEX: RegExp = /[\0-\u001F\!-/:-@\[-`\{-\u00BF\u0250-\u036F\uE000-\uFFFF]/g;

/**
 * Regular expression matching phone numbers. Applied after chars matching UNWANTED_CHARS_REGEX have been removed
 * and number has been trimmed for whitespaces
 */
const PHONENUMBER_REGEX: RegExp = /^\d+[\d\s]*(:?ext|x|)\s*\d+$/i;

/** Regular expression matching one or more spaces. */
const MULTIPLE_WHITESPACES_REGEX: RegExp = /\s+/g;

/**
 * Regular expression matching languages for which we currently don't support initials.
 * Arabic:   Arabic, Arabic Supplement, Arabic Extended-A.
 * Korean:   Hangul Jamo, Hangul Compatibility Jamo, Hangul Jamo Extended-A, Hangul Syllables, Hangul Jamo Extended-B.
 * Japanese: Hiragana, Katakana.
 * CJK:      CJK Unified Ideographs Extension A, CJK Unified Ideographs, CJK Compatibility Ideographs.
 * Note: Supplementary CJK characters (GB18030-2022 extension characters in Ext B-I) are intentionally not listed
 * here so they can be rendered as initials.
 */
const UNSUPPORTED_TEXT_REGEX: RegExp =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

function getFirstCodePoint(value: string): string {
  if (!value) {
    return '';
  }

  const codePoint = value.codePointAt(0);
  return codePoint === undefined ? '' : String.fromCodePoint(codePoint);
}

function getInitialsLatin(displayName: string, isRtl: boolean, firstInitialOnly?: boolean): string {
  let initials = '';

  const splits: string[] = displayName.split(' ');
  if (splits.length !== 0) {
    // Use code point-aware helper to correctly handle supplementary characters (e.g. GB18030-2022 extension chars)
    // that are encoded as surrogate pairs; charAt(0) would only return half of such a character.
    initials += getFirstCodePoint(splits[0]).toUpperCase();
  }

  if (!firstInitialOnly) {
    if (splits.length === 2) {
      initials += getFirstCodePoint(splits[1]).toUpperCase();
    } else if (splits.length === 3) {
      initials += getFirstCodePoint(splits[2]).toUpperCase();
    }
  }

  if (isRtl && [...initials].length > 1) {
    const chars = [...initials];
    return chars[1] + chars[0];
  }

  return initials;
}

function cleanupDisplayName(displayName: string): string {
  displayName = displayName.replace(UNWANTED_ENCLOSURES_REGEX, '');
  displayName = displayName.replace(UNWANTED_CHARS_REGEX, '');
  displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX, ' ');
  displayName = displayName.trim();

  return displayName;
}

/**
 * Get (up to 2 characters) initials based on display name of the persona.
 *
 * @param displayName - The full name of the person or entity
 * @param isRtl - Whether the display is in RTL
 * @param options - Extra options to control the behavior of getInitials
 *
 * @returns The 1 or 2 character initials based on the name. Or an empty string if no initials
 * could be derived from the name.
 *
 * @internal
 */
export function getInitials(
  displayName: string | undefined | null,
  isRtl: boolean,
  options?: {
    /** Should initials be generated from phone numbers (default false) */
    allowPhoneInitials?: boolean;

    /** Returns only the first initial */
    firstInitialOnly?: boolean;
  },
): string {
  if (!displayName) {
    return '';
  }

  displayName = cleanupDisplayName(displayName);

  // Check only the first code point against UNSUPPORTED_TEXT_REGEX so that names starting with a supported
  // character (e.g. GB18030-2022 extension characters) produce an initial even when the rest of the string
  // contains BMP CJK characters that would otherwise trigger the regex.
  const firstCodePoint = getFirstCodePoint(displayName);
  if (
    UNSUPPORTED_TEXT_REGEX.test(firstCodePoint) ||
    (!options?.allowPhoneInitials && PHONENUMBER_REGEX.test(displayName))
  ) {
    return '';
  }

  return getInitialsLatin(displayName, isRtl, options?.firstInitialOnly);
}
