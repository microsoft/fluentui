import { css } from "@microsoft/fast-element";
import { tokens } from '@fluentui/react-theme';
import { display } from '@microsoft/fast-foundation';
import { sizeBehavior } from '../utilities/size-behavior';
import { appearanceBehavior } from '../utilities/appearance-behavior';
import { shapeBehavior } from '../utilities/shape-behavior';

/** Counter Badge styles
 * @public
 */
export const counterBadgeStyles = css`
    ${display("inline-flex")} :host {
        position: relative;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        font-family: ${tokens.fontFamilyBase};
        font-weight: ${tokens.fontWeightSemibold};
        border-width: ${tokens.strokeWidthThin};
        border-style: solid;
        border-radius: ${tokens.borderRadiusCircular};
    }

    :host([count="0"]) {
        display: none;
    }

    :host([dot]),
    :host([showZero]),
    :host([showZero][count="0"]) {
        display: inline-flex;
    }

    :host([dot]),
    :host([dot][size]) {
        min-width: auto;
        width: 6px;
        height: 6px;
        padding: 0;
    }

    ::slotted(*) {
        font-family ${tokens.fontFamilyBase};
        fill: currentColor;
    }

    :host([dot]) slot,
    :host([dot]) ::slotted(*) {
        display: none;
    }
`.withBehaviors(
    sizeBehavior("tiny", css`
        :host([size="tiny"]) {
            width: 6px;
            height: 6px;
            font-size: 4px;
        }

        ::slotted(svg) {
            font-size: 6px;
        }
    `),
    sizeBehavior("extra-small", css`
        :host([size="extra-small"]) {
            width: 10px;
            height: 10px;
            font-size: 6px;
        }

        ::slotted(svg) {
            font-size: 10px;
        }
    `),
    sizeBehavior("small", css`
        :host([size="small"]) {
            min-width: 16px;
            height: 16px;
            font-size: 8px;
            padding: 2px;
            gap: 4px;   
        }

        ::slotted(svg) {
            font-size: 12px;
        }
    `),
    sizeBehavior("medium", css`
        :host([size="medium"]) {
            min-width: 20px;
            height: 20px;
            font-size: 10px;
            padding: 4px;
            gap: 4px;
        }

        ::slotted(svg) {
            font-size: 12px;
        }
    `),
    sizeBehavior("large", css`
        :host([size="large"]) {
            min-width: 24px;
            height: 24px;
            font-size: 12px;
            padding: 4px;
            gap: 4px;    
        }

        ::slotted(svg) {
            font-size: 16px;
        }
    `),
    sizeBehavior("extra-large", css`
        :host([size="extra-large"]) {
            min-width: 32px;
            height: 32px;
            font-size: 12px;
            padding: 6px;
            gap: 6px;
            border-width: ${tokens.strokeWidthThick};
        }

        ::slotted(svg) {
            font-size: 20px;
        }
    `),
    appearanceBehavior("filled", css`
        :host([appearance="filled"]) {
            border-color: ${tokens.colorTransparentStroke};
        }

        :host([appearance="filled"][color="brand"]) {
            background-color: ${tokens.colorBrandBackground};
            color: ${tokens.colorNeutralForegroundOnBrand};
            border-color: ${tokens.colorBrandBackground};
        }

        :host([appearance="filled"][color="danger"]) {
            background-color: ${tokens.colorPaletteRedBackground3};
            color: ${tokens.colorNeutralForegroundOnBrand};
            border-color: ${tokens.colorPaletteRedBackground3};
        }

        :host([appearance="filled"][color="important"]) {
            background-color: ${tokens.colorNeutralForeground1};
            color: ${tokens.colorNeutralBackground1};
        }

        :host([appearance="filled"][color="informative"]) {
            background-color: ${tokens.colorNeutralBackground5};
            color: ${tokens.colorNeutralForeground3};
        }
    `),
    appearanceBehavior("ghost", css`
        :host([appearance="ghost"]) {
            border-style: none;
        }

        :host([appearance="ghost"][color="brand"]) {
            color: ${tokens.colorBrandBackground};
        }

        :host([appearance="ghost"][color="danger"]) {
            color: ${tokens.colorPaletteRedForeground3};
        }

        :host([appearance="ghost"][color="important"]) {
            color: ${tokens.colorNeutralForeground1};
        }

        :host([appearance="ghost"][color="informative"]) {
            color: ${tokens.colorNeutralForeground3};
        }
    `),
    shapeBehavior("rounded", css`
        :host([shape="rounded"]) {
            border-radius: ${tokens.borderRadiusMedium};
        }

        :host([shape="rounded"][size="tiny"]),
        :host([shape="rounded"][size="extra-small"]),
        :host([shape="rounded"][size="small"]) {
            border-radius: ${tokens.borderRadiusSmall};
        }
    `),
);