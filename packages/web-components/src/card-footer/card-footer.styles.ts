import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";

/**
 * Styles for Card Footer
 * @public
 */
export const cardFooterStyles = css`
    ${display("flex")} :host {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    ::slotted([slot="action"]) {
        margin-inline-start: auto;
    }
`;