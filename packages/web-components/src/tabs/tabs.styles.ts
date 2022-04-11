import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { tabPaddingM } from '../tab/tab.styles';

/**
 * Styles for Tabs
 * @public
 */
export const tabsStyles = css`
    ${display('grid')} :host {
        box-sizing: border-box;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr;
        gap: 12px;
    }

    .tablist {
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: auto;
        position: relative;
        width: max-content;
        align-self: end;
    }

    .start,
    .end {
        align-self: center;
    }

    .active-indicator {
        grid-row: 2;
        grid-column: 1;
        width: calc(100% - (${tabPaddingM} * 2));
        height: 2px;
        border-radius: ${tokens.borderRadiusMedium};
        justify-self: center;
        background: ${tokens.colorBrandStroke1};
    }

    .active-indicator-transition {
    transition: transform 0.2s ease-in-out;
    }

    .tabpanel {
        grid-row: 2;
        grid-column-start: 1;
        grid-column-end: 4;
        position: relative;
    }

    :host(.vertical) {
        grid-template-rows: auto 1fr auto;
        grid-template-columns: auto 1fr;
        gap: 0 12px;
    }

    :host(.vertical) .tablist {
        grid-row-start: 2;
        grid-row-end: 2;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: auto 1fr;
        position: relative;
        width: max-content;
        justify-self: end;
        align-self: flex-start;
        width: 100%;
    }

    :host(.vertical) .tabpanel {
        grid-column: 2;
        grid-row-start: 1;
        grid-row-end: 4;
    }

    :host(.vertical) .end {
        grid-row: 3;
    }

    :host(.vertical) .active-indicator {
        grid-column: 1;
        grid-row: 1;
        width: 2px;
        height: calc(100% - (${tabPaddingM} * 2));
        align-self: center;
    }

    :host(.vertical) .active-indicator-transition {
        transition: transform 0.2s linear;
    }

    :host(.vertical) ::slotted(fluent-tab-panel) {
        padding: 10px 0;
    }
`;