import { css } from "@microsoft/fast-element";
import { display, forcedColorsStylesheetBehavior } from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    bodyFont,
    controlCornerRadius,
    designUnit,
    elevation,
    fillColor,
    neutralForegroundHint,
    neutralForegroundRest,
    typeRampMinus2FontSize,
    typeRampPlus3FontSize,
    typeRampPlus3LineHeight,
} from "../../../../../index-rollup";

export const sampleAppStyles = css`
    ${display("flex")}

    :host {
        flex-direction: column;
        font-family: ${bodyFont};
        color: ${neutralForegroundRest};
        box-sizing: border-box;
        min-height: 650px;
        min-width: 775px;
        background: ${fillColor};
        border-radius: calc(${controlCornerRadius} * 1px);
        --elevation: 20;
        ${elevation}
        --gutter: 20;
    }

    app-layer-background {
        display: flex;
        flex-grow: 1;
    }

    p {
        margin: 0;
    }

    .icon {
        pointer-events: none;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
    }

    .toolbar {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        padding: 0 12px;
    }

    fast-tabs {
        flex-grow: 1;
    }

    fast-tabs::part(tablist) {
        padding: 0 4px;
        align-self: start;
    }

    fast-tabs::part(activeIndicator) {
        margin: 0;
    }

    fast-tab {
        padding: calc(${designUnit} * 5px) calc(${designUnit} * 3px);
    }

    fast-tab-panel {
        padding: 0;
        height: 100%;
    }

    .content {
        display: flex;
        align-items: stretch;
        width: 100%;
        text-align: start;
        box-shadow: none;
    }

    .pane {
        width: 240px;
    }

    .pane > fast-listbox {
        width: 100%;
    }

    .details {
        height: unset;
        box-shadow: none;
    }

    /* wrapper, toolbar, content, pane, details */

    .content .heading {
        font-size: ${typeRampPlus3FontSize};
        line-height: ${typeRampPlus3LineHeight};
        margin: 0;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .icon {
        fill: currentColor;
    }

    .saturation-slider-track {
        height: 100%;
        border-radius: calc(${controlCornerRadius} * 1px);
    }

    .hue-slider-track {
        height: 100%;
        border-radius: calc(${controlCornerRadius} * 1px);
        background-image:
            linear-gradient(
                to right,
                rgb(255, 0, 0),
                rgb(255, 77, 0),
                rgb(255, 153, 0),
                rgb(255, 230, 0),
                rgb(204, 255, 0),
                rgb(128, 255, 0),
                rgb(51, 255, 0),
                rgb(0, 255, 26),
                rgb(0, 255, 102),
                rgb(0, 255, 179),
                rgb(0, 255, 255),
                rgb(0, 179, 255),
                rgb(0, 102, 255),
                rgb(0, 26, 255),
                rgb(51, 0, 255),
                rgb(128, 0, 255),
                rgb(204, 0, 255),
                rgb(255, 0, 230),
                rgb(255, 0, 153),
                rgb(255, 0, 76),
                rgb(255, 0, 4)
            );"
    }

    .responsive-expand-flipper {
        position: absolute;
        left: -30px;
        align-self: center;
        display: none;
        visibility: hidden;
    }

    site-color-swatch {
        margin: 0;
    }

    fast-slider-label {
        font-size: ${typeRampMinus2FontSize};
        color: ${neutralForegroundHint};
    }
`.withBehaviors(
    forcedColorsStylesheetBehavior(
        css`
            .text-container {
                color: ${SystemColors.ButtonText};
            }
            fast-tab:hover[aria-selected="true"] {
                background: ${SystemColors.Highlight};
                fill: ${SystemColors.HighlightText};
            }
        `
    )
);
