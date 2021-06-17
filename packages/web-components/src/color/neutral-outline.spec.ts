import { expect } from 'chai';
import { isColorStringHexRGB, parseColorHexRGB } from "@microsoft/fast-colors";
import {
  DesignSystem,
  DesignSystemDefaults,
  accentPalette as getAccentPalette,
  neutralPalette as getNeutralPalette,
} from '../fluent-design-system';
import {
  neutralOutline,
  neutralOutlineActive,
  neutralOutlineFocus,
  neutralOutlineHover,
  neutralOutlineRest,
} from './neutral-outline';
import { Palette } from './palette';
import { Swatch, SwatchFamily } from './common';
import { neutralBaseColor } from "./color-constants";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { neutralStroke as neutralStrokeNew } from "../color-vNext/recipes/neutral-stroke"

describe('neutralOutline', (): void => {
  const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
  const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

  it('should return by default', (): void => {
    [neutralOutlineActive, neutralOutlineFocus, neutralOutlineHover, neutralOutlineRest].forEach(fn => {
      expect(neutralPalette).to.include(fn({} as DesignSystem));
    });
  });

  it('should always return a color', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      expect(isColorStringHexRGB(neutralOutlineRest(() => swatch)({} as DesignSystem))).to.equal(true);
    });
  });

  it('should return the same color from both implementations', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      expect(neutralOutlineRest(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralOutlineRest(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralOutlineHover(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralOutlineHover(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralOutlineActive(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralOutlineActive(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralOutlineFocus(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralOutlineFocus(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
    });
  });

  it('should have consistent return values', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      const backplates: SwatchFamily = neutralOutline(() => swatch)(DesignSystemDefaults);
      const rest: Swatch = neutralOutlineRest(() => swatch)(DesignSystemDefaults);
      const hover: Swatch = neutralOutlineHover(() => swatch)(DesignSystemDefaults);
      const active: Swatch = neutralOutlineActive(() => swatch)(DesignSystemDefaults);
      const focus: Swatch = neutralOutlineFocus(() => swatch)(DesignSystemDefaults);

      expect(backplates.rest).to.equal(rest);
      expect(backplates.hover).to.equal(hover);
      expect(backplates.active).to.equal(active);
      expect(backplates.focus).to.equal(focus);
    });
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach(( newSwatch, index ) => {
      const { neutralOutlineRestDelta, neutralOutlineHoverDelta, neutralOutlineFocusDelta, neutralOutlineActiveDelta } = DesignSystemDefaults;
      const oldValues = neutralOutline({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]});
      const newValues = neutralStrokeNew(
          palette,
          newSwatch,
          neutralOutlineRestDelta,
          neutralOutlineHoverDelta,
          neutralOutlineActiveDelta,
          neutralOutlineFocusDelta,
      );
          it(`should be the same for ${newSwatch.toColorString()}`, () => {
              for (let key in oldValues) {
                  expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase())
              }
      });
  })
})
