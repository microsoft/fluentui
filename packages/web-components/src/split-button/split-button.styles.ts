import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';

/**
 * Styles for Link
 * @public
 */
export const splitButtonStyles = css`
    ${display("inline-flex")}

    /* TODO: needs RTL */
    ::slotted(fluent-button),
    ::slotted(fluent-button[size="large"]) {
        --border-top-right-radius: 0;
        --border-bottom-right-radius: 0;
    }

    ::slotted(fluent-menu-button) {
        --border-top-left-radius: 0;
        --border-bottom-left-radius: 0;
        /* TODO: Don't love this... */
        margin-left: -1px;
    }

    ::slotted(fluent-menu-button[appearance="primary"]) {
       --button-border-left-color: ${tokens.colorNeutralForegroundInverted};
    }

    ::slotted(fluent-menu-button[appearance="subtle"]),
    ::slotted(fluent-menu-button[appearance="subtle"]:hover),
    ::slotted(fluent-menu-button[appearance="transparent"]),
    ::slotted(fluent-menu-button[appearance="transparent"]:hover) {
        --button-border-left-color: ${tokens.colorNeutralStroke1Hover};
    }

    ::slotted(fluent-menu-button[appearance="subtle"]:active),
    ::slotted(fluent-menu-button[appearance="transparent"]:active) {
        --button-border-left-color: ${tokens.colorNeutralStroke1Pressed};
    }
`;