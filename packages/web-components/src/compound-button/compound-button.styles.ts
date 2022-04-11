import { css } from "@microsoft/fast-element";
import { tokens } from '@fluentui/react-theme';
import { appearanceBehavior } from "../utilities/appearance-behavior";
import { sizeBehavior } from "../utilities/size-behavior";
import {
    baseButtonStyles,
    largeButtonStyles,
    mediumButtonStyles,
    outlineButtonStyles,
    primaryButtonStyles,
    smallButtonStyles,
    subtleButtonStyles,
    transparentButtonStyles
} from "../utilities/style/button";

/**
 * Styles for Compound Button
 * @public
 */
export const compoundButtonStyles = css`
    ${baseButtonStyles}

    .content {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    ::slotted([slot="description"]) {
        color: ${tokens.colorNeutralForeground2};
        line-height: 100%;
        font-size: ${tokens.fontSizeBase200};
        font-weight: ${tokens.fontWeightRegular};
    }

    :host ::slotted(svg),
    :host([size="large"]) ::slotted(svg) {
        font-size: 40px !important;
        height: 40px !important;
        width: 40px !important;
    }

    :host(:hover) ::slotted([slot="description"]) {
        color: ${tokens.colorNeutralForeground2Hover};
    }

    :host(:active) ::slotted([slot="description"]) {
        color: ${tokens.colorNeutralForeground2Pressed};
    }

    :host([disabled]) ::slotted([slot="description"]) {
        color: ${tokens.colorNeutralForegroundDisabled};
    }
`.withBehaviors(
    appearanceBehavior("primary", css`
        ${primaryButtonStyles}

        :host([appearance="primary"]) ::slotted([slot="description"]),
        :host([appearance="primary"]:hover) ::slotted([slot="description"]),
        :host([appearance="primary"]:active) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForegroundOnBrand};
        }
    `),
    appearanceBehavior("subtle", css`
        ${subtleButtonStyles}

        :host([appearance="subtle"]) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2};
        }
    
        :host([appearance="subtle"]:hover) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2BrandHover};
        }
    
        :host([appearance="subtle"]:active) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2BrandPressed};
        }
    `),
    appearanceBehavior("outline", css`
        ${outlineButtonStyles}
    `),
    appearanceBehavior("transparent", css`
        ${transparentButtonStyles}

        :host([appearance="transparent"]) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2};
        }
    
        :host([appearance="transparent"]:hover) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2BrandHover};
        }
    
        :host([appearance="transparent"]:active) ::slotted([slot="description"]) {
            color: ${tokens.colorNeutralForeground2BrandPressed};
        }
    `),
    sizeBehavior("small", css`
        ${smallButtonStyles}

        :host([size="small"]) .base {
            gap: 12px;
            height: auto;
            padding: 8px;
            padding-bottom: 10px;
            font-size: ${tokens.fontSizeBase300};
            line-height: ${tokens.lineHeightBase300};
        }
    `),
    sizeBehavior("medium", css`
        ${mediumButtonStyles}

        :host([size="medium"]) .base {
            gap: 12px;
            height: auto;
            padding-top: 14px;
            padding-inline-end: 12px;
            padding-bottom: 16px;
            padding-inline-start: 12px;
            font-size: ${tokens.fontSizeBase300};
            line-height: ${tokens.lineHeightBase300};
        }
    `),
    sizeBehavior("large", css`
        ${largeButtonStyles}
        
        :host([size="large"]) .base {
            gap: 12px;
            height: auto;
            padding-top: 18px;
            padding-inline-end: 16px;
            padding-bottom: 20px;
            padding-inline-start: 16px;
            font-size: ${tokens.fontSizeBase400};
            line-height: ${tokens.lineHeightBase400};
        }

        :host([size="large"]) ::slotted([slot="description"]) {
            font-size: ${tokens.fontSizeBase300};
        }
    `)
);