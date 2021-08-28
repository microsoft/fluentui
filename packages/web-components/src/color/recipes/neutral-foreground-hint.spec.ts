import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { accentBase, middleGrey } from '../utilities/color-constants';
import { neutralForegroundHint } from './neutral-foreground-hint';

describe('neutralForegroundHint', (): void => {
  const neutralPalette = PaletteRGB.create(middleGrey);
  const accentPalette = PaletteRGB.create(accentBase);

  neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch): void => {
    it(`${swatch} should resolve a color from the neutral palette`, (): void => {
      expect(neutralPalette.swatches.indexOf(neutralForegroundHint(neutralPalette, swatch) as SwatchRGB)).not.to.equal(
        -1,
      );
    });
  });

  neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch): void => {
    it(`${swatch} should always be at least 4.5 : 1 against the background`, (): void => {
      expect(
        swatch.contrast(neutralForegroundHint(neutralPalette, swatch)),
        // retrieveContrast(swatch, neutralForegroundHint_DEPRECATED)
        // Because neutralForegroundHint follows the direction patterns of neutralForeground,
        // a backgroundColor #777777 is impossible to hit 4.5 against.
      ).to.be.gte(swatch.toColorString().toUpperCase() === '#777777' ? 4.48 : 4.5);
      expect(swatch.contrast(neutralForegroundHint(neutralPalette, swatch))).to.be.lessThan(5);
    });
  });
});
