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
/** Minimum length for a string of an RGBA color component */
export const MIN_RGBA_LENGTH = 1;
/** Maximum length for a string of an RGBA color component */
export const MAX_RGBA_LENGTH = 3;

/** Regular expression matching only valid hexadecimal chars */
export const HEX_REGEX = /^[\da-f]{0,6}$/i;
/** Regular expression matching only numbers */
export const RGBA_REGEX = /^\d{0,3}$/;
