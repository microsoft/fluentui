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
export const buttonStyles = css`
    ${baseButtonStyles}
`.withBehaviors(
    appearanceBehavior("primary", css`
        ${primaryButtonStyles}
    `),
    appearanceBehavior("subtle", css`
        ${subtleButtonStyles}
    `),
    appearanceBehavior("outline", css`
        ${outlineButtonStyles}
    `),
    appearanceBehavior("transparent", css`
        ${transparentButtonStyles}
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