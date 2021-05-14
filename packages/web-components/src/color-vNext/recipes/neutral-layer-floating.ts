import { PaletteRGB } from '../palette';
import { neutralLayerCard } from './neutral-layer-card';

/**
 * @internal
 */
export function neutralLayerFloating(palette: PaletteRGB, relativeLuminance: number, cardDelta: number) {
  const cardIndex = palette.closestIndexOf(neutralLayerCard(palette, relativeLuminance, cardDelta));
  return palette.get(cardIndex - cardDelta);
}
