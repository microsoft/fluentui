import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from 'chai';
import { DesignSystem, DesignSystemDefaults } from '../fluent-design-system';
import { neutralFocus } from './neutral-focus';
import { contrast } from './common';
import { neutralBaseColor } from "./color-constants";
import { PaletteRGB } from "../color-vNext/palette";
import { SwatchRGB } from "../color-vNext/swatch";
import { neutralFocus as neutralFocusNew } from "../color-vNext/recipes/neutral-focus";

describe('neutralFocus', (): void => {
  it('should return a string when invoked with an object', (): void => {
    expect(typeof neutralFocus(DesignSystemDefaults)).to.equal('string');
  });

  it('should return a function when invoked with a function', (): void => {
    expect(typeof neutralFocus(() => '#FFF')).to.equal('function');
  });

  it('should operate on default design system if no design system is supplied', (): void => {
    expect(contrast(neutralFocus({} as DesignSystem), '#FFF')).to.be.gte(3.5);
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach(( newSwatch, index ) => {
          it(`should be the same for ${newSwatch}`, () => {
              expect(neutralFocus({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]})).to.be.equal(neutralFocusNew( palette, newSwatch).toColorString().toUpperCase())
      });
  })
})
