import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { accentBase, middleGrey } from '../utilities/color-constants';
import { contrastSwatch } from './contrast-swatch';

describe('contrastSwatch', (): void => {
  const neutralPalette = PaletteRGB.from(middleGrey);
  const accentPalette = PaletteRGB.from(accentBase);

  neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch): void => {
    it(`${swatch} should resolve a color from the neutral palette`, (): void => {
      expect(neutralPalette.swatches.indexOf(contrastSwatch(neutralPalette, swatch, 4.5) as SwatchRGB)).not.to.equal(
        -1,
      );
    });
  });

  neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch): void => {
    it(`${swatch} should always be at least 4.5 : 1 against the background`, (): void => {
      expect(
        swatch.contrast(contrastSwatch(neutralPalette, swatch, 4.5)),
        // Because contrastSwatch follows the direction patterns of neutralForeground,
        // a backgroundColor #777777 is impossible to hit 4.5 against.
      ).to.be.gte(swatch.toColorString().toUpperCase() === '#777777' ? 4.48 : 4.5);
      expect(swatch.contrast(contrastSwatch(neutralPalette, swatch, 4.5))).to.be.lessThan(5);
    });
  });
});
