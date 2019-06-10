export const MAX_COLOR_SATURATION = 100;
export const MAX_COLOR_HUE = 359;
export const MAX_COLOR_VALUE = 100;
export const MAX_COLOR_RGB = 255;
/** @deprecated Use MAX_COLOR_RGB (255) or MAX_COLOR_ALPHA (100) */
export const MAX_COLOR_RGBA = MAX_COLOR_RGB;
export const MAX_COLOR_ALPHA = 100;

/** Minimum length for a hexadecimal color string (not including the #) */
export const MIN_HEX_LENGTH = 3;
/** Maximum length for a hexadecimal color string (not including the #) */
export const MAX_HEX_LENGTH = 6;
/** Minimum length for a string of an RGB color component */
export const MIN_RGB_LENGTH = 1;
/** Maximum length for a string of an RGB color component */
export const MAX_RGB_LENGTH = 3;

/** Regular expression matching only valid hexadecimal chars */
export const HEX_REGEX = /^[\da-f]{0,6}$/i;
/** Regular expression matching only valid RGB chars */
export const RGB_REGEX = /^\d{0,3}$/;
/**
 * Regular expression matching only potentially-valid alpha (transparency) strings based on the
 * type of characters and string length. We allow alpha strings to have one decimal place.
 */
export const ALPHA_REGEX = /^\d{0,3}(\.\d?)?$/;
