import { tokens } from "@fluentui/react-theme";
import { css } from "@microsoft/fast-element";
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
 * Styles for Button
 * @public
 */
export const toggleButtonStyles = css`
    ${baseButtonStyles}

    :host([current-checked]) .base {
        --button-border-color: ${tokens.colorNeutralStroke1};
        background-color: ${tokens.colorNeutralBackground1Selected};
        color: ${tokens.colorNeutralForeground1};
        border-width: ${tokens.strokeWidthThin}; 
    }

    :host([current-checked]:hover) .base {
        --button-border-color: ${tokens.colorNeutralStroke1Hover};
        background-color: ${tokens.colorNeutralBackground1Hover};
        color: ${tokens.colorNeutralForeground1};
    }

    :host([current-checked]:active) .base {
        --button-border-color: ${tokens.colorNeutralStroke1Pressed};
        background-color: ${tokens.colorNeutralBackground1Pressed};
        color: ${tokens.colorNeutralForeground1};
    }
`.withBehaviors(
    appearanceBehavior("primary", css`
        ${primaryButtonStyles}

        :host([current-checked][appearance="primary"]) .base {
            --button-border-color: transparent;
            background-color: ${tokens.colorBrandBackgroundSelected};
            color: ${tokens.colorNeutralForegroundOnBrand};
        }

        :host([current-checked][appearance="primary"]:hover) .base {
            background-color: ${tokens.colorBrandBackgroundHover};
        }

        :host([current-checked][appearance="primary"]:active) .base {
            background-color: ${tokens.colorBrandBackgroundPressed};
        }
    `),
    appearanceBehavior("subtle", css`
        ${subtleButtonStyles}

        :host([current-checked][appearance="subtle"]) .base {
            --button-border-color: transparent;
            background-color: ${tokens.colorSubtleBackgroundSelected};
            color: ${tokens.colorNeutralForeground2BrandSelected};
        }

        :host([current-checked][appearance="subtle"]:hover) .base {
            background-color: ${tokens.colorSubtleBackgroundHover};
            color: ${tokens.colorNeutralForeground2BrandHover};
        }

        :host([current-checked][appearance="subtle"]:active) .base {
            background-color: ${tokens.colorSubtleBackgroundPressed};
            color: ${tokens.colorNeutralForeground2BrandPressed};
        }
    `),
    appearanceBehavior("outline", css`
        ${outlineButtonStyles}

        :host([current-checked][appearance="outline"]) .base {
            background-color: ${tokens.colorTransparentBackgroundSelected};
        }

        :host([current-checked][appearance="outline"]:hover) .base {
            background-color: ${tokens.colorTransparentBackgroundHover};
        }

        :host([current-checked][appearance="outline"]:active) .base {
            background-color: ${tokens.colorTransparentBackgroundPressed};
        }
    `),
    appearanceBehavior("transparent", css`
        ${transparentButtonStyles}

        :host([current-checked][appearance="transparent"]) .base {
            --button-border-color: transparent;
            background-color: ${tokens.colorTransparentBackgroundSelected};
            color: ${tokens.colorNeutralForeground2BrandSelected};
        }

        :host([current-checked][appearance="transparent"]:hover) .base {
            background-color: ${tokens.colorTransparentBackgroundHover};
            color: ${tokens.colorNeutralForeground2BrandHover};
        }

        :host([current-checked][appearance="transparent"]:active) .base {
            background-color: ${tokens.colorTransparentBackgroundPressed};
            color: ${tokens.colorNeutralForeground2BrandPressed};
        }
    `),
    sizeBehavior("small", css`
        ${smallButtonStyles}
    `),
    sizeBehavior("medium", css`
        ${mediumButtonStyles}
    `),
    sizeBehavior("large", css`
        ${largeButtonStyles}
    `)
);