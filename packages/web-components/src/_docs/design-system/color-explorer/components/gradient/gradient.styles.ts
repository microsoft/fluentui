import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";

export const gradientStyles = css`
    ${display("flex")} :host {
        display: flex;
        width: 100%;
    }

    a {
        display: flex;
        flex: 1;
        height: 100%;
    }

    a.marked {
        position: relative;
    }

    a.marked::before {
        width: 6px;
        height: 6px;
        margin: 0 auto;
        content: "";
        opacity: 0.7;
        position: relative;
        border: solid 1px currentcolor;
        border-radius: 50%;
        display: block;
        align-self: center;
    }
`;
