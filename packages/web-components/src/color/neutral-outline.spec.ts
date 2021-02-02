import { expect } from "chai";
import { isColorStringHexRGB } from "@microsoft/fast-colors";
import {
    DesignSystem,
    DesignSystemDefaults,
    accentPalette as getAccentPalette,
    neutralPalette as getNeutralPalette,
} from "../fluent-design-system";
import {
    neutralOutline,
    neutralOutlineActive,
    neutralOutlineFocus,
    neutralOutlineHover,
    neutralOutlineRest,
} from "./neutral-outline";
import { Palette } from "./palette";
import { Swatch, SwatchFamily } from "./common";

describe("neutralOutline", (): void => {
    const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

    it("should return by default", (): void => {
        expect(neutralOutlineRest({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralOutlineRestDelta]
        );
        expect(neutralOutlineHover({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralOutlineHoverDelta]
        );
        expect(neutralOutlineActive({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralOutlineActiveDelta]
        );
        expect(neutralOutlineFocus({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralOutlineFocusDelta]
        );
    });

    it("should always return a color", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(
                isColorStringHexRGB(neutralOutlineRest(() => swatch)({} as DesignSystem))
            ).to.equal(true);
        });
    });

    it("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(neutralOutlineRest(() => swatch)(DesignSystemDefaults)).to.be(
                neutralOutlineRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralOutlineHover(() => swatch)(DesignSystemDefaults)).to.be(
                neutralOutlineHover(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralOutlineActive(() => swatch)(DesignSystemDefaults)).to.be(
                neutralOutlineActive(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralOutlineFocus(() => swatch)(DesignSystemDefaults)).to.be(
                neutralOutlineFocus(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
        });
    });

    it("should have consistent return values", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            const backplates: SwatchFamily = neutralOutline(() => swatch)(
                DesignSystemDefaults
            );
            const rest: Swatch = neutralOutlineRest(() => swatch)(DesignSystemDefaults);
            const hover: Swatch = neutralOutlineHover(() => swatch)(DesignSystemDefaults);
            const active: Swatch = neutralOutlineActive(() => swatch)(
                DesignSystemDefaults
            );
            const focus: Swatch = neutralOutlineFocus(() => swatch)(DesignSystemDefaults);

            expect(backplates.rest).to.be(rest);
            expect(backplates.hover).to.be(hover);
            expect(backplates.active).to.be(active);
            expect(backplates.focus).to.be(focus);
        });
    });
});
