import { css } from '@microsoft/fast-element';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  neutralForegroundRestBehavior,
  heightNumber,
  neutralFillStealthRestBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthActiveBehavior,
  neutralFocusBehavior,
} from '../styles/index';
import { SystemColors } from '@microsoft/fast-web-utilities';

export const BreadcrumbItemStyles = css`
    ${display('inline-flex')} :host {
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        color: ${neutralForegroundRestBehavior.var};
        fill: ${neutralForegroundRestBehavior.var};
        outline: none;
    }

    .listitem {
        display: flex;
        align-items: center;
    }

    .control {
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 calc((10 + (var(--design-unit) * 2 * var(--density))) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        background-color: ${neutralFillStealthRestBehavior.var};
        border: calc(var(--outline-width) * 1px) solid transparent;
        border-radius: calc(var(--corner-radius) * 1px);
        color: ${neutralForegroundRestBehavior.var};
        fill: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
        height: calc(${heightNumber} * 1px);
        min-width: calc(${heightNumber} * 1px);
    }

    .control:hover {
        background: ${neutralFillStealthHoverBehavior.var};
    }

    .control:active {
        background: ${neutralFillStealthActiveBehavior.var};
    }

    .control:${focusVisible} {
        border: calc(var(--outline-width) * 1px) solid ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 calc((var(--focus-outline-width) - var(--outline-width)) * 1px) ${neutralFocusBehavior.var};
    }

    .control::-moz-focus-inner {
        border: 0;
    }

    .control .content {
        position: relative;
    }

    :host(:not([href])) {
        font-weight: 600;
        margin-inline-start: 11px;
        cursor: default;
    }

    .start {
        margin-inline-end: 6px;
    }

    .end {
        margin-inline-start: 6px;
    }

    .separator {
      display: flex;
    }
`.withBehaviors(
  neutralForegroundRestBehavior,
  neutralFillStealthRestBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthActiveBehavior,
  neutralFocusBehavior,
  forcedColorsStylesheetBehavior(
    css`
      .control {
        color: linktext;
        fill: currentColor;
      }
      .control:hover,
      .control:${focusVisible} {
        forced-color-adjust: none;
        background:  ${SystemColors.ButtonFace};
        border-color: ${SystemColors.LinkText};
        box-shadow: 0 0 0 1px inset  ${SystemColors.LinkText};
      }
    `,
  ),
);
