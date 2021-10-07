import { css, ElementStyles } from '@microsoft/fast-element';
import {
  BreadcrumbItemOptions,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentForegroundActive,
  accentForegroundHover,
  accentForegroundRest,
  bodyFont,
  focusStrokeWidth,
  neutralForegroundRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';
import { heightNumber } from '../styles/index';

export const breadcrumbItemStyles: (
  context: ElementDefinitionContext,
  definition: BreadcrumbItemOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: BreadcrumbItemOptions) =>
  css`
    ${display('inline-flex')} :host {
      background: transparent;
      box-sizing: border-box;
      fill: currentcolor;
      font-family: ${bodyFont};
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
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
      color: ${accentForegroundRest};
      cursor: pointer;
      display: flex;
      fill: inherit;
      outline: none;
      text-decoration: none;
      white-space: nowrap;
  }

    .control:hover {
        color: ${accentForegroundHover};
    }

    .control:active {
        color: ${accentForegroundActive};
    }

    .control .content {
        position: relative;
    }

    .control .content::before {
        content: "";
        display: block;
        height: calc(${strokeWidth} * 1px);
        left: 0;
        position: absolute;
        right: 0;
        top: calc(1em + 4px);
        width: 100%;
    }

    .control:hover .content::before {
        background: ${accentForegroundHover};
    }

    .control:active .content::before {
        background: ${accentForegroundActive};
    }

    .control:${focusVisible} .content::before {
        background: ${neutralForegroundRest};
        height: calc(${focusStrokeWidth} * 1px);
    }

    :host(:not([href])),
    :host([aria-current]) .control  {
        font-weight: 600;
        color: ${neutralForegroundRest};
        fill: currentcolor;
        cursor: default;
    }

    :host([aria-current]) .control:hover .content::before {
      background: ${neutralForegroundRest};
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
      fill: ${neutralForegroundRest};
      margin: 0 6px;
    }
`.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host(:not([href])),
        .start,
        .end,
        .separator {
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        .control:hover .content::before,
        .control:${focusVisible} .content::before {
          background: ${SystemColors.LinkText};
        }
      `,
    ),
  );
