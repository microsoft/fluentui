import { expect } from "chai";
import { DesignSystemDefaults } from "../fluent-design-system";
import {
    neutralForegroundActive,
    neutralForegroundHover,
    neutralForegroundRest,
} from "./neutral-foreground";
import { contrast } from "./common";

describe("neutralForeground", (): void => {
    it("should return a string when invoked with an object", (): void => {
        expect(typeof neutralForegroundRest(DesignSystemDefaults)).to.equal("string");
        expect(typeof neutralForegroundHover(DesignSystemDefaults)).to.equal("string");
        expect(typeof neutralForegroundActive(DesignSystemDefaults)).to.equal("string");
    });

    it("should return a function when invoked with a function", (): void => {
        expect(typeof neutralForegroundRest(() => "#FFF")).to.equal("function");
        expect(typeof neutralForegroundHover(() => "#FFF")).to.equal("function");
        expect(typeof neutralForegroundActive(() => "#FFF")).to.equal("function");
    });

    it("should operate on default design system if no design system is supplied", (): void => {
        expect(
            contrast(neutralForegroundRest(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(
                neutralForegroundRest(() => undefined as any)(undefined as any),
                "#FFF"
            )
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundRest(() => "#FFF")(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundRest(() => "#FFFFFF")(undefined as any), "#FFF")
        ).to.be.gte(14);

        expect(
            contrast(neutralForegroundHover(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(
                neutralForegroundHover(() => undefined as any)(undefined as any),
                "#FFF"
            )
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundHover(() => "#FFF")(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundHover(() => "#FFFFFF")(undefined as any), "#FFF")
        ).to.be.gte(14);

        expect(
            contrast(neutralForegroundActive(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(
                neutralForegroundActive(() => undefined as any)(undefined as any),
                "#FFF"
            )
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundActive(() => "#FFF")(undefined as any), "#FFF")
        ).to.be.gte(14);
        expect(
            contrast(neutralForegroundActive(() => "#FFFFFF")(undefined as any), "#FFF")
        ).to.be.gte(14);
    });

    it("should return correct result with default design system values", (): void => {
        expect(
            contrast(neutralForegroundRest(DesignSystemDefaults), "#FFF")
        ).to.be.gte(14);
    });

    it("should return #FFFFFF with a dark background", (): void => {
        expect(
            contrast(
                neutralForegroundRest(
                    Object.assign({}, DesignSystemDefaults, {
                        backgroundColor: "#000",
                    })
                ),
                "#000"
            )
        ).to.be.gte(14);
    });
});
