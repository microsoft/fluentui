import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from "@fluentui/react-theme";
import { appearanceBehavior } from "../utilities/appearance-behavior";

/**
 * Styles for Link
 * @public
 */
export const linkStyles = css`
    ${display("inline")}
    
    :host .base {
        background-color: transparent;
        border-top-style: none;
        border-left-style: none;
        border-right-style: none;
        border-bottom-color: transparent;
        border-bottom-style: solid;
        border-bottom-width: ${tokens.strokeWidthThin};
        box-sizing: border-box;
        color: ${tokens.colorBrandForegroundLink};
        cursor: pointer;
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase300};
        font-weight: ${tokens.fontWeightRegular};
        margin: 0;
        padding: 0;
        overlow: inherit;
        text-align: left;
        text-decoration-line: none;
        text-overflow: inherit;
        user-select: text;
    }

    :host(:hover) .base {
        border-bottom-color: ${tokens.colorBrandForegroundLinkHover};
        color: ${tokens.colorBrandForegroundLinkHover};
    }

    :host(:active) .base {
        border-bottom-color: ${tokens.colorBrandForegroundLinkPressed};
        color: ${tokens.colorBrandForegroundLinkPressed};
    }

    :host([inline]),
    :host([inline]) .base {
        font-size: inherit;
        line-height: inherit;
    }

    :host([disabled]) .base,
    :host([disabledfocusable]) .base {
        border-bottom-color: transparent;
        color: ${tokens.colorNeutralForegroundDisabled};
        cursor: not-allowed;
    }

    :host([inline]) .base {
        border-bottom-color: ${tokens.colorBrandForegroundLink};
    }

    :host([inline][disabled]) .base,
    :host([inline][disabledfocusable]) .base  {
        border-bottom-color: ${tokens.colorNeutralForegroundDisabled};
    }
`.withBehaviors(
    appearanceBehavior("subtle", css`
        :host([appearance="subtle"]) .base {
            color: ${tokens.colorNeutralForeground2};
        }

       :host([appearance="subtle"]:hover) .base {
            border-bottom-color: ${tokens.colorNeutralForeground2Hover};
            color: ${tokens.colorNeutralForeground2Hover};
        }

        :host([appearance="subtle"]:active) .base {
            border-bottom-color: ${tokens.colorNeutralForeground2Pressed};
            color: ${tokens.colorNeutralForeground2Pressed};
        }

        :host([inline][appearance="subtle"]) .base {
            border-bottom-color: ${tokens.colorNeutralForeground2};
        }

        :host([appearance="subtle"][disabled]) .base,
        :host([appearance="subtle"][disabledfocusable]) .base {
            border-bottom-color: transparent;
            color: ${tokens.colorNeutralForegroundDisabled};
        }

        :host([appearance="subtle"][inline][disabled]) .base,
        :host([appearance="subtle"][inline][disabledfocusable]) .base {
            border-bottom-color: ${tokens.colorNeutralForegroundDisabled};
        }
    `)
);