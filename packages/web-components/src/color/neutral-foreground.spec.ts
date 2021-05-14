import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from 'chai';
import { PaletteRGB } from "../color-vNext/palette";
import { neutralForeground } from "../color-vNext/recipes/neutral-foreground";
import { SwatchRGB } from "../color-vNext/swatch";
import { DesignSystemDefaults } from '../fluent-design-system';
import { neutralForegroundActive, neutralForegroundHover, neutralForegroundRest } from './neutral-foreground';
import { neutralBaseColor } from "./color-constants";
import { contrast } from "./common";


describe('neutralForeground', (): void => {
  it('should return a string when invoked with an object', (): void => {
    expect(typeof neutralForegroundRest(DesignSystemDefaults)).to.equal('string');
    expect(typeof neutralForegroundHover(DesignSystemDefaults)).to.equal('string');
    expect(typeof neutralForegroundActive(DesignSystemDefaults)).to.equal('string');
  });

  it('should return a function when invoked with a function', (): void => {
    expect(typeof neutralForegroundRest(() => '#FFF')).to.equal('function');
    expect(typeof neutralForegroundHover(() => '#FFF')).to.equal('function');
    expect(typeof neutralForegroundActive(() => '#FFF')).to.equal('function');
  });

  it('should operate on default design system if no design system is supplied', (): void => {
    expect(contrast(neutralForegroundRest(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundRest(() => undefined as any)(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundRest(() => '#FFF')(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundRest(() => '#FFFFFF')(undefined as any), '#FFF')).to.be.gte(14);

    expect(contrast(neutralForegroundHover(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundHover(() => undefined as any)(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundHover(() => '#FFF')(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundHover(() => '#FFFFFF')(undefined as any), '#FFF')).to.be.gte(14);

    expect(contrast(neutralForegroundActive(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundActive(() => undefined as any)(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundActive(() => '#FFF')(undefined as any), '#FFF')).to.be.gte(14);
    expect(contrast(neutralForegroundActive(() => '#FFFFFF')(undefined as any), '#FFF')).to.be.gte(14);
  });

  it('should return correct result with default design system values', (): void => {
    expect(contrast(neutralForegroundRest(DesignSystemDefaults), '#FFF')).to.be.gte(14);
  });

  it('should return #FFFFFF with a dark background', (): void => {
    expect(
      contrast(
        neutralForegroundRest(
          Object.assign({}, DesignSystemDefaults, {
            backgroundColor: '#000',
          }),
        ),
        '#000',
      ),
    ).to.be.gte(14);
  });
});
describe("ensure parity between old and new recipe implementation", () => {
  const color = (parseColorHexRGB(neutralBaseColor)!)
  const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
  palette.swatches.forEach(( newSwatch, index ) => {
          it(`should be the same for ${newSwatch}`, () => {
              expect(neutralForegroundRest({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]})).to.be.equal(neutralForeground( palette, newSwatch).toColorString().toUpperCase())
      });
  })
})
