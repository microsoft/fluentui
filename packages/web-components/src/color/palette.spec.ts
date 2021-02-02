import chai, { expect } from "chai";
import spies from "chai-spies";
import { accentBaseColor, accentPalette, DesignSystem, DesignSystemDefaults, neutralPalette } from "../fluent-design-system";
import {
    findClosestSwatchIndex,
    findSwatchIndex,
    getSwatch,
    palette,
    Palette,
    PaletteType,
    swatchByContrast,
    swatchByMode,
} from "./palette";
import { Swatch } from "./common";

chai.use(spies);

describe("palette", (): void => {
    it("should return a function", (): void => {
        expect(typeof palette(PaletteType.accent)).to.equal("function");
        expect(typeof palette(PaletteType.neutral)).to.equal("function");
    });

    it("should return a function that returns a palette if the argument does not match a palette", (): void => {
        expect((palette as any)()()).to.have.length(94);
    });

    it("should return a palette if no designSystem is provided", (): void => {
        expect(palette(PaletteType.neutral)(undefined as any)).to.have.length(94);
        expect(palette(PaletteType.accent)(undefined as any)).to.have.length(94);
    });

    it("should return upper-case hex values", (): void => {
        (palette(PaletteType.neutral)(DesignSystemDefaults) as Palette).forEach(
            (swatch: Swatch) => {
                expect(swatch).to.equal(swatch.toUpperCase());
            }
        );
        (palette(PaletteType.accent)(DesignSystemDefaults) as Palette).forEach(
            (swatch: Swatch) => {
                expect(swatch).to.equal(swatch.toUpperCase());
            }
        );
    });

    it("should return six-letter hex values", (): void => {
        (palette(PaletteType.neutral)(DesignSystemDefaults) as Palette).forEach(
            (swatch: Swatch) => {
                expect(swatch.length).to.equal(7);
                expect(swatch.charAt(0)).to.equal("#");
            }
        );
        (palette(PaletteType.accent)(DesignSystemDefaults) as Palette).forEach(
            (swatch: Swatch) => {
                expect(swatch.length).to.equal(7);
                expect(swatch.charAt(0)).to.equal("#");
            }
        );
    });
});

describe("findSwatchIndex", (): void => {
    it("should implement design-system defaults", (): void => {
        expect(findSwatchIndex(neutralPalette, "#FFF")({} as DesignSystem)).to.equal(0);
        expect(
            findSwatchIndex(
                accentPalette,
                accentBaseColor({} as DesignSystem)
            )({} as DesignSystem)
        ).to.equal(59);
    });

    it("should return -1 if the color is not found", (): void => {
        expect(findSwatchIndex(neutralPalette, "#FF0000")(DesignSystemDefaults)).to.equal(-1);
        expect(findSwatchIndex(accentPalette, "#FF0000")(DesignSystemDefaults)).to.equal(-1);
    });

    it("should find white", (): void => {
        expect(findSwatchIndex(neutralPalette, "#FFFFFF")(DesignSystemDefaults)).to.equal(0);
        expect(findSwatchIndex(neutralPalette, "#FFF")(DesignSystemDefaults)).to.equal(0);
        expect(
            findSwatchIndex(neutralPalette, "rgb(255, 255, 255)")(DesignSystemDefaults)
        ).to.equal(0);
    });

    it("should find black", (): void => {
        expect(findSwatchIndex(neutralPalette, "#000000")(DesignSystemDefaults)).to.equal(93);
        expect(findSwatchIndex(neutralPalette, "#000")(DesignSystemDefaults)).to.equal(93);
        expect(
            findSwatchIndex(neutralPalette, "rgb(0, 0, 0)")(DesignSystemDefaults)
        ).to.equal(93);
    });

    it("should find accent", (): void => {
        expect(
            findSwatchIndex(
                accentPalette,
                accentBaseColor(DesignSystemDefaults)
            )(DesignSystemDefaults)
        ).to.equal(59);
        expect(
            findSwatchIndex(accentPalette, "rgb(0, 120, 212)")(DesignSystemDefaults)
        ).to.equal(59);
    });
});

describe("findClosestSwatchIndex", (): void => {
    it("should return 0 if the input swatch cannot be converted to a color", (): void => {
        expect(
            findClosestSwatchIndex(neutralPalette, "pewpewpew")({} as DesignSystem)
        ).to.equal(0);
    });
    it("should operate on design system defaults", (): void => {
        expect(
            findClosestSwatchIndex(neutralPalette, "#FFFFFF")({} as DesignSystem)
        ).to.equal(0);
        expect(
            findClosestSwatchIndex(neutralPalette, "#808080")({} as DesignSystem)
        ).to.equal(49);
        expect(
            findClosestSwatchIndex(neutralPalette, "#000000")({} as DesignSystem)
        ).to.equal(93);
    });
    it("should return the index with the closest luminance to the input swatch if the swatch is not in the palette", (): void => {
        expect(
            findClosestSwatchIndex(neutralPalette, "#008000")({} as DesignSystem)
        ).to.equal(56);
        expect(
            findClosestSwatchIndex(neutralPalette, "#F589FF")({} as DesignSystem)
        ).to.equal(30);
    });
});

describe("getSwatch", (): void => {
    const colorPalette: Palette = ["#FFF", "#F00", "#000"];

    it("should return the first color when the input index is less than 0", (): void => {
        expect(getSwatch(-1, colorPalette)).to.equal("#FFF");
    });

    it("should return the last color when the input index is greater than the last index of the palette", (): void => {
        expect(getSwatch(4, colorPalette)).to.equal("#000");
    });

    it("should return the color at the provided index if the index is within the bounds of the array", (): void => {
        expect(getSwatch(0, colorPalette)).to.equal("#FFF");
        expect(getSwatch(1, colorPalette)).to.equal("#F00");
        expect(getSwatch(2, colorPalette)).to.equal("#000");
    });
});

describe("swatchByMode", (): void => {
    it("should operate on DesignSystemDefaults", (): void => {
        expect(swatchByMode(neutralPalette)(0, 0)({} as DesignSystem)).to.equal(
            DesignSystemDefaults.neutralPalette[0]
        );
        expect(swatchByMode(accentPalette)(0, 0)({} as DesignSystem)).to.equal(
            DesignSystemDefaults.accentPalette[0]
        );
    });
    it("should return the dark index color when the background color is dark", (): void => {
        expect(
            swatchByMode(neutralPalette)(0, 7)({
                backgroundColor: "#000",
            } as DesignSystem)
        ).to.equal(DesignSystemDefaults.neutralPalette[7]);
        expect(
            swatchByMode(accentPalette)(0, 7)({
                backgroundColor: "#000",
            } as DesignSystem)
        ).to.equal(DesignSystemDefaults.accentPalette[7]);
    });
});

describe("swatchByContrast", (): void => {
    it("should return a function", (): void => {
        expect(typeof swatchByContrast({} as any)).to.equal("function");
    });
    describe("indexResolver", (): void => {
        it("should pass a reference color as the first argument", (): void => {
            const indexResolver = chai.spy(() => 0);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(indexResolver).to.have.been.called.once;
            expect(indexResolver).to.have.been.called.with("#FFF");
        });
        it("should pass the palette as the second argument", (): void => {
            const indexResolver = chai.spy(() => 0);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);
            const colorPalette: string[] = ["foo"];

            swatchByContrast("#FFF")(() => colorPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(indexResolver).to.have.been.called.once;
            expect(indexResolver).to.have.been.called.with(colorPalette);
        });
        it("should pass the designSystem as the third argument", (): void => {
            const indexResolver = chai.spy(() => 0);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);
            const designSystem: DesignSystem = {} as DesignSystem;

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)(designSystem);
            expect(indexResolver).to.have.been.called.once;
            expect(indexResolver).to.have.been.called.with(designSystem);
        });
    });
    describe("directionResolver", (): void => {
        it("should pass the reference index as the first argument", (): void => {
            const index: number = 20;
            const indexResolver = chai.spy(() => index);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(directionResolver).to.have.been.called.once;
            expect(directionResolver).to.have.been.called.with(index);
        });
        it("should receive the palette length - 1 if the resolved index is greater than the palette length", (): void => {
            const index: number = 105;
            const indexResolver = chai.spy(() => index);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(directionResolver).to.have.been.called.once;
            expect(directionResolver).to.have.been.called.with(
                neutralPalette({} as DesignSystem).length - 1
            );
        });
        it("should receive 0 if the resolved index is less than 0", (): void => {
            const index: number = -20;
            const indexResolver = chai.spy(() => index);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(directionResolver).to.have.been.called.once;
            expect(directionResolver).to.have.been.called.with(0);
        });
        it("should pass the palette as the second argument", (): void => {
            const indexResolver = chai.spy(() => 0);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);
            const colorPalette: string[] = ["foo"];

            swatchByContrast("#FFF")(() => colorPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)({} as DesignSystem);
            expect(directionResolver).to.have.been.called.once;
            expect(directionResolver).to.have.been.called.with(colorPalette);
        });
        it("should pass the designSystem as the third argument", (): void => {
            const indexResolver = chai.spy(() => 0);
            const directionResolver = chai.spy(() => 1);
            const contrastCondition = chai.spy(() => false);
            const designSystem: DesignSystem = {} as DesignSystem;

            swatchByContrast("#FFF")(neutralPalette)(indexResolver as any)(
                directionResolver as any
            )(contrastCondition as any)(designSystem);
            expect(directionResolver).to.have.been.called.once;
            expect(directionResolver).to.have.been.called.with(designSystem);
        });
    });

    it("should return the color at the initial index if it satisfies the predicate", (): void => {
        const indexResolver: () => number = (): number => 0;
        const directionResolver: () => 1 | -1 = (): 1 | -1 => 1;
        const contrastCondition: () => boolean = (): boolean => true;
        const designSystem: DesignSystem = {} as DesignSystem;
        const sourcePalette: string[] = ["#111", "#222", "#333"];

        expect(
            swatchByContrast("#FFF")(() => sourcePalette)(indexResolver)(
                directionResolver
            )(contrastCondition)(designSystem)
        ).to.equal(sourcePalette[0]);
    });
    it("should return the color at the last index when direction is 1 and no value satisfies the predicate", (): void => {
        const indexResolver: () => number = (): number => 0;
        const directionResolver: () => 1 | -1 = (): 1 | -1 => 1;
        const contrastCondition: () => boolean = (): boolean => false;
        const designSystem: DesignSystem = {} as DesignSystem;
        const sourcePalette: string[] = ["#111", "#222", "#333"];

        expect(
            swatchByContrast("#FFF")(() => sourcePalette)(indexResolver)(
                directionResolver
            )(contrastCondition)(designSystem)
        ).to.equal(sourcePalette[sourcePalette.length - 1]);
    });
    it("should return the color at the first index when direction is -1 and no value satisfies the predicate", (): void => {
        const sourcePalette: string[] = ["#111", "#222", "#333"];
        const indexResolver: () => number = (): number => sourcePalette.length - 1;
        const directionResolver: () => 1 | -1 = (): 1 | -1 => 1;
        const contrastCondition: () => boolean = (): boolean => false;
        const designSystem: DesignSystem = {} as DesignSystem;

        expect(
            swatchByContrast("#FFF")(() => sourcePalette)(indexResolver)(
                directionResolver
            )(contrastCondition)(designSystem)
        ).to.equal(sourcePalette[sourcePalette.length - 1]);
    });
    it("should return the color at the last index when initialIndex is greater than the last index", (): void => {
        const sourcePalette: string[] = ["#111", "#222", "#333"];
        const indexResolver: () => number = (): number => sourcePalette.length;
        const directionResolver: () => 1 | -1 = (): 1 | -1 => 1;
        const contrastCondition: () => boolean = (): boolean => false;
        const designSystem: DesignSystem = {} as DesignSystem;

        expect(
            swatchByContrast("#FFF")(() => sourcePalette)(indexResolver)(
                directionResolver
            )(contrastCondition)(designSystem)
        ).to.equal(sourcePalette[sourcePalette.length - 1]);
    });
    it("should return the color at the first index when initialIndex is less than 0", (): void => {
        const sourcePalette: string[] = ["#111", "#222", "#333"];
        const indexResolver: () => number = (): number => sourcePalette.length;
        const directionResolver: () => 1 | -1 = (): 1 | -1 => -1;
        const contrastCondition: () => boolean = (): boolean => false;
        const designSystem: DesignSystem = {} as DesignSystem;

        expect(
            swatchByContrast("#FFF")(() => sourcePalette)(indexResolver)(
                directionResolver
            )(contrastCondition)(designSystem)
        ).to.equal(sourcePalette[0]);
    });
});
