import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from 'chai';
import {
  accentPalette as getAccentPalette,
  DesignSystem,
  DesignSystemDefaults,
  neutralPalette as getNeutralPalette,
} from '../fluent-design-system';
import {
  neutralFillStealth,
  neutralFillStealthActive,
  neutralFillStealthFocus,
  neutralFillStealthHover,
  neutralFillStealthRest,
  neutralFillStealthSelected,
} from './neutral-fill-stealth';
import { Palette } from './palette';
import { FillSwatchFamily, Swatch } from './common';
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { neutralBaseColor } from "./color-constants";
import { neutralFillStealth as neutralFillStealthNew } from "../color-vNext/recipes/neutral-fill-stealth";

describe('neutralFillStealth', (): void => {
  const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
  const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

  it('should operate on design system defaults', (): void => {
    [
      neutralFillStealthActive,
      neutralFillStealthFocus,
      neutralFillStealthHover,
      neutralFillStealthRest,
      neutralFillStealthSelected,
    ].forEach(fn => {
      expect(neutralPalette).to.include(fn({} as DesignSystem));
    });
  });

  it('should switch from dark to light after 10 swatches', (): void => {
    expect(neutralFillStealthHover(DesignSystemDefaults)).to.equal(
      neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta],
    );
    expect(neutralFillStealthHover(() => neutralPalette[1])(DesignSystemDefaults)).to.equal(
      neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 1],
    );
    expect(neutralFillStealthHover(() => neutralPalette[2])(DesignSystemDefaults)).to.equal(
      neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 2],
    );
    expect(neutralFillStealthHover(() => neutralPalette[9])(DesignSystemDefaults)).to.equal(
      neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 9],
    );
    expect(neutralFillStealthHover(() => neutralPalette[10])(DesignSystemDefaults)).to.equal(
      neutralPalette[10 - DesignSystemDefaults.neutralFillStealthHoverDelta],
    );
  });

  it('should return the same color from both implementations', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      expect(neutralFillStealthRest(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillStealthRest(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillStealthHover(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillStealthHover(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillStealthActive(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillStealthActive(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillStealthFocus(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillStealthFocus(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillStealthSelected(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillStealthSelected(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
    });
  });

  it('should have consistent return values', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      const backplates: FillSwatchFamily = neutralFillStealth(() => swatch)(DesignSystemDefaults);
      const rest: Swatch = neutralFillStealthRest(() => swatch)(DesignSystemDefaults);
      const hover: Swatch = neutralFillStealthHover(() => swatch)(DesignSystemDefaults);
      const active: Swatch = neutralFillStealthActive(() => swatch)(DesignSystemDefaults);
      const focus: Swatch = neutralFillStealthFocus(() => swatch)(DesignSystemDefaults);
      const selected: Swatch = neutralFillStealthSelected(() => swatch)(DesignSystemDefaults);

      expect(backplates.rest).to.equal(rest);
      expect(backplates.hover).to.equal(hover);
      expect(backplates.active).to.equal(active);
      expect(backplates.focus).to.equal(focus);
      expect(backplates.selected).to.equal(selected);
    });
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach(( newSwatch, index ) => {
      const {
          neutralFillStealthRestDelta,
          neutralFillStealthHoverDelta,
          neutralFillStealthActiveDelta,
          neutralFillStealthFocusDelta,
          neutralFillStealthSelectedDelta,
          neutralFillRestDelta,
          neutralFillHoverDelta,
          neutralFillActiveDelta,
          neutralFillFocusDelta
      } = DesignSystemDefaults;
      const oldValues = neutralFillStealth({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]});
      const newValues = neutralFillStealthNew(
          palette,
          newSwatch,
          neutralFillStealthRestDelta,
          neutralFillStealthHoverDelta,
          neutralFillStealthActiveDelta,
          neutralFillStealthFocusDelta,
          neutralFillStealthSelectedDelta,
          neutralFillRestDelta,
          neutralFillHoverDelta,
          neutralFillActiveDelta,
          neutralFillFocusDelta
      );
          it(`should be the same for ${newSwatch}`, () => {
              for (let key in oldValues) {
                  expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase())
              }
      });
  })
})
