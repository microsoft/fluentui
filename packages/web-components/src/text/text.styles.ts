import { css } from "@microsoft/fast-element";
import { tokens } from "@fluentui/react-theme";

/**
 * Styles for Text
 * @public
 */
export const textStyles = css`
    ::slotted(*) {
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase300};
        line-height: ${tokens.lineHeightBase300};
        font-weight: ${tokens.fontWeightRegular};
        text-align: start;
        display: inline;
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
    }

    :host([truncate]) ::slotted(*),
    :host([nowrap]) ::slotted(*) {
        white-space: nowrap;
        overflow: hidden;
    }

    :host([truncate]) ::slotted(*) {
        display: block;
        text-overflow: ellipsis;
    }

    :host([block]) ::slotted(*) {
        display: block;
    }

    :host([italic]) ::slotted(*) {
        font-style: italic;
    }

    :host([underline]) ::slotted(*) {
        text-decoration-line: underline;
    }

    :host([strikethrough]) ::slotted(*) {
        text-decoration-line: line-through;
    }

    :host([underline][strikethrough]) ::slotted(*) {
        text-decoration-line: line-through underline;
    }

    :host([size="100"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase100};
        line-height: ${tokens.lineHeightBase100};
    }

    :host([size="200"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase200};
        line-height: ${tokens.lineHeightBase200};
    }

    :host([size="400"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase400};
        line-height: ${tokens.lineHeightBase400};
    }

    :host([size="500"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase500};
        line-height: ${tokens.lineHeightBase500};
    }

    :host([size="600"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase600};
        line-height: ${tokens.lineHeightBase600};
    }

    :host([size="700"]) ::slotted(*) {
        font-size: ${tokens.fontSizeHero700};
        line-height: ${tokens.lineHeightHero700};
    }

    :host([size="800"]) ::slotted(*) {
        font-size: ${tokens.fontSizeHero800};
        line-height: ${tokens.lineHeightHero800};
    }

    :host([size="900"]) ::slotted(*) {
        font-size: ${tokens.fontSizeHero900};
        line-height: ${tokens.lineHeightHero900};
    }

    :host([size="1000"]) ::slotted(*) {
        font-size: ${tokens.fontSizeHero1000};
        line-height: ${tokens.lineHeightHero1000};
    }

    :host([font="monospace"]) ::slotted(*) {
        font-family: ${tokens.fontFamilyMonospace};
    }

    :host([font="numeric"]) ::slotted(*) {
        font-family: ${tokens.fontFamilyNumeric};
    }

    :host([weight="medium"]) ::slotted(*) {
        font-weight: ${tokens.fontWeightMedium};
    }

    :host([weight="semibold"]) ::slotted(*) {
        font-weight: ${tokens.fontWeightSemibold};
    }

    :host([align="center"]) ::slotted(*) {
        text-align: center;
    }

    :host([align="end"]) ::slotted(*) {
        text-align: end;
    }

    :host([align="justify"]) ::slotted(*) {
        text-align: justify;
    }
`;