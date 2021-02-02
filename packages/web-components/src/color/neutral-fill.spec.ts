import { expect } from "chai";
import {
    accentPalette as getAccentPalette,
    DesignSystem,
    DesignSystemDefaults,
    neutralPalette as getNeutralPalette,
} from "../fluent-design-system";
import {
    neutralFill,
    neutralFillActive,
    neutralFillFocus,
    neutralFillHover,
    neutralFillRest,
    neutralFillSelected,
} from "./neutral-fill";
import { Palette } from "./palette";
import { FillSwatchFamily, Swatch } from "./common";

describe("neutralFill", (): void => {
    const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);
    
    it("should operate on design system defaults", (): void => {
        [
            neutralFillActive,
            neutralFillFocus,
            neutralFillHover,
            neutralFillRest,
            neutralFillSelected,
        ].forEach(fn => {
            expect(neutralPalette).to.include(fn({} as DesignSystem));
        });
    });

    it("should switch from dark to light after 10 swatches", (): void => {
        expect(neutralFillRest(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillRestDelta]
        );
        expect(neutralFillHover(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillHoverDelta]
        );
        expect(neutralFillActive(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillActiveDelta]
        );
        expect(neutralFillFocus(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillFocusDelta]
        );
        expect(neutralFillRest(() => neutralPalette[1])(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillRestDelta + 1]
        );
        expect(neutralFillRest(() => neutralPalette[2])(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillRestDelta + 2]
        );
        expect(neutralFillRest(() => neutralPalette[9])(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillRestDelta + 9]
        );
        expect(neutralFillRest(() => neutralPalette[10])(DesignSystemDefaults)).to.equal(
            neutralPalette[3]
        );
    });

    it("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(neutralFillRest(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillHover(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillHover(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillActive(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillActive(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillFocus(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillFocus(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillSelected(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillSelected(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
        });
    });

    it("should have consistent return values", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            const backplates: FillSwatchFamily = neutralFill(() => swatch)(
                DesignSystemDefaults
            );
            const rest: Swatch = neutralFillRest(() => swatch)(DesignSystemDefaults);
            const hover: Swatch = neutralFillHover(() => swatch)(DesignSystemDefaults);
            const active: Swatch = neutralFillActive(() => swatch)(DesignSystemDefaults);
            const focus: Swatch = neutralFillFocus(() => swatch)(DesignSystemDefaults);
            const selected: Swatch = neutralFillSelected(() => swatch)(
                DesignSystemDefaults
            );

            expect(backplates.rest).to.equal(rest);
            expect(backplates.hover).to.equal(hover);
            expect(backplates.active).to.equal(active);
            expect(backplates.focus).to.equal(focus);
            expect(backplates.selected).to.equal(selected);
        });
    });
});
