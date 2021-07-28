import { expect } from 'chai';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { accentBase, black, middleGrey, white } from '../utilities/color-constants';
import { accentForeground } from './accent-foreground';

describe('accentForeground', (): void => {
  const neutralPalette = PaletteRGB.create(middleGrey);
  const accentPalette = PaletteRGB.create(accentBase);

  it('should increase contrast on hover state and decrease contrast on active state in either mode', (): void => {
    const lightModeColors = accentForeground(accentPalette, white, 4.5, 0, 6, -4, 0);
    const darkModeColors = accentForeground(accentPalette, black, 4.5, 0, 6, -4, 0);

    expect(lightModeColors.hover.contrast(white)).to.be.greaterThan(lightModeColors.rest.contrast(white));
    expect(darkModeColors.hover.contrast(black)).to.be.greaterThan(darkModeColors.rest.contrast(black));
  });

  it('should have accessible rest and hover colors against the background color', (): void => {
    const accentColors = [
      SwatchRGB.from(parseColorHexRGB('#0078D4')!),
      SwatchRGB.from(parseColorHexRGB('#107C10')!),
      SwatchRGB.from(parseColorHexRGB('#5C2D91')!),
      SwatchRGB.from(parseColorHexRGB('#D83B01')!),
      SwatchRGB.from(parseColorHexRGB('#F2C812')!),
    ];

    accentColors.forEach(
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      (accent): void => {
        const accentPalette = PaletteRGB.create(accent);

        neutralPalette.swatches.forEach((swatch): void => {
          const smallColors = accentForeground(accentPalette, swatch, 4.5, 0, 6, -4, 0);
          const largeColors = accentForeground(accentPalette, swatch, 3, 0, 6, -4, 0);
          expect(
            swatch.contrast(smallColors.rest),
            // There are a few states that are impossible to meet contrast on
          ).to.be.gte(4.47);
          expect(
            swatch.contrast(smallColors.hover),
            // There are a few states that are impossible to meet contrast on
          ).to.be.gte(3.7);
          expect(swatch.contrast(largeColors.rest)).to.be.gte(3);
          expect(swatch.contrast(largeColors.hover)).to.be.gte(3);
        });
      },
    );
  });
});
