import { isBrowser } from './isBrowser';

const DEFAULT_REM_SIZE_IN_PX = 16;

let _documentRemSize: number | null = null;

export const getDocumentRemSize = (): number => {
  if (isBrowser()) {
    try {
      // eslint-disable-next-line no-undef
      return getFontSizeValue(getComputedStyle(document.documentElement).fontSize) || DEFAULT_REM_SIZE_IN_PX;
    } catch (e) {
      return DEFAULT_REM_SIZE_IN_PX;
    }
  }

  return DEFAULT_REM_SIZE_IN_PX;
};

const getFontSizeValue = (size?: string | null): number | null => {
  return (size && parseFloat(size)) || null;
};

// A replacement for a Lodash's one, way more faster on our cases as handles specific scenario
export const round = (n: number) => ((n * 10000 + (n > 0 ? 0.5 : -0.5)) << 0) / 10000;

/**
 * Converts the provided px size to rem based on the default font size of 16px unless
 * the HTML font size has been previously defined with setHTMLFontSize().
 * @param valueInPx - The px value to convert to rem.
 * @param baseRemSize - Rem size to use for conversions. Optional - document's font size will be taken otherwise.
 * @example
 * ```
 * // Returns '1rem' for default document font size (16px).
 * pxToRem(16)
 *
 * // Returns '2rem'.
 * pxToRem(32, 16)
 * ```
 * @returns The value converted to the rem.
 */
export const pxToRem = (valueInPx: number, baseRemSize?: number): string => {
  if (!baseRemSize && !_documentRemSize) {
    // there is no way how to reset the cached value
    // invalidating the cache is not possible as resetting cached value won't trigger recalculation of site variables,
    // for which originally computed values will stay unchanged
    _documentRemSize = getDocumentRemSize();
  }

  const remSize = baseRemSize || _documentRemSize || DEFAULT_REM_SIZE_IN_PX;
  const convertedValueInRems = valueInPx / remSize;

  return `${round(convertedValueInRems)}rem`;
};
