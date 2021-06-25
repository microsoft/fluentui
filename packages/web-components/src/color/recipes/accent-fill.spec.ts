import { parseColorHexRGB } from '@microsoft/fast-colors';
import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { accentFill } from './accent-fill';
import { foregroundOnAccent as foregroundOnAccentNew } from './foreground-on-accent';

describe('accentFill', (): void => {
  const neutralPalette = PaletteRGB.create(SwatchRGB.create(0.5, 0.5, 0.5));

  it('should have accessible rest and hover colors against accentForegroundCut', (): void => {
    const accentColors = [
      SwatchRGB.from(parseColorHexRGB('#0078D4')!),
      SwatchRGB.from(parseColorHexRGB('#107C10')!),
      SwatchRGB.from(parseColorHexRGB('#5C2D91')!),
      SwatchRGB.from(parseColorHexRGB('#D83B01')!),
      SwatchRGB.from(parseColorHexRGB('#F2C812')!),
    ];

    accentColors.forEach((accent: SwatchRGB): void => {
      const accentPalette = PaletteRGB.create(accent);

      neutralPalette.swatches.forEach((swatch: SwatchRGB): void => {
        const accentForegroundCutColor = foregroundOnAccentNew(accentPalette.source, 4.5);
        const accentFillColors = accentFill(
          accentPalette,
          neutralPalette,
          swatch,
          accentForegroundCutColor,
          4.5,
          4,
          -5,
          0,
          7,
          10,
          5,
        );
        const accentFillLargeColors = accentFill(
          accentPalette,
          neutralPalette,
          swatch,
          accentForegroundCutColor,
          3,
          4,
          -5,
          0,
          7,
          10,
          5,
        );

        expect(accentForegroundCutColor.contrast(accentFillColors.rest)).to.be.gte(4.5);
        expect(accentForegroundCutColor.contrast(accentFillColors.hover)).to.be.gte(4.5);
        expect(accentForegroundCutColor.contrast(accentFillLargeColors.rest)).to.be.gte(3);
        expect(accentForegroundCutColor.contrast(accentFillLargeColors.hover)).to.be.gte(3);
      });
    });
  });
});
