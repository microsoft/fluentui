import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from "chai";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { DesignSystem, DesignSystemDefaults } from '../fluent-design-system';
import { neutralBaseColor } from "./color-constants";
import { neutralFillCard } from "./neutral-fill-card";
import { neutralFillCard as neutralFillCardNew } from "../color-vNext/recipes/neutral-fill-card"

describe('neutralFillCard', (): void => {
  it('should operate on design system defaults', (): void => {
    expect(neutralFillCard({} as DesignSystem)).to.equal(
      DesignSystemDefaults.neutralPalette[0],
    );
  });
  it('should stay white when the index of the backgroundColor is lower than the offset index', (): void => {
    for (let i: number = 0; i < DesignSystemDefaults.neutralFillCardDelta; i++) {
      expect(
        DesignSystemDefaults.neutralPalette.indexOf(
          neutralFillCard(
            Object.assign({}, DesignSystemDefaults, {
              backgroundColor: DesignSystemDefaults.neutralPalette[i],
            }),
          ),
        ),
      ).to.equal(0);
    }
  });
  it('should return the color at three steps lower than the background color', (): void => {
    for (let i: number = 3; i < DesignSystemDefaults.neutralPalette.length; i++) {
      expect(
        DesignSystemDefaults.neutralPalette.indexOf(
          neutralFillCard(
            Object.assign({}, DesignSystemDefaults, {
              backgroundColor: DesignSystemDefaults.neutralPalette[i],
            }),
          ),
        ),
      ).to.equal(i - 3);
    }
  });
  it('should generate a color based on the background color returned by a provided callback', (): void => {
    expect(neutralFillCard(() => DesignSystemDefaults.neutralPalette[4])(DesignSystemDefaults)).to.equal(
      DesignSystemDefaults.neutralPalette[1],
    );
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  const { neutralFillCardDelta } = DesignSystemDefaults;
  palette.swatches.forEach(( newSwatch, index ) => {
          it(`should be the same for ${newSwatch}`, () => {
              expect(
                  neutralFillCard({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]})
              ).to.be.equal(neutralFillCardNew( palette, newSwatch, neutralFillCardDelta).toColorString().toUpperCase())
      });
  })
})
