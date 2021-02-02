import { expect } from "chai";
import {
    accentPalette as getAccentPalette,
    DesignSystem,
    DesignSystemDefaults,
    neutralPalette as getNeutralPalette,
} from "../fluent-design-system";
import { clamp, FillSwatchFamily, Swatch } from "./common";
import {
    neutralFillInput,
    neutralFillInputActive,
    neutralFillInputFocus,
    neutralFillInputHover,
    neutralFillInputRest,
    neutralFillInputSelected,
} from "./neutral-fill-input";
import { isDarkMode, Palette } from "./palette";

describe("neutralFillInput", (): void => {
    const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

    it("should operate on design system defaults", (): void => {
        expect(neutralFillInputRest({} as DesignSystem)).to.be(neutralPalette[0]);
        expect(neutralFillInputHover({} as DesignSystem)).to.be(neutralPalette[0]);
        expect(neutralFillInputActive({} as DesignSystem)).to.be(neutralPalette[0]);
        expect(neutralFillInputFocus({} as DesignSystem)).to.be(neutralPalette[0]);
        expect(neutralFillInputSelected({} as DesignSystem)).to.be(neutralPalette[0]);
    });

    it("should always be lighter than the background by the delta in light mode and darker in dark mode", (): void => {
        neutralPalette.forEach((swatch: Swatch, index: number): void => {
            const designSystem: DesignSystem = {
                backgroundColor: neutralPalette[index],
            } as DesignSystem;

            expect(neutralFillInputSelected(designSystem)).to.be(
                neutralPalette[
                    clamp(
                        index -
                            DesignSystemDefaults.neutralFillInputRestDelta *
                                (isDarkMode(designSystem) ? -1 : 1),
                        0,
                        neutralPalette.length - 1
                    )
                ]
            );
        });
    });

    it("should return the same color from both implementations", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            expect(neutralFillInputRest(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillInputRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillInputHover(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillInputHover(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillInputActive(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillInputActive(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillInputFocus(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillInputFocus(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
            expect(neutralFillInputSelected(() => swatch)(DesignSystemDefaults)).to.be(
                neutralFillInputSelected(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: swatch,
                    })
                )
            );
        });
    });

    it("should have consistent return values", (): void => {
        neutralPalette.concat(accentPalette).forEach((swatch: Swatch): void => {
            const backplates: FillSwatchFamily = neutralFillInput(() => swatch)(
                DesignSystemDefaults
            );
            const rest: Swatch = neutralFillInputRest(() => swatch)(DesignSystemDefaults);
            const hover: Swatch = neutralFillInputHover(() => swatch)(
                DesignSystemDefaults
            );
            const active: Swatch = neutralFillInputActive(() => swatch)(
                DesignSystemDefaults
            );
            const focus: Swatch = neutralFillInputFocus(() => swatch)(
                DesignSystemDefaults
            );
            const selected: Swatch = neutralFillInputSelected(() => swatch)(
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
