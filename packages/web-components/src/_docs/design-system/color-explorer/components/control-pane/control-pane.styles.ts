import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { typeRampPlus1FontSize, typeRampPlus1LineHeight } from "../../../../../index-rollup";

export const controlPaneStyles = css`
    ${display("flex")} :host {
        flex: 0 1 auto;
        flex-direction: column;
        gap: 24px;
    }

    .title {
        font-size: ${typeRampPlus1FontSize};
        line-height: ${typeRampPlus1LineHeight};
    }

    fluent-radio-group::part(positioning-region) {
        gap: 8px;
    }
`;
