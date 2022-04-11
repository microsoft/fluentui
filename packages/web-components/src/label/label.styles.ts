import { css } from "@microsoft/fast-element";
import { tokens } from "@fluentui/react-theme";

/**
 * Styles for Label
 * @public
 */
export const labelStyles = css`
    ::slotted(*) {
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase300};
        line-height: ${tokens.lineHeightBase300};
        font-weight: ${tokens.fontWeightRegular};
        text-align: start;
        display: inline;
    }

    :host([size="small"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase200};
        line-height: ${tokens.lineHeightBase200};
    }

    :host([size="large"]) ::slotted(*) {
        font-size: ${tokens.fontSizeBase400};
        line-height: ${tokens.lineHeightBase400};
        font-weight: ${tokens.fontWeightSemibold};
    }

    :host([disabled]) ::slotted(*) {
        color: ${tokens.colorNeutralForegroundDisabled};
    }

    :host([strong]) ::slotted(*) {
        font-weight: ${tokens.fontWeightSemibold};
    }

    :host slot[name="required"] {
        color: ${tokens.colorPaletteRedForeground3};
        padding-inline-start: 4px;
    }
`;