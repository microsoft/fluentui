import { css, ElementStyles } from "@microsoft/fast-element";
import {
    AvatarOptions,
    Badge,
    display,
    ElementDefinitionContext,
    focusVisible,
} from "@microsoft/fast-foundation";
import {
    accentFillRest,
    bodyFont,
    controlCornerRadius,
    designUnit,
    focusStrokeInner,
    focusStrokeOuter,
    focusStrokeWidth,
    foregroundOnAccentRest,
    neutralFillRest,
    neutralForegroundRest,
    typeRampBaseFontSize,
    typeRampBaseLineHeight,
} from "../design-tokens";
import { DirectionalStyleSheetBehavior } from "../styles";
import { avatarSize } from "./index";

const rtl = (context, definition) => css`
    ::slotted(${context.tagFor(Badge)}) {
        left: 0;
    }
`;

const ltr = (context, definition) => css`
    ::slotted(${context.tagFor(Badge)}) {
        right: 0;
    }
`;

export const avatarStyles: (
    context: ElementDefinitionContext,
    definition: AvatarOptions
) => ElementStyles = (context: ElementDefinitionContext, definition: AvatarOptions) =>
    css`
        ${display("flex")} :host {
            position: relative;
            height: calc(${avatarSize} * 1px);
            width: calc(${avatarSize} * 1px);
            --avatar-text-ratio: ${designUnit};
        }

        .link {
            text-decoration: none;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-width: 100%;
            color: ${neutralForegroundRest};
            fill: currentcolor;
        }

        .square {
            border-radius: calc(${controlCornerRadius} * 1px);
            min-width: 100%;
            overflow: hidden;
        }

        .circle {
            border-radius: 100%;
            min-width: 100%;
            overflow: hidden;
        }

        :host(:focus) {
          outline: none;
        }

        .backplate {
            position: relative;
            display: flex;
            background-color: ${neutralFillRest};
        }

        .media,
        ::slotted(img) {
            max-width: 100%;
            position: absolute;
            display: block;
        }

        .content {
            font-family: ${bodyFont};
            font-size: ${typeRampBaseFontSize};
            font-weight: 600;
            line-height: ${typeRampBaseLineHeight};
        }

        ::slotted(${context.tagFor(Badge)}) {
            position: absolute;
            display: block;
        }

        :host([appearance='accent']) .backplate {
            background-color: ${accentFillRest};
        }

        :host([appearance='accent']) .link {
            color: ${foregroundOnAccentRest};
            fill: currentcolor;
        }

        :host(:${focusVisible}) .circle,
        :host(:${focusVisible}) .square,
        :host(:${focusVisible}[appearance='accent']) .circle,
        :host(:${focusVisible}[appearance='accent']) .square {
          box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${focusStrokeInner},
          0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter};
        }
    `.withBehaviors(
        new DirectionalStyleSheetBehavior(
            ltr(context, definition),
            rtl(context, definition)
        )
    );
