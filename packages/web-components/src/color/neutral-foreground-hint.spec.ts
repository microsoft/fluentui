import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from 'chai';
import {
  accentPalette as getAccentPalette,
  DesignSystemDefaults,
  neutralPalette as getNeutralPalette,
} from '../fluent-design-system';
import { neutralForegroundHint, neutralForegroundHintLarge } from './neutral-foreground-hint';
import { Palette } from './palette';
import { contrast, Swatch, SwatchRecipe } from './common';
import { neutralBaseColor } from "./color-constants";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { neutralForegroundHint as neutralForegroundHintNew } from "../color-vNext/recipes/neutral-foreground-hint";

describe('neutralForegroundHint', (): void => {
  const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
  const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

  it('should implement design system defaults', (): void => {
    expect(neutralForegroundHint(undefined as any)).to.equal('#767676');
  });

  neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
    it(`${swatch} should resolve a color from the neutral palette`, (): void => {
      expect(
        neutralPalette.indexOf(
          neutralForegroundHint(
            Object.assign({}, DesignSystemDefaults, {
              backgroundColor: swatch,
            }),
          ),
        ),
      ).not.to.equal(-1);
    });
  });

  it('should return the same color from both methods of setting the reference background', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      expect(
        neutralForegroundHint(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      ).to.equal(neutralForegroundHint(() => swatch)(DesignSystemDefaults));
    });
  });

  function retrieveContrast(resolvedSwatch: Swatch, fn: SwatchRecipe): number {
    return parseFloat(contrast(fn(() => resolvedSwatch)(DesignSystemDefaults), resolvedSwatch).toPrecision(3));
  }
  neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
    it(`${swatch} should always be at least 4.5 : 1 against the background`, (): void => {
      expect(
        retrieveContrast(swatch, neutralForegroundHint),
        // Because neutralForegroundHint follows the direction patterns of neutralForeground,
        // a backgroundColor #777777 is impossible to hit 4.5 against.
      ).to.be.gte(swatch === '#777777' ? 4.48 : 4.5);
      expect(retrieveContrast(swatch, neutralForegroundHint)).to.be.lessThan(5);
      expect(retrieveContrast(swatch, neutralForegroundHintLarge)).to.be.gte(3);
      expect(retrieveContrast(swatch, neutralForegroundHintLarge)).to.be.lessThan(3.3);
    });
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach(( newSwatch, index ) => {
      it(`should be the same for ${newSwatch.toColorString()}`, () => {
          expect(neutralForegroundHintNew(palette, newSwatch).toColorString().toUpperCase()).to.equal(
              neutralForegroundHint({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]})
          )
      })
  })
})
