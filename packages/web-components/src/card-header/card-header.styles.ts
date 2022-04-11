import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";

/**
 * Styles for Card Header
 * @public
 */
export const cardHeaderStyles = css`
    ${display("flex")} :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        height: 32px;
    }

    ::slotted(img),
    ::slotted([slot="image"]) {
        min-width: 24px;
        min-height: 24px;
        max-width: 32px;
        max-height: 32px;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: inherit;
    }

    .text-container > * {
        height: 50%;
    }
`;