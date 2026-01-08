/**
 * Shared utilities for chart annotations to reduce code duplication
 * across ChartAnnotationLayer and useDonutAnnotationLayout
 */

/**
 * Normalizes a single padding value to ensure it's a valid, positive, finite number.
 * Returns 0 for any invalid input (undefined, null, negative, NaN, Infinity, etc.)
 *
 * @param value - The padding value to normalize
 * @returns The normalized padding value (>= 0)
 */
export const normalizeViewportPadding = (value: number | undefined): number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

/**
 * Normalizes all four sides of a padding rect, ensuring each value is valid and positive.
 *
 * @param padding - Optional padding object with top, right, bottom, left properties
 * @returns Normalized padding rect with all four sides as valid numbers
 */
export const normalizePaddingRect = (padding?: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}): { top: number; right: number; bottom: number; left: number } => {
  return {
    top: normalizeViewportPadding(padding?.top),
    right: normalizeViewportPadding(padding?.right),
    bottom: normalizeViewportPadding(padding?.bottom),
    left: normalizeViewportPadding(padding?.left),
  };
};

/**
 * Safely extracts a numeric value from a rectangle object, validating it's a finite number.
 * Returns the fallback value if the rect is undefined, the property doesn't exist, or is invalid.
 *
 * @param rect - The rectangle object to extract from
 * @param key - The property key to extract ('x', 'y', 'width', or 'height')
 * @param fallback - The fallback value if extraction fails (defaults to 0)
 * @returns The extracted and validated number, or the fallback value
 */
export const safeRectValue = (
  rect: any,
  key: 'x' | 'y' | 'width' | 'height',
  fallback: number = 0,
): number => {
  return rect && typeof rect[key] === 'number' && Number.isFinite(rect[key]) ? rect[key] : fallback;
};
