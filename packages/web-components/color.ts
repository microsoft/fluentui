import { ColorRGBA64, parseColorHexRGB, parseColorWebRGB } from '@microsoft/fast-colors';

const cache = new Map();
/**
 * Converts a color string into a ColorRGBA64 instance.
 * Supports #RRGGBB and rgb(r, g, b) formats
 *
 * @public
 */
export function parseColorString(color: string): ColorRGBA64 {
  const cached: ColorRGBA64 | void = cache.get(color);

  if (!cached) {
    let parsed: ColorRGBA64 | null = parseColorHexRGB(color);

    if (parsed === null) {
      parsed = parseColorWebRGB(color);
    }

    if (parsed === null) {
      throw new Error(
        `${color} cannot be converted to a ColorRGBA64. Color strings must be one of the following formats: "#RGB", "#RRGGBB", or "rgb(r, g, b)"`,
      );
    }

    cache.set(color, parsed);
    return parsed;
  }

  return cached;
}
