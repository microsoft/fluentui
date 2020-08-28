import { css } from '@microsoft/fast-element';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  neutralDividerRestBehavior,
  neutralFocusBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundFocusBehavior,
  neutralForegroundHoverBehavior,
  neutralForegroundRestBehavior,
} from '../../styles/';
import { heightNumber } from '../../styles/size';

export const AccordionItemStyles = css`
    ${display('flex')} :host {
        box-sizing: border-box;
        font-family: var(--body-font);
        flex-direction: column;
        font-size: var(--type-ramp-minus-1-font-size);
        line-height: var(--type-ramp-minus-1-line-height);
        border-bottom: calc(var(--outline-width) * 1px) solid ${neutralDividerRestBehavior.var};
    }
    
    .region {
        display: none;
        padding: calc((6 + (var(--design-unit) * 2 * var(--density))) * 1px);
    }

    .heading {
        display: grid;
        position: relative;
        grid-template-columns: auto 1fr auto calc(${heightNumber} * 1px);
        z-index: 2;
    }

    .button {
        appearance: none;
        border: none;
        background: none;
        grid-column: 2;
        grid-row: 1;
        outline: none;
        padding: 0 calc((6 + (var(--design-unit) * 2 * var(--density))) * 1px);
        text-align: left;
        height: calc(${heightNumber} * 1px);
        color: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
    }

    .button:hover {
        color: ${neutralForegroundHoverBehavior.var};
    }

    .button:active {
        color: ${neutralForegroundActiveBehavior.var};
    }

    .button::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        cursor: pointer;
    }

    .button:${focusVisible}::before {
        outline: none;
        border: calc(var(--outline-width) * 1px) solid ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 calc((var(--focus-outline-width) - var(--outline-width)) * 1px)
            ${neutralFocusBehavior.var};
    }

    :host(.expanded) .region {
        display: flex;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 4;
        z-index: 2;
        pointer-events: none;
    }

    slot[name="collapsed-icon"] {
        display: flex;
    }

    :host(.expanded) slot[name="collapsed-icon"] {
        display: none;
    }

    slot[name="expanded-icon"] {
        display: none;
    }
    
    :host(.expanded) slot[name="expanded-icon"] {
        display: flex;
    }

    .start {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 1;
        z-index: 2;
    }

    .end {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 3;
        z-index: 2;
    }
`.withBehaviors(
  neutralDividerRestBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundFocusBehavior,
  neutralForegroundRestBehavior,
  neutralForegroundHoverBehavior,
  neutralFocusBehavior,
  forcedColorsStylesheetBehavior(
    css`
            .button:${focusVisible}::before {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 calc((var(--focus-outline-width) - var(--outline-width)) * 1px) ${SystemColors.Highlight};
            }
        `,
  ),
);
