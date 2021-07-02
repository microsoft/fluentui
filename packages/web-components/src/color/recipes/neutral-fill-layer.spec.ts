import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { middleGrey } from '../utilities/color-constants';
import { neutralFillLayer } from './neutral-fill-layer';

const neutralPalette = PaletteRGB.create(middleGrey);

describe('neutralFillLayer', (): void => {
  it('should be lighter or equal when the index of the fill color is lower than the offset index', (): void => {
    const delta = 3;
    for (let i: number = 0; i < delta; i++) {
      const color = neutralFillLayer(neutralPalette, neutralPalette.get(i), delta);
      const resolved = neutralPalette.get(i - delta);

      expect(color).to.equal(resolved);
    }
  });
  it('should return the color at three steps lower than the fill color', (): void => {
    const delta = 3;

    for (let i: number = delta; i < neutralPalette.swatches.length; i++) {
      expect(
        neutralPalette.swatches.indexOf(neutralFillLayer(neutralPalette, neutralPalette.get(i), delta) as SwatchRGB),
      ).to.equal(i - 3);
    }
  });
});
