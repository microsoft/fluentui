import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { StandardLuminance } from '../utilities/base-layer-luminance';
import { middleGrey } from '../utilities/color-constants';
import { neutralLayerFloating } from './neutral-layer-floating';
import { neutralLayer1 } from './neutral-layer-1';
import { neutralLayer2 } from './neutral-layer-2';
import { neutralLayer3 } from './neutral-layer-3';
import { neutralLayer4 } from './neutral-layer-4';
import { SwatchRGB } from '../swatch';

const neutralPalette = PaletteRGB.create(middleGrey);

const enum NeutralPaletteLightModeOffsets {
  L1 = 0,
  L2 = 10,
  L3 = 13,
  L4 = 16,
}

const enum NeutralPaletteDarkModeOffsets {
  L1 = 76,
  L2 = 79,
  L3 = 82,
  L4 = 85,
}

describe('neutralLayer', (): void => {
  describe('1', (): void => {
    it('should return values from 1 when in light mode', (): void => {
      expect(neutralLayer1(neutralPalette, StandardLuminance.LightMode)).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L1),
      );
    });
    it('should return values from 1 when in dark mode', (): void => {
      expect(neutralLayer1(neutralPalette, StandardLuminance.DarkMode)).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L1),
      );
    });
  });

  describe('2', (): void => {
    it('should return values from 2 when in light mode', (): void => {
      expect(neutralLayer2(neutralPalette, StandardLuminance.LightMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L2),
      );
    });
    it('should return values from 2 when in dark mode', (): void => {
      expect(neutralLayer2(neutralPalette, StandardLuminance.DarkMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L2),
      );
    });
  });

  describe('3', (): void => {
    it('should return values from 3 when in light mode', (): void => {
      expect(neutralLayer3(neutralPalette, StandardLuminance.LightMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L3),
      );
    });
    it('should return values from 3 when in dark mode', (): void => {
      expect(neutralLayer3(neutralPalette, StandardLuminance.DarkMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L3),
      );
    });
  });

  describe('4', (): void => {
    it('should return values from 4 when in light mode', (): void => {
      expect(neutralLayer4(neutralPalette, StandardLuminance.LightMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L4),
      );
    });
    it('should return values from 4 when in dark mode', (): void => {
      expect(neutralLayer4(neutralPalette, StandardLuminance.DarkMode, 3, 7, 10, 5)).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L4),
      );
    });
  });

  describe('neutralLayerFloating', (): void => {
    it('should return a color from the neutral palette', (): void => {
      expect(
        neutralPalette.swatches.includes(
          neutralLayerFloating(neutralPalette, StandardLuminance.LightMode, 3) as SwatchRGB,
        ),
      ).to.be.true;
    });
  });
});
