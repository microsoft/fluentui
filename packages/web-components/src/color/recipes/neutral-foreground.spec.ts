import { expect } from 'chai';
import { PaletteRGB } from '../palette';
import { neutralForeground } from './neutral-foreground';
import { middleGrey, white } from '../utilities/color-constants';

describe('neutralForeground', (): void => {
  const neutralPalette = PaletteRGB.create(middleGrey);

  it('should return correct result with default design system values', (): void => {
    expect(
      neutralForeground(neutralPalette, neutralPalette.get(88), 14, 2, 4, 0).rest.contrast(
        neutralPalette.get(neutralPalette.swatches.length - 1),
      ),
    ).to.be.gte(14);
  });

  it('should return #FFFFFF with a dark background', (): void => {
    expect(neutralForeground(neutralPalette, white, 14, 2, 4, 0).rest.contrast(white)).to.be.gte(14);
  });
});
