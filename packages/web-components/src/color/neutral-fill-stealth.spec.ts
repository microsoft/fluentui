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
        expect(neutralFillStealthRest({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralFillStealthRestDelta]
        );
        expect(neutralFillStealthHover({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta]
        );
        expect(neutralFillStealthActive({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralFillStealthActiveDelta]
        );
        expect(neutralFillStealthFocus({} as DesignSystem)).to.be(
            neutralPalette[DesignSystemDefaults.neutralFillStealthFocusDelta]
        );
        expect(neutralFillStealthSelected({} as DesignSystem)).to.be(
            neutralPalette[
                DesignSystemDefaults.neutralFillStealthRestDelta +
                    DesignSystemDefaults.neutralFillStealthSelectedDelta
            ]
        );
    });

    it("should switch from dark to light after 10 swatches", (): void => {
        expect(neutralFillStealthHover(DesignSystemDefaults)).to.be(
            neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta]
        );
        expect(
            neutralFillStealthHover(() => neutralPalette[1])(DesignSystemDefaults)
        ).to.be(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 1]);
        expect(
            neutralFillStealthHover(() => neutralPalette[2])(DesignSystemDefaults)
        ).to.be(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 2]);
        expect(
            neutralFillStealthHover(() => neutralPalette[9])(DesignSystemDefaults)
        ).to.be(neutralPalette[DesignSystemDefaults.neutralFillStealthHoverDelta + 9]);
        expect(
            neutralFillStealthHover(() => neutralPalette[10])(DesignSystemDefaults)
        ).to.be(neutralPalette[10 - DesignSystemDefaults.neutralFillStealthHoverDelta]);
    });

    it("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(neutralFillStealthRest(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillStealthRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthHover(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillStealthHover(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthActive(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillStealthActive(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthFocus(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillStealthFocus(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillStealthSelected(() => swatch)(DesignSystemDefaults)).to.be(
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

            expect(backplates.rest).to.be(rest);
            expect(backplates.hover).to.be(hover);
            expect(backplates.active).to.be(active);
            expect(backplates.focus).to.be(focus);
            expect(backplates.selected).to.be(selected);
        });
    });
});
