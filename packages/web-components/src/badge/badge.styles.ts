import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { sizeBehavior } from '../utilities/size-behavior';
import { shapeBehavior } from '../utilities/shape-behavior';
import { appearanceBehavior } from '../utilities/appearance-behavior';

/** Badge styles
 * @public
 */
export const badgeStyles = css`
    ${display("inline-flex")} :host {
        position: relative;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        font-family: ${tokens.fontFamilyBase};
        font-weight: ${tokens.fontWeightSemibold};
        border-width: ${tokens.strokeWidthThin};
        border-style: solid;
    }

    :host(.icon-only) {
        display: flex;
        align-content: center;
        align-items: center;
        height: 100%;
    }

    ::slotted(*) {
        font-family ${tokens.fontFamilyBase};
        fill: currentColor;
    }
`.withBehaviors(
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

        :host([appearance="filled"][color="severe"]) {
            background-color: ${tokens.colorPaletteDarkOrangeBackground3};
            color: ${tokens.colorNeutralForegroundOnBrand};
        }

        :host([appearance="filled"][color="subtle"]) {
            background-color: ${tokens.colorNeutralBackground1};
            color: ${tokens.colorNeutralForeground1};
        }

        :host([appearance="filled"][color="success"]) {
            background-color: ${tokens.colorPaletteGreenBackground3};
            color: ${tokens.colorNeutralForegroundOnBrand};
        }

        :host([appearance="filled"][color="warning"]) {
            background-color: ${tokens.colorPaletteYellowBackground3};
            color: ${tokens.colorNeutralForeground1};
            border-color: ${tokens.colorPaletteYellowBackground3};
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

        :host([appearance="ghost"][color="severe"]) {
            color: ${tokens.colorPaletteDarkOrangeForeground3};
        }

        :host([appearance="ghost"][color="subtle"]) {
            color: ${tokens.colorNeutralForegroundInverted};
        }

        :host([appearance="ghost"][color="success"]) {
            color: ${tokens.colorPaletteGreenForeground3};
        }

        :host([appearance="ghost"][color="warning"]) {
            color: ${tokens.colorPaletteYellowForeground2}
        }
    `),
    appearanceBehavior("outline", css`
        :host([appearance="outline"]) {
            border-color: currentColor;
        }

        :host([appearance="outline"][color="brand"]) {
            color: ${tokens.colorBrandBackground};
        }

        :host([appearance="outline"][color="danger"]) {
            color: ${tokens.colorPaletteRedForeground3};
        }

        :host([appearance="outline"][color="important"]) {
            color: ${tokens.colorNeutralForeground3};
            border-color: ${tokens.colorNeutralStrokeAccessible};
        }

        :host([appearance="outline"][color="informative"]) {
            color: ${tokens.colorNeutralForeground3};
            border-color: ${tokens.colorNeutralStroke2};
        }

        :host([appearance="outline"][color="severe"]) {
            color: ${tokens.colorPaletteDarkOrangeForeground3};
        }

        :host([appearance="outline"][color="subtle"]) {
            color: ${tokens.colorNeutralForegroundInverted};
        }

        :host([appearance="outline"][color="success"]) {
            color: ${tokens.colorPaletteGreenForeground2};
        }

        :host([appearance="outline"][color="warning"]) {
            color: ${tokens.colorPaletteYellowForeground2};
        }
    `),
    appearanceBehavior("tint", css`
        :host([appearance="tint"][color="brand"]) {
            background-color: ${tokens.colorBrandBackground2};
            color: ${tokens.colorBrandForeground2};
            border-color: ${tokens.colorBrandStroke2};
        }

        :host([appearance="tint"][color="danger"]) {
            background-color: ${tokens.colorPaletteRedBackground1};
            color: ${tokens.colorPaletteRedForeground2};
            border-color: ${tokens.colorPaletteRedBorder1};
        }

        :host([appearance="tint"][color="important"]) {
            background-color: ${tokens.colorNeutralForeground3};
            color: ${tokens.colorNeutralBackground1};
            border-color: ${tokens.colorTransparentStroke};
        }

        :host([appearance="tint"][color="informative"]) {
            background-color: ${tokens.colorNeutralBackground4};
            color: ${tokens.colorNeutralForeground3};
            border-color: ${tokens.colorNeutralStroke2};
        }

        :host([appearance="tint"][color="severe"]) {
            background-color: ${tokens.colorPaletteDarkOrangeBackground1};
            color: ${tokens.colorPaletteDarkOrangeForeground1};
            border-color: ${tokens.colorPaletteDarkOrangeForeground2};
        }

        :host([appearance="tint"][color="subtle"]) {
            background-color: ${tokens.colorNeutralBackground1};
            color: ${tokens.colorNeutralForeground3};
            border-color: ${tokens.colorNeutralStroke2};
        }

        :host([appearance="tint"][color="success"]) {
            background-color: ${tokens.colorPaletteGreenBackground1};
            color: ${tokens.colorPaletteGreenForeground1};
            border-color: ${tokens.colorPaletteGreenBackground2};
        }

        :host([appearance="tint"][color="warning"]) {
            background-color: ${tokens.colorPaletteYellowBackground1};
            color: ${tokens.colorPaletteYellowForeground2};
            border-color: ${tokens.colorPaletteYellowBackground2};
        }
    `),
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
    shapeBehavior("circular", css`
        :host([shape="circular"]) {
            border-radius: ${tokens.borderRadiusCircular};
        }
    `)
);