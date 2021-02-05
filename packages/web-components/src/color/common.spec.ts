import { expect } from "chai";
import { ColorRGBA64 } from "@microsoft/fast-colors";
import { colorMatches, contrast, isValidColor, parseColorString } from "./common";

describe("isValidColor", (): void => {
    it("should return true when input is a hex color", (): void => {
        expect(isValidColor("#000")).to.be.ok;
        expect(isValidColor("#000000")).to.be.ok;
    });
    it("should return false when input is not a color", (): void => {
        expect(isValidColor(undefined as any)).to.not.be.ok;
        expect(isValidColor(null as any)).to.not.be.ok;
        expect(isValidColor("ooggabooga")).to.not.be.ok;
    });
});

describe("colorMatches", (): void => {
    it("should throw arguments are not colors", (): void => {
        expect((): void => {
            colorMatches("dksfjd", "weeeeeeee");
        }).to.throw();
    });

    it("should return true if colors are the same", (): void => {
        expect(colorMatches("#F00", "rgb(255, 0, 0)")).to.be.ok;
        expect(colorMatches("#000", "rgb(0, 0, 0)")).to.be.ok;
        expect(colorMatches("#FFF", "rgb(255, 255, 255)")).to.be.ok;
        expect(colorMatches("#FF0000", "rgb(255, 0, 0)")).to.be.ok;
        expect(colorMatches("#000000", "rgb(0, 0, 0)")).to.be.ok;
        expect(colorMatches("#FFFFFF", "rgb(255, 255, 255)")).to.be.ok;
    });

    it("should return false if colors are not the same", (): void => {
        expect(colorMatches("#000", "#023")).to.not.be.ok;
        expect(colorMatches("#000", "#001")).to.not.be.ok;
        expect(colorMatches("#F00", "rgb(255, 0, 1)")).to.not.be.ok;
        expect(colorMatches("#000000", "#002233")).to.not.be.ok;
        expect(colorMatches("#000000", "#000011")).to.not.be.ok;
        expect(colorMatches("#FF0000", "rgb(255, 0, 1)")).to.not.be.ok;
    });
});

describe("parseColorString", (): void => {
    it("should parse #RGB color strings", (): void => {
        expect(parseColorString("#FFF") instanceof ColorRGBA64).to.equal(true);
    });
    it("should parse #RRGGBB color strings", (): void => {
        expect(parseColorString("#001122") instanceof ColorRGBA64).to.equal(true);
    });
    it("should throw if the color is a malformed shorthand hex", (): void => {
        expect((): void => {
            parseColorString("#GGG");
        }).to.throw();
    });
    it("should throw if the color is a malformed hex", (): void => {
        expect((): void => {
            parseColorString("#zzzzzz");
        }).to.throw();
    });
    it("should throw if the color is a malformed rgb", (): void => {
        expect((): void => {
            parseColorString("rgb(256, 244, 30)");
        }).to.throw();
    });
    it("should throw if the color is a rgba", (): void => {
        expect((): void => {
            parseColorString("rgba(255, 244, 30, 1)");
        }).to.throw();
    });
});

describe("contrast", (): void => {
    it("should return the contrast between two colors", (): void => {
        expect(contrast("#000", "#FFF")).to.equal(21);
        expect(contrast("#000000", "#FFFFFF")).to.equal(21);
        expect(contrast("rgb(0, 0, 0)", "rgb(255, 255, 255)")).to.equal(21);
    });
    it("should throw if either color cannot be converted to a color", (): void => {
        expect((): void => {
            contrast("oogabooga", "#000");
        }).to.throw();
        expect((): void => {
            contrast("#000", "oogabooga");
        }).to.throw();
    });
});
