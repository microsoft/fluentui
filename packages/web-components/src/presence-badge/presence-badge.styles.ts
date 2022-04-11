import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { sizeBehavior } from '../utilities/size-behavior';

/** Presence Badge styles
 * @public
 */
export const presenceBadgeStyles = css`
    ${display("inline-flex")} :host {
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${tokens.colorNeutralBackground1};
    }

    :host([outofoffice]) {
        color: ${tokens.colorNeutralBackground1};
    }

    :host([status="away"]) {
        color: ${tokens.colorPaletteMarigoldBackground3};
    }
    :host([status="available"]) {
        color: ${tokens.colorPaletteLightGreenForeground3};
    }
    :host([status="offline"]),
    :host([outofoffice][status="offline"]) {
        color: ${tokens.colorNeutralForeground3};
    }
    :host([status="outofoffice"]),
    :host([outofoffice][status="outofoffice"]) {
        color: ${tokens.colorPaletteBerryForeground3};
    }
    :host([outofoffice][status="available"]) {
        color: ${tokens.colorPaletteLightGreenForeground3};
    }
    :host([outofoffice][status="away"]) {
        color: ${tokens.colorPaletteMarigoldBackground3};
    }

    :host([status="busy"]),
    :host([status="donotdisturb"]),
    :host([status="unknown"]),
    :host([outofoffice][status="busy"]),
    :host([outofoffice][status="donotdisturb"]),
    :host([outofoffice][status="unknown"]) {
        color: ${tokens.colorPaletteRedBackground3};
    }

    slot,
    ::slotted(*) {
        fill: currentColor;
    }
`.withBehaviors(
    sizeBehavior("tiny", css`
        :host([size="tiny"]) svg,
        ::slotted(svg) {
            width: 6px;
            height: 6px;
        }
    `),
    sizeBehavior("extra-small", css`
        :host([size="extra-small"]) svg,
        ::slotted(svg) {
            width: 10px;
            height: 10px;
        }
    `),
    sizeBehavior("small", css`
        :host([size="small"]) svg,
        ::slotted(svg) {
            width: 12px;
            height: 12px;
        }
    `),
    sizeBehavior("medium", css`
        :host([size="medium"]) svg,
        ::slotted(svg) {
            width: 16px;
            height: 16px;
        }
    `),
    sizeBehavior("large", css`
        :host([size="large"]) svg,
        ::slotted(svg) {
            width: 20px !important;
            height: 20px !important;
        }
    `),
    sizeBehavior("extra-large", css`
        :host([size="extra-large"]) svg,
        ::slotted(svg) {
            width: 28px !important;
            height: 28px !important;
        }
    `),
);