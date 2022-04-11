import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from "@fluentui/react-theme";
import { appearanceBehavior } from '../utilities/appearance-behavior';

/**
 * Styles for Link
 * @public
 */
export const cardStyles = css`
    ${display("block")} :host {
        contain: content;
        color: ${tokens.colorNeutralForeground1};
        border-width: ${tokens.strokeWidthThin};
        border-style: solid;
        border-color: none;
        border-radius: ${tokens.borderRadiusMedium};
        font-family: ${tokens.fontFamilyBase};
    }

    :host([interactive]) {
        cursor: pointer;
    }

    :host([interactive]:hover) {
        box-shadow: ${tokens.shadow8};
    }

    ::slotted(*) {
        margin: 12px;
    }

    ::slotted(fluent-card-preview) {
        margin: 0;
    }
`.withBehaviors(
    appearanceBehavior("filled", css`
        :host([appearance="filled"]) {
            background-color: ${tokens.colorNeutralBackground1};
            border-color: ${tokens.colorTransparentStroke};
            box-shadow: ${tokens.shadow4};
        }

        :host([appearance="filled"][interactive]:hover) {
            background-color: ${tokens.colorNeutralBackground1Hover};
            border-color: ${tokens.colorTransparentStrokeInteractive};
        }

        :host([appearance="filled"][interactive]:active) {
            background-color: ${tokens.colorNeutralBackground1Pressed};
        }
    `),
    appearanceBehavior("filled-alternative", css`
        :host([appearance="filled-alternative"]) {
            background-color: ${tokens.colorNeutralBackground2};
            border-color: ${tokens.colorTransparentStroke};
            box-shadow: ${tokens.shadow4};
        }

        :host([appearance="filled-alternative"][interactive]:hover) {
            background-color: ${tokens.colorNeutralBackground2Hover};
            border-color: ${tokens.colorTransparentStrokeInteractive};
        }

        :host([appearance="filled-alternative"][interactive]:active) {
            background-color: ${tokens.colorNeutralBackground2Pressed};
        }
    `),
    appearanceBehavior("outline", css`
        :host([appearance="outline"]) {
            background-color: ${tokens.colorTransparentBackground};
            border-color: ${tokens.colorNeutralStroke1};
        }

        :host([appearance="outline"][interactive]:hover) {
            border-color: ${tokens.colorNeutralStroke1Hover};
        }

        :host([appearance="outline"][interactive]:active) {
            background-color: ${tokens.colorNeutralStroke1Pressed};
        }    

        :host([appearance="outline"]),
        :host([appearance="outline"][interactive]),
        :host([appearance="outline"][interactive]:hover) {
            box-shadow: none;
        }
    `),
    appearanceBehavior("subtle", css`
        :host([appearance="subtle"]) {
            background-color: ${tokens.colorSubtleBackground};
            border-color: ${tokens.colorTransparentStroke};
        }

        :host([appearance="subtle"][interactive]:hover) {
            border-color: ${tokens.colorSubtleBackgroundHover};
        }

        :host([appearance="subtle"][interactive]:active) {
            background-color: ${tokens.colorSubtleBackgroundPressed};
        }

        :host([appearance="subtle"]),
        :host([appearance="subtle"][interactive]),
        :host([appearance="subtle"][interactive]:hover) {
            box-shadow: none;
        }
    `)
);