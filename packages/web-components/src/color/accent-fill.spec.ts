import { expect } from "chai";
import {
    accentBaseColor,
    accentPalette as getAccentPalette,
    DesignSystem,
    DesignSystemDefaults,
    neutralPalette as getNeutralPalette,
} from "../fluent-design-system";
import {
    accentFillActive,
    accentFillHover,
    accentFillLargeActive,
    accentFillLargeHover,
    accentFillLargeRest,
    accentFillLargeSelected,
    accentFillRest,
    accentFillSelected,
} from "./accent-fill";
import { findClosestSwatchIndex, Palette } from "./palette";
import { contrast, Swatch } from "./common";
import { accentForegroundCut } from "./accent-foreground-cut";

describe("accentFill", (): void => {
    const neutralPalette: Palette = getNeutralPalette(DesignSystemDefaults);
    const accentPalette: Palette = getAccentPalette(DesignSystemDefaults);

    const accentIndex: number = findClosestSwatchIndex(
        getAccentPalette,
        accentBaseColor(DesignSystemDefaults)
    )(DesignSystemDefaults);

    it("should operate on design system defaults", (): void => {
        [
            accentFillActive,
            accentFillHover,
            accentFillLargeActive,
            accentFillLargeHover,
            accentFillLargeRest,
            accentFillLargeSelected,
            accentFillRest,
            accentFillSelected,
        ].forEach(fn => {
            expect(accentPalette).to.include(fn({} as DesignSystem));
        });
    });

    it("should accept a function that resolves a background swatch", (): void => {
        expect(typeof accentFillRest(() => "#FFF")).to.equal("function");
        expect(accentFillRest(() => "#000")({} as DesignSystem)).to.equal(accentPalette[63]);
    });

    it("should have accessible rest and hover colors against accentForegroundCut", (): void => {
        const accentColors: Swatch[] = [
            "#0078D4",
            "#107C10",
            "#5C2D91",
            "#D83B01",
            "#F2C812",
        ];

        accentColors.forEach((accent: Swatch): void => {
            neutralPalette.forEach((swatch: Swatch): void => {
                const designSystem: DesignSystem = Object.assign(
                    {},
                    DesignSystemDefaults,
                    {
                        backgroundColor: swatch,
                        accentPaletteSource: ["#FFF", accent, "#000"],
                    }
                );

                const accentForegroundCutColor: Swatch = accentForegroundCut(
                    designSystem
                );

                expect(
                    contrast(accentForegroundCutColor, accentFillRest(designSystem))
                ).to.be.gte(4.5);
                expect(
                    contrast(accentForegroundCutColor, accentFillHover(designSystem))
                ).to.be.gte(4.5);
                expect(
                    contrast(accentForegroundCutColor, accentFillLargeRest(designSystem))
                ).to.be.gte(3);
                expect(
                    contrast(accentForegroundCutColor, accentFillLargeHover(designSystem))
                ).to.be.gte(3);
            });
        });
    });
});
