import { expect } from "chai";
import { DesignSystem, DesignSystemDefaults } from "../fluent-design-system";
import {
    neutralLayerCard,
    neutralLayerCardContainer,
    neutralLayerFloating,
    neutralLayerL1,
    neutralLayerL2,
    neutralLayerL3,
    neutralLayerL4,
    StandardLuminance,
} from "./neutral-layer";

const lightModeDesignSystem: DesignSystem = Object.assign({}, DesignSystemDefaults, {
    baseLayerLuminance: StandardLuminance.LightMode,
});

const darkModeDesignSystem: DesignSystem = Object.assign({}, DesignSystemDefaults, {
    baseLayerLuminance: StandardLuminance.DarkMode,
});

const enum NeutralPaletteLightModeOffsets {
    L1 = 0,
    L2 = 10,
    L3 = 13,
    L4 = 16,
}

const enum NeutralPaletteDarkModeOffsets {
    L1 = 76,
    L2 = 79,
    L3 = 82,
    L4 = 85,
}

describe("neutralLayer", (): void => {
    describe("L1", (): void => {
        it("should return values from L1 when in light mode", (): void => {
            expect(neutralLayerL1(lightModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L1]
            );
        });
        it("should return values from L1 when in dark mode", (): void => {
            expect(neutralLayerL1(darkModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L1]
            );
        });
        it("should operate on a provided background color", (): void => {
            expect(neutralLayerL1((): string => "#000000")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L1]
            );
            expect(neutralLayerL1((): string => "#FFFFFF")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L1]
            );
        });
    });

    describe("L2", (): void => {
        it("should return values from L2 when in light mode", (): void => {
            expect(neutralLayerL2(lightModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L2]
            );
        });
        it("should return values from L2 when in dark mode", (): void => {
            expect(neutralLayerL2(darkModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L2]
            );
        });
        it("should operate on a provided background color", (): void => {
            expect(neutralLayerL2((): string => "#000000")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L2]
            );
            expect(neutralLayerL2((): string => "#FFFFFF")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L2]
            );
        });
    });

    describe("L3", (): void => {
        it("should return values from L3 when in light mode", (): void => {
            expect(neutralLayerL3(lightModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L3]
            );
        });
        it("should return values from L3 when in dark mode", (): void => {
            expect(neutralLayerL3(darkModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L3]
            );
        });
        it("should operate on a provided background color", (): void => {
            expect(neutralLayerL3((): string => "#000000")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L3]
            );
            expect(neutralLayerL3((): string => "#FFFFFF")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L3]
            );
        });
    });

    describe("L4", (): void => {
        it("should return values from L4 when in light mode", (): void => {
            expect(neutralLayerL4(lightModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L4]
            );
        });
        it("should return values from L4 when in dark mode", (): void => {
            expect(neutralLayerL4(darkModeDesignSystem)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L4]
            );
        });
        it("should operate on a provided background color", (): void => {
            expect(neutralLayerL4((): string => "#000000")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteDarkModeOffsets.L4]
            );
            expect(neutralLayerL4((): string => "#FFFFFF")(DesignSystemDefaults)).to.equal(
                DesignSystemDefaults.neutralPalette[NeutralPaletteLightModeOffsets.L4]
            );
        });
    });

    describe("neutralLayerFloating", (): void => {
        it("should return a color from the neutral palette", (): void => {
            expect(
                DesignSystemDefaults.neutralPalette.includes(
                    neutralLayerFloating(DesignSystemDefaults)
                )
            ).to.be.ok;
        });

        it("should operate on a provided background color", (): void => {
            const color: string = neutralLayerFloating((): string => "#000000")(
                DesignSystemDefaults
            );

            expect(color).not.to.equal(neutralLayerFloating(DesignSystemDefaults));
            expect(DesignSystemDefaults.neutralPalette.includes(color)).to.be.ok;
        });
    });
    describe("neutralLayerCardContainer", (): void => {
        it("should return a color from the neutral palette", (): void => {
            expect(
                DesignSystemDefaults.neutralPalette.includes(
                    neutralLayerCardContainer(DesignSystemDefaults)
                )
            ).to.be.ok;
        });
        it("should operate on a provided background color", (): void => {
            const color: string = neutralLayerCardContainer((): string => "#000000")(
                DesignSystemDefaults
            );

            expect(color).not.to.equal(neutralLayerCardContainer(DesignSystemDefaults));
            expect(DesignSystemDefaults.neutralPalette.includes(color)).to.be.ok;
        });
    });
    describe("neutralLayerCard", (): void => {
        it("should return a color from the neutral palette", (): void => {
            expect(
                DesignSystemDefaults.neutralPalette.includes(
                    neutralLayerCard(DesignSystemDefaults)
                )
            ).to.be.ok;
        });
        it("should operate on a provided background color", (): void => {
            const color: string = neutralLayerCard((): string => "#000000")(
                DesignSystemDefaults
            );

            expect(color).not.to.equal(neutralLayerCard(DesignSystemDefaults));
            expect(DesignSystemDefaults.neutralPalette.includes(color)).to.be.ok;
        });
    });
});
