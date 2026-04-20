import type { Position, Alignment, PositioningProps, PositioningShorthand } from './types';

/**
 * Maps position + align to a human-readable placement string for the
 * `data-placement` attribute. Center alignment uses the bare position.
 */
export function getPlacementString(position: Position, align: Alignment): string {
  if (align === 'center') {
    return position;
  }

  return `${position}-${align}`;
}

/**
 * Normalizes a {@link PositioningShorthand} (string or object) into a full
 * {@link PositioningProps} object. Strings like `'below-start'` parse into
 * `{ position: 'below', align: 'start' }`; objects pass through unchanged.
 */
export function resolvePositioningShorthand(value: PositioningShorthand | undefined): PositioningProps {
  if (!value) {
    return {};
  }

  if (typeof value !== 'string') {
    return value;
  }

  const dash = value.indexOf('-');

  if (dash === -1) {
    return { position: value as Position };
  }

  return {
    position: value.slice(0, dash) as Position,
    align: value.slice(dash + 1) as Alignment,
  };
}
