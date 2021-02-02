import { expect } from "chai";
import {
    accentPalette as getAccentPalette,
    DesignSystem,
    DesignSystemDefaults,
    neutralPalette as getNeutralPalette,
} from "../fluent-design-system";
import {
    neutralFillStealth,
    neutralFillStealthActive,
    neutralFillStealthFocus,
    neutralFillStealthHover,
    neutralFillStealthRest,
    neutralFillStealthSelected,
} from "./neutral-fill-stealth";
import { Palette } from "./palette";
import { FillSwatchFamily, Swatch } from "./common";

describe("neutralFillStealth", (): void => {
    const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

    it("should operate on design system defaults", (): void => {
        [
            neutralFillStealthActive,
            neutralFillStealthFocus,
            neutralFillStealthHover,
            neutralFillStealthRest,
            neutralFillStealthSelected,
        ].forEach(fn => {
            expect(neutralPalette).to.include(fn({} as DesignSystem));
        });
    });

    it("should switch from dark to light after 10 swatches", (): void => {
        expect(neutralFillStealthHover(DesignSystemDefaults)).to.equal(
            neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta]
        );
        expect(
            neutralFillStealthHover(() => neutralPalette[1])(DesignSystemDefaults)
        ).to.equal(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 1]);
        expect(
            neutralFillStealthHover(() => neutralPalette[2])(DesignSystemDefaults)
        ).to.equal(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 2]);
        expect(
            neutralFillStealthHover(() => neutralPalette[9])(DesignSystemDefaults)
        ).to.equal(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 9]);
        expect(
            neutralFillStealthHover(() => neutralPalette[10])(DesignSystemDefaults)
        ).to.equal(neutralPalette[10 - DesignSystemDefaults.neutralFillStealthHoverDelta]);
    });

    it("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(neutralFillStealthRest(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillStealthRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthHover(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillStealthHover(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthActive(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillStealthActive(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthFocus(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillStealthFocus(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthSelected(() => swatch)(DesignSystemDefaults)).to.equal(
                neutralFillStealthSelected(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
        });
    });

    it("should have consistent return values", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            const backplates: FillSwatchFamily = neutralFillStealth(() => swatch)(
                DesignSystemDefaults
            );
            const rest: Swatch = neutralFillStealthRest(() => swatch)(
                DesignSystemDefaults
            );
            const hover: Swatch = neutralFillStealthHover(() => swatch)(
                DesignSystemDefaults
            );
            const active: Swatch = neutralFillStealthActive(() => swatch)(
                DesignSystemDefaults
            );
            const focus: Swatch = neutralFillStealthFocus(() => swatch)(
                DesignSystemDefaults
            );
            const selected: Swatch = neutralFillStealthSelected(() => swatch)(
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
