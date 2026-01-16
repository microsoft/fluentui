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
export const safeRectValue = (rect: any, key: 'x' | 'y' | 'width' | 'height', fallback: number = 0): number => {
  return rect && typeof rect[key] === 'number' && Number.isFinite(rect[key]) ? rect[key] : fallback;
};

/**
 * Clamps a value between min and max bounds
 */
export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

/**
 * Type guard to check if a value is a finite number
 */
export const isFiniteNumber = (value: number | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

/**
 * Helper to apply a callback to all four sides of a rect
 * Reduces repetitive code for top/right/bottom/left operations
 */
export const applyToAllSides = <T>(
  callback: (side: 'top' | 'right' | 'bottom' | 'left') => T,
): { top: T; right: T; bottom: T; left: T } => ({
  top: callback('top'),
  right: callback('right'),
  bottom: callback('bottom'),
  left: callback('left'),
});

// CSS parsing utilities
export const CSS_SIZE_REGEX = /^(-?\d*\.?\d+)(px|em|rem)?$/i;
export const DEFAULT_PADDING_SIDES = Object.freeze({ top: 4, right: 8, bottom: 4, left: 8 });

/**
 * Parses a CSS size value to pixels
 * Supports px, em, rem units (em/rem assumed 16px base)
 */
export const parseCssSizeToPixels = (value: string | undefined): number | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const match = CSS_SIZE_REGEX.exec(value.trim());
  if (!match) {
    return undefined;
  }

  const numeric = Number.parseFloat(match[1]);
  if (!Number.isFinite(numeric)) {
    return undefined;
  }

  const unit = match[2]?.toLowerCase();
  if (!unit || unit === 'px') {
    return numeric;
  }
  if (unit === 'em' || unit === 'rem') {
    return numeric * 16;
  }
  return undefined;
};

/**
 * Resolves CSS padding shorthand to individual sides
 * Supports 1-4 value syntax like CSS padding
 */
export const resolvePaddingSides = (
  padding: string | undefined,
): { top: number; right: number; bottom: number; left: number } => {
  if (typeof padding !== 'string' || padding.trim().length === 0) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  const tokens = padding.trim().split(/\s+/);
  if (tokens.length === 0 || tokens.length > 4) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  const values = tokens.map(token => parseCssSizeToPixels(token));
  if (values.some(value => value === undefined)) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  switch (values.length) {
    case 1: {
      const v = values[0]!;
      return { top: v, right: v, bottom: v, left: v };
    }
    case 2: {
      const [vertical, horizontal] = values as number[];
      return { top: vertical, right: horizontal, bottom: vertical, left: horizontal };
    }
    case 3: {
      const [top, horizontal, bottom] = values as number[];
      return { top, right: horizontal, bottom, left: horizontal };
    }
    case 4: {
      const [top, right, bottom, left] = values as number[];
      return { top, right, bottom, left };
    }
    default:
      return { ...DEFAULT_PADDING_SIDES };
  }
};

/**
 * Represents overflow/padding on all four sides
 */
export type OverflowRect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/**
 * Aggregates multiple overflow rects by taking maximum for each side
 */
export const aggregateMaxOverflow = (overflows: OverflowRect[]): OverflowRect => {
  return overflows.reduce(
    (acc, overflow) => ({
      top: Math.max(acc.top, overflow.top || 0),
      right: Math.max(acc.right, overflow.right || 0),
      bottom: Math.max(acc.bottom, overflow.bottom || 0),
      left: Math.max(acc.left, overflow.left || 0),
    }),
    { top: 0, right: 0, bottom: 0, left: 0 },
  );
};

/**
 * Adds margin to non-zero overflow sides
 */
export const addMarginToOverflow = (overflow: OverflowRect, margin: number): OverflowRect => ({
  top: overflow.top > 0 ? overflow.top + margin : 0,
  right: overflow.right > 0 ? overflow.right + margin : 0,
  bottom: overflow.bottom > 0 ? overflow.bottom + margin : 0,
  left: overflow.left > 0 ? overflow.left + margin : 0,
});

/**
 * Checks if padding has converged between iterations
 */
export const hasPaddingConverged = (prev: OverflowRect, next: OverflowRect, threshold: number = 0.5): boolean =>
  Math.abs(next.top - prev.top) < threshold &&
  Math.abs(next.right - prev.right) < threshold &&
  Math.abs(next.bottom - prev.bottom) < threshold &&
  Math.abs(next.left - prev.left) < threshold;

// Text processing utilities
const TEXT_LINE_BREAK_REGEX = /[\r\n]+/;

/**
 * Sanitizes a text segment by removing HTML tags, collapsing whitespace, and trimming
 */
export const sanitizeTextSegment = (segment: string): string =>
  segment
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();

/**
 * Splits text into segments by line breaks and sanitizes each segment
 * Supports custom line break regex and sanitizer function
 */
export const splitTextIntoSegments = (
  text: string,
  lineBreakRegex: RegExp = TEXT_LINE_BREAK_REGEX,
  sanitizer: (segment: string) => string = sanitizeTextSegment,
): string[] => {
  const rawSegments = text.split(lineBreakRegex);

  if (rawSegments.length === 0) {
    return [''];
  }

  const sanitized = rawSegments.map(sanitizer);
  return sanitized.length > 0 ? sanitized : [''];
};

// Connector utilities
export type Point2D = { x: number; y: number };
export type Point = Point2D;

export const CONNECTOR_MIN_ARROW_CLEARANCE = 6;
export const DEFAULT_CONNECTOR_MIN_ARROW_CLEARANCE = 6;
export const CONNECTOR_FALLBACK_DIRECTION: Point2D = Object.freeze({ x: 0, y: -1 });
export const DEFAULT_CONNECTOR_FALLBACK_DIRECTION = CONNECTOR_FALLBACK_DIRECTION;

/**
 * Enforces minimum distance between anchor and display points for connector rendering
 * Moves the display point away from the anchor if they are too close
 */
export const enforceConnectorMinDistance = (
  anchorPoint: Point2D,
  displayPoint: Point2D,
  startPadding: number,
  endPadding: number,
  minArrowClearance: number = CONNECTOR_MIN_ARROW_CLEARANCE,
  fallbackDirection: Point2D = CONNECTOR_FALLBACK_DIRECTION,
): Point2D => {
  const minDistance = Math.max(startPadding + endPadding + minArrowClearance, startPadding);
  const dx = displayPoint.x - anchorPoint.x;
  const dy = displayPoint.y - anchorPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < minDistance) {
    const unitX = distance === 0 ? fallbackDirection.x : dx / distance;
    const unitY = distance === 0 ? fallbackDirection.y : dy / distance;

    return {
      x: anchorPoint.x + unitX * minDistance,
      y: anchorPoint.y + unitY * minDistance,
    };
  }

  return displayPoint;
};

/**
 * Ensures a connector has enough clearance between an anchor point and a display point.
 * If the current distance is less than minDistance, returns an adjusted display point.
 */
export const applyMinDistanceFromAnchor = (
  anchor: Point,
  displayPoint: Point,
  minDistance: number,
  fallbackDirection: Point = DEFAULT_CONNECTOR_FALLBACK_DIRECTION,
): Point => {
  const dx = displayPoint.x - anchor.x;
  const dy = displayPoint.y - anchor.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (!Number.isFinite(distance) || distance >= minDistance) {
    return displayPoint;
  }

  const ux = distance === 0 ? fallbackDirection.x : dx / distance;
  const uy = distance === 0 ? fallbackDirection.y : dy / distance;

  return {
    x: anchor.x + ux * minDistance,
    y: anchor.y + uy * minDistance,
  };
};

// Viewport resolution utilities
/**
 * Resolves a relative position value within a padded container
 * Returns the absolute position given a relative coordinate (0-1 range)
 */
export const resolveViewportRelativePosition = (
  relativeValue: number,
  containerSize: number,
  paddingStart: number,
  paddingEnd: number,
): number => {
  const effectiveSize = Math.max(containerSize - paddingStart - paddingEnd, 0);

  if (!Number.isFinite(relativeValue)) {
    return paddingStart + effectiveSize / 2;
  }

  if (effectiveSize === 0) {
    return paddingStart;
  }

  return paddingStart + relativeValue * effectiveSize;
};

/**
 * Resolves a relative coordinate (0..1) to a pixel coordinate within a padded container.
 * If the relative value is invalid, returns the padded center.
 */
export const resolveRelativeWithPadding = (
  relative: number,
  totalSize: number,
  paddingStart: number,
  paddingEnd: number,
): number => {
  return resolveViewportRelativePosition(relative, totalSize, paddingStart, paddingEnd);
};

/**
 * Resolves both x and y relative coordinates within a padded container
 */
export const resolveViewportRelativePoint = (
  relativeX: number,
  relativeY: number,
  containerWidth: number,
  containerHeight: number,
  padding: { top: number; right: number; bottom: number; left: number },
): Point2D => {
  return {
    x: resolveViewportRelativePosition(relativeX, containerWidth, padding.left, padding.right),
    y: resolveViewportRelativePosition(relativeY, containerHeight, padding.top, padding.bottom),
  };
};

/**
 * Shared constants for annotation layout behavior.
 * Keeping these in one place reduces duplication across chart implementations.
 */
export const DEFAULT_ANNOTATION_MAX_WIDTH = 180;

/**
 * Takes the per-side max across multiple rects.
 */
export const maxSides = (...rects: Array<Partial<OverflowRect> | undefined>): OverflowRect => {
  return applyToAllSides(side => {
    let maxValue = 0;
    for (const rect of rects) {
      const candidate = rect?.[side];
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        maxValue = Math.max(maxValue, candidate);
      }
    }
    return maxValue;
  });
};
