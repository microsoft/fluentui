import { css } from '@microsoft/fast-element';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentForegroundActiveBehavior,
  accentForegroundHoverBehavior,
  accentForegroundRestBehavior,
  heightNumber,
  neutralForegroundRestBehavior,
} from '../styles/index';

export const BreadcrumbItemStyles = css`
    ${display('inline-flex')} :host {
      background: transparent;
      box-sizing: border-box;
      fill: currentcolor;
      font-family: var(--body-font);
      font-size: var(--type-ramp-base-font-size);
      line-height: var(--type-ramp-base-line-height);
      min-width: calc(${heightNumber} * 1px);
      outline: none;
    }

    .listitem {
        display: flex;
        align-items: center;
    }

    .control {
      align-items: center;
      box-sizing: border-box;
      color: ${accentForegroundRestBehavior.var};
      cursor: pointer;
      display: flex;
      fill: inherit;
      outline: none;
      text-decoration: none;
      white-space: nowrap;
  }

    .control:hover {
        color: ${accentForegroundHoverBehavior.var};
    }

    .control:active {
        color: ${accentForegroundActiveBehavior.var};
    }

    .control .content {
        position: relative;
    }

    .control .content::before {
        content: "";
        display: block;
        height: calc(var(--outline-width) * 1px);
        left: 0;
        position: absolute;
        right: 0;
        top: calc(1em + 4px);
        width: 100%;
    }

    .control:hover .content::before {
        background: ${accentForegroundHoverBehavior.var};
    }

    .control:active .content::before {
        background: ${accentForegroundActiveBehavior.var};
    }

    .control:${focusVisible} .content::before {
        background: ${neutralForegroundRestBehavior.var};
        height: calc(var(--focus-outline-width) * 1px);
    }

    :host(:not([href])),
    :host([aria-current]) .control  {
        font-weight: 600;
        color: ${neutralForegroundRestBehavior.var};
        fill: currentcolor;
        cursor: default;
    }

    :host([aria-current]) .control:hover .content::before {
      background: ${neutralForegroundRestBehavior.var};
  }

    .start {
        display: flex;
        margin-inline-end: 6px;
    }

    .end {
        display: flex;
        margin-inline-start: 6px;
    }

    .separator {
      display: flex;
      fill: ${neutralForegroundRestBehavior.var};
      margin: 0 6px;
    }
`.withBehaviors(
  accentForegroundActiveBehavior,
  accentForegroundHoverBehavior,
  accentForegroundRestBehavior,
  neutralForegroundRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host(:not([href])) {
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
      }
      .control:hover .content::before,
      .control:${focusVisible} .content::before {
        background: ${SystemColors.LinkText};
      }
      .separator {
        fill: ${SystemColors.ButtonText};
      }
    `,
  ),
);
