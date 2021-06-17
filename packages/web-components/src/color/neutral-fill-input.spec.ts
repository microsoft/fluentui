import { parseColorHexRGB } from '@microsoft/fast-colors';
import { expect } from 'chai';
import { PaletteRGB } from '../color-vNext/palette';
import { SwatchRGB } from '../color-vNext/swatch';
import {
  accentPalette as getAccentPalette,
  DesignSystem,
  DesignSystemDefaults,
  neutralPalette as getNeutralPalette,
} from '../fluent-design-system';
import { neutralBaseColor } from './color-constants';
import { clamp, FillSwatchFamily, Swatch } from './common';
import {
  neutralFillInput,
  neutralFillInputActive,
  neutralFillInputFocus,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralFillInputSelected,
} from './neutral-fill-input';
import { isDarkMode, Palette } from './palette';
import { neutralFillInput as neutralFillInputNew } from '../color-vNext/recipes/neutral-fill-input';

describe('neutralFillInput', (): void => {
  const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
  const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

  it('should operate on design system defaults', (): void => {
    [
      neutralFillInputActive,
      neutralFillInputFocus,
      neutralFillInputHover,
      neutralFillInputRest,
      neutralFillInputSelected,
    ].forEach(fn => {
      expect(neutralPalette).to.include(fn({} as DesignSystem));
    });
  });

  it('should always be lighter than the background by the delta in light mode and darker in dark mode', (): void => {
    neutralPalette.forEach((swatch: Swatch, index: number): void => {
      const designSystem: DesignSystem = {
        backgroundColor: neutralPalette[index],
      } as DesignSystem;

      expect(neutralFillInputSelected(designSystem)).to.equal(
        neutralPalette[
          clamp(
            index - DesignSystemDefaults.neutralFillInputRestDelta * (isDarkMode(designSystem) ? -1 : 1),
            0,
            neutralPalette.length - 1,
          )
        ],
      );
    });
  });

  it('should return the same color from both implementations', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      expect(neutralFillInputRest(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillInputRest(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillInputHover(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillInputHover(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillInputActive(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillInputActive(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillInputFocus(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillInputFocus(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
      expect(neutralFillInputSelected(() => swatch)(DesignSystemDefaults)).to.equal(
        neutralFillInputSelected(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: swatch,
          }),
        ),
      );
    });
  });

  it('should have consistent return values', (): void => {
    neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
      const backplates: FillSwatchFamily = neutralFillInput(() => swatch)(DesignSystemDefaults);
      const rest: Swatch = neutralFillInputRest(() => swatch)(DesignSystemDefaults);
      const hover: Swatch = neutralFillInputHover(() => swatch)(DesignSystemDefaults);
      const active: Swatch = neutralFillInputActive(() => swatch)(DesignSystemDefaults);
      const focus: Swatch = neutralFillInputFocus(() => swatch)(DesignSystemDefaults);
      const selected: Swatch = neutralFillInputSelected(() => swatch)(DesignSystemDefaults);

      expect(backplates.rest).to.equal(rest);
      expect(backplates.hover).to.equal(hover);
      expect(backplates.active).to.equal(active);
      expect(backplates.focus).to.equal(focus);
      expect(backplates.selected).to.equal(selected);
    });
  });
});
describe('ensure parity between old and new recipe implementation', () => {
  const color = parseColorHexRGB(neutralBaseColor)!;
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach((newSwatch, index) => {
    const {
      neutralFillInputRestDelta,
      neutralFillInputHoverDelta,
      neutralFillInputActiveDelta,
      neutralFillInputFocusDelta,
    } = DesignSystemDefaults;
    const oldValues = neutralFillInput({
      ...DesignSystemDefaults,
      backgroundColor: DesignSystemDefaults.neutralPalette[index],
    });
    const newValues = neutralFillInputNew(
      palette,
      newSwatch,
      neutralFillInputRestDelta,
      neutralFillInputHoverDelta,
      neutralFillInputActiveDelta,
      neutralFillInputFocusDelta,
    );
    it(`should be the same for ${newSwatch.toColorString()}`, () => {
      for (let key in oldValues) {
        if (key !== 'selected') {
          expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase());
        }
      }
    });
  });
});
