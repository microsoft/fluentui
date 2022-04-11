import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';

// TODO: These constants should be replaced with design tokens
export const tabPaddingM = "10px";
export const tabPaddingS = "6px";
export const columnGapM = "6px";
export const columnGapS = "2px";
export const contentPadding = "2px";

/**
 * Styles for Tab
 * @public
 */
export const tabStyles = css`
    ${display('inline-flex')} :host {
        --tab-padding: ${tabPaddingM};
        box-sizing: border-box;
        position: relative;
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase300};
        font-weight: ${tokens.fontWeightRegular};
        line-height: ${tokens.lineHeightBase300};
        background-color: none;
        align-items: center;
        justify-content: center;
        grid-row: 1 / 3;
        outline: none;
        border-color: none;
        border-radius: ${tokens.borderRadiusMedium};
        border-width: ${tokens.strokeWidthThin};
        column-gap: ${columnGapM};
        padding: var(--tab-padding);
        cursor: pointer;
        overflow: hidden;
    }

    :host([aria-selected='true']) {
        z-index: 2;
    }

    :host,
    :host(:hover),
    :host(:active) {
        color: ${tokens.colorNeutralForeground1};
    }

    :host(:not(.horizontal))::after {
        content: "";
        position: absolute;
        bottom: 0px;
        height: 2px;
        width: calc(100% - (var(--tab-padding) * 2));
    }

    :host(.vertical)::after {
        content: "";
        position: absolute;
        left: 0px;
        width: 2px;
        height: calc(100% - (var(--tab-padding) * 2));
        transform: translateY(-50%);
    }

    :host(:not([aria-selected='true']):hover):after,
    :host(:not([aria-selected='true']):active):after {
        background-color: ${tokens.colorNeutralStroke1};
    }

    /* TODO: Add focus styles */
    /* :host(:focus-visible) {} */

    :host(.vertical) {
        justify-content: start;
        grid-column: 1 / 3;
    }

    :host(.vertical[aria-selected='true']) {
        z-index: 2;
    }

    ::slotted(svg) {
        font-size: 20px;
        height: 20px;
        width: 20px;
    }

    :host(size="small") {
        --tab-padding: ${tabPaddingS};
        gap: ${columnGapS};
    }
`;