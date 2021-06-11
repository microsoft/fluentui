import { expect } from "chai";
import { DesignSystem, DesignSystemDefaults } from "../fluent-design-system";
import { neutralFillCard } from "./neutral-fill-card";

describe("neutralFillCard", (): void => {
    it("should operate on design system defaults", (): void => {
        expect(neutralFillCard({} as DesignSystem)).to.equal(
            DesignSystemDefaults.neutralPalette[0]
        );
    });
    it("should stay white when the index of the backgroundColor is lower than the offset index", (): void => {
        for (let i: number = 0; i < DesignSystemDefaults.neutralFillCardDelta; i++) {
            expect(
                DesignSystemDefaults.neutralPalette.indexOf(
                    neutralFillCard(
                        Object.assign({}, DesignSystemDefaults, {
                            backgroundColor: DesignSystemDefaults.neutralPalette[i],
                        })
                    )
                )
            ).to.equal(0);
        }
    });
    it("should return the color at three steps lower than the background color", (): void => {
        for (let i: number = 3; i < DesignSystemDefaults.neutralPalette.length; i++) {
            expect(
                DesignSystemDefaults.neutralPalette.indexOf(
                    neutralFillCard(
                        Object.assign({}, DesignSystemDefaults, {
                            backgroundColor: DesignSystemDefaults.neutralPalette[i],
                        })
                    )
                )
            ).to.equal(i - 3);
        }
    });
    it("should generate a color based on the background color returned by a provided callback", (): void => {
        expect(
            neutralFillCard(() => DesignSystemDefaults.neutralPalette[4])(
                DesignSystemDefaults
            )
        ).to.equal(DesignSystemDefaults.neutralPalette[1]);
    });
});
