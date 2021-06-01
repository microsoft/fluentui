import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from "chai";
import { PaletteRGB } from "../color-vNext/palette";
import { neutralFillInverse as neutralFillInverseNew } from "../color-vNext/recipes/neutral-fill-inverse";
import { SwatchRGB } from "../color-vNext/swatch";
import { DesignSystemDefaults } from "../fluent-design-system";
import { neutralBaseColor } from "./color-constants";
import { neutralContrastFill } from "./neutral-contrast-fill";

describe("ensure parity between old and new recipe implementation", () => {
    const color = (parseColorHexRGB(neutralBaseColor)!)
    const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
    palette.swatches.forEach(( newSwatch, index ) => {
        const { neutralContrastFillHoverDelta, neutralContrastFillActiveDelta, neutralContrastFillFocusDelta} = DesignSystemDefaults;
        const oldValues = neutralContrastFill({...DesignSystemDefaults, backgroundColor: DesignSystemDefaults.neutralPalette[index]});
        const newValues = neutralFillInverseNew(
            palette,
            newSwatch,
            0,
            neutralContrastFillHoverDelta,
            neutralContrastFillActiveDelta,
            neutralContrastFillFocusDelta,
        );
            it(`should be the same for ${newSwatch}`, () => {
                for (let key in oldValues) {
                    expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase())
                }
        });
    })
})
