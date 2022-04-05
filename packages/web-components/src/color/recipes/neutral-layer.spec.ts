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

const neutralPalette = PaletteRGB.from(middleGrey);

const enum NeutralPaletteLightModeOffsets {
  L1 = 1,
  L2 = 3,
  L3 = 5,
  L4 = 7,
}

const enum NeutralPaletteDarkModeOffsets {
  L1 = 47,
  L2 = 49,
  L3 = 51,
  L4 = 52,
}

describe('neutralLayer', (): void => {
  describe('1', (): void => {
    it('should return values from 1 when in light mode', (): void => {
      expect(neutralLayer1(neutralPalette, StandardLuminance.LightMode).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L1).toColorString(),
      );
    });
    it('should return values from 1 when in dark mode', (): void => {
      expect(neutralLayer1(neutralPalette, StandardLuminance.DarkMode).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L1).toColorString(),
      );
    });
  });

  describe('2', (): void => {
    it('should return values from 2 when in light mode', (): void => {
      expect(neutralLayer2(neutralPalette, StandardLuminance.LightMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L2).toColorString(),
      );
    });
    it('should return values from 2 when in dark mode', (): void => {
      expect(neutralLayer2(neutralPalette, StandardLuminance.DarkMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L2).toColorString(),
      );
    });
  });

  describe('3', (): void => {
    it('should return values from 3 when in light mode', (): void => {
      expect(neutralLayer3(neutralPalette, StandardLuminance.LightMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L3).toColorString(),
      );
    });
    it('should return values from 3 when in dark mode', (): void => {
      expect(neutralLayer3(neutralPalette, StandardLuminance.DarkMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L3).toColorString(),
      );
    });
  });

  describe('4', (): void => {
    it('should return values from 4 when in light mode', (): void => {
      expect(neutralLayer4(neutralPalette, StandardLuminance.LightMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteLightModeOffsets.L4).toColorString(),
      );
    });
    it('should return values from 4 when in dark mode', (): void => {
      expect(neutralLayer4(neutralPalette, StandardLuminance.DarkMode, -2).toColorString()).to.equal(
        neutralPalette.get(NeutralPaletteDarkModeOffsets.L4).toColorString(),
      );
    });
  });

  describe('neutralLayerFloating', (): void => {
    it('should return a color from the neutral palette', (): void => {
      expect(
        neutralPalette.swatches.includes(
          neutralLayerFloating(neutralPalette, StandardLuminance.LightMode, -2) as SwatchRGB,
        ),
      ).to.be.true;
    });
  });
});
