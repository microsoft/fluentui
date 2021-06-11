import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from 'chai';
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { DesignSystemDefaults, DesignSystem } from '../fluent-design-system';
import { accentForegroundCut, accentForegroundCutLarge } from './accent-foreground-cut';
import { neutralBaseColor, accentBaseColor } from "./color-constants";
import { Swatch } from "./common";
import { foregroundOnAccent as foregroundOnAccentNew } from "../color-vNext/recipes/foreground-on-accent";

describe('Cut text', (): void => {
  it('should return white by by default', (): void => {
    expect(accentForegroundCut(undefined as any)).to.equal('#FFFFFF');
    expect(accentForegroundCutLarge(undefined as any)).to.equal('#FFFFFF');
  });
  it('should return black when background does not meet contrast ratio', (): void => {
    expect(accentForegroundCut((): Swatch => '#FFF')({} as any)).to.equal('#000000');
    expect(accentForegroundCutLarge((): Swatch => '#FFF')({} as any)).to.equal('#000000');

    expect(
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      accentForegroundCut((designSystem: DesignSystem) => '#FFF')(DesignSystemDefaults),
    ).to.equal('#000000');
    expect(
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      accentForegroundCutLarge((designSystem: DesignSystem) => '#FFF')(DesignSystemDefaults),
    ).to.equal('#000000');
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(accentBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  it(
      `should be the same for ${palette.source}`,
      () => {
          expect(
              accentForegroundCut(
                  { ...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.accentBaseColor }
              )
          ).to.be.equal(
            foregroundOnAccentNew(palette.source, 4.5).toColorString().toUpperCase()
          )
      }
  )
})
