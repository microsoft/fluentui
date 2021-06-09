import { expect } from 'chai';
import {
  accentPalette as getAccentPalette,
  DesignSystem,
  DesignSystemDefaults,
  neutralPalette as getNeutralPalette,
} from '../fluent-design-system';
import {
  accentFill,
  accentFillActive,
  accentFillHover,
  accentFillLargeActive,
  accentFillLargeHover,
  accentFillLargeRest,
  accentFillLargeSelected,
  accentFillRest,
  accentFillSelected,
} from './accent-fill';
import { findClosestSwatchIndex, Palette } from './palette';
import { contrast, Swatch } from './common';
import { parseColorHexRGB } from "@microsoft/fast-colors";
import { neutralBaseColor, accentBaseColor } from "./color-constants";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { accentFill as accentFillNew } from "../color-vNext/recipes/accent-fill";
import { accentForegroundCut as accentForegroundCutNew  } from '../color-vNext/recipes/accent-foreground-cut';
import { accentForegroundCut } from './accent-foreground-cut';

describe('accentFill', (): void => {
  const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
  const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

  const accentIndex: number = findClosestSwatchIndex(
    getAccentPalette,
    accentBaseColor,
  )(DesignSystemDefaults);

  it('should operate on design system defaults', (): void => {
    [
      accentFillActive,
      accentFillHover,
      accentFillLargeActive,
      accentFillLargeHover,
      accentFillLargeRest,
      accentFillLargeSelected,
      accentFillRest,
      accentFillSelected,
    ].forEach(fn => {
      expect(accentPalette).to.include(fn({} as DesignSystem));
    });
  });

  it('should accept a function that resolves a background swatch', (): void => {
    expect(typeof accentFillRest(() => '#FFF')).to.equal('function');
    expect(accentFillRest(() => '#000')({} as DesignSystem)).to.equal(accentPalette[63]);
  });

  it('should have accessible rest and hover colors against accentForegroundCut', (): void => {
    const accentColors: Swatch[] = ['#0078D4', '#107C10', '#5C2D91', '#D83B01', '#F2C812'];

    accentColors.forEach((accent: Swatch): void => {
      neutralPalette.forEach((swatch: Swatch): void => {
        const designSystem: DesignSystem = Object.assign({}, DesignSystemDefaults, {
          backgroundColor: swatch,
          accentPaletteSource: ['#FFF', accent, '#000'],
        });

        const accentForegroundCutColor: Swatch = accentForegroundCut(designSystem);

        expect(contrast(accentForegroundCutColor, accentFillRest(designSystem))).to.be.gte(4.5);
        expect(contrast(accentForegroundCutColor, accentFillHover(designSystem))).to.be.gte(4.5);
        expect(contrast(accentForegroundCutColor, accentFillLargeRest(designSystem))).to.be.gte(3);
        expect(contrast(accentForegroundCutColor, accentFillLargeHover(designSystem))).to.be.gte(3);
      });
    });
  });
});

describe("ensure parity between old and new recipe implementation", () => {
  const neutralColor = (parseColorHexRGB(neutralBaseColor)!)
  const neutralPalette = PaletteRGB.create(SwatchRGB.create(neutralColor.r, neutralColor.g, neutralColor.b));
  const accentColor = (parseColorHexRGB(accentBaseColor)!)
  const accentPalette = PaletteRGB.create(SwatchRGB.create(accentColor.r, accentColor.g, accentColor.b));
  neutralPalette.swatches.forEach(( newSwatch, index ) => {
      const {
          accentFillHoverDelta,
          accentFillActiveDelta,
          accentFillFocusDelta,
          neutralFillRestDelta,
          neutralFillHoverDelta,
          neutralFillActiveDelta,
      } = DesignSystemDefaults;

      const oldValues = accentFill({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]});
      const textColor = accentForegroundCutNew(accentPalette.source, 4.5);
      const newValues = accentFillNew(
          accentPalette,
          neutralPalette,
          newSwatch,
          textColor,
          4.5,
          accentFillHoverDelta,
          accentFillActiveDelta,
          accentFillFocusDelta,
          neutralFillRestDelta,
          neutralFillHoverDelta,
          neutralFillActiveDelta
          )

          for (let key in oldValues) {
              it(`${newSwatch.toColorString()}old value for ${key} at ${oldValues[key]} should be equal to new value`, () => {
                  expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase())
              } )
          }
  })
})
