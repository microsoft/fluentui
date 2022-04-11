import { css } from "@microsoft/fast-element";
import { tokens } from "@fluentui/react-theme";

/**
 * Styles for Image
 * @public
 */
export const imageStyles = css`
    ::slotted(*) {
        display: inline-block;
        box-sizing: border-box;
        border-color: ${tokens.colorNeutralStroke1};
        border-radius: ${tokens.borderRadiusNone};
    }

    :host([bordered]) ::slotted(*) {
        border-style: solid;
        border-width: ${tokens.strokeWidthThin};
    }

    :host([shape="circular"]) ::slotted(*) {
        border-radius: ${tokens.borderRadiusCircular};
    }

    :host([shape="rounded"]) ::slotted(*) {
        border-radius: ${tokens.borderRadiusMedium};
    }

    :host([shadow]) ::slotted(*) {
        box-shadow: ${tokens.shadow4};
    }

    :host([fit]) ::slotted(*) {
        object-fit: none;
        object-position: center;
        height: 100%;
        width: 100%;
    }

    :host([fit="none"]) ::slotted(*) {
        object-position: left top;
    }

    :host([fit="cover"]) ::slotted(*) {
        object-fit: cover;
    }

    :host([fit="contain"]) ::slotted(*) {
        object-fit: contain;
    }

    :host([block]) ::slotted(*) {
        width: 100%;
    }
`;