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
  controlCornerRadius,
  neutralForegroundActive,
  neutralForegroundHover,
  neutralForegroundRest,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';
import { heightNumber } from '../styles/index';
import { focusTreatmentTight } from '../styles/focus';

export const breadcrumbItemStyles: (
  context: ElementDefinitionContext,
  definition: BreadcrumbItemOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: BreadcrumbItemOptions) =>
  css`
    ${display('inline-flex')} :host {
      background: transparent;
      color: ${neutralForegroundRest};
      fill: currentcolor;
      box-sizing: border-box;
      ${typeRampBase};
      min-width: calc(${heightNumber} * 1px);
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    .listitem {
      display: flex;
      align-items: center;
      border-radius: inherit;
    }

    .control {
      position: relative;
      align-items: center;
      box-sizing: border-box;
      color: inherit;
      fill: inherit;
      cursor: pointer;
      display: flex;
      outline: none;
      text-decoration: none;
      white-space: nowrap;
      border-radius: inherit;
    }

    .control:hover {
      color: ${neutralForegroundHover};
    }

    .control:active {
      color: ${neutralForegroundActive};
    }

    .control:${focusVisible} {
      ${focusTreatmentTight}
    }

    :host(:not([href])),
    :host([aria-current]) .control {
      color: ${neutralForegroundRest};
      fill: currentcolor;
      cursor: default;
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
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host(:not([href])),
        .start,
        .end,
        .separator {
          background: ${SystemColors.ButtonFace};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        .separator {
          fill: ${SystemColors.ButtonText};
        }
        :host([href]) {
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          color: ${SystemColors.LinkText};
        }
        :host([href]) .control:hover {
          background: ${SystemColors.LinkText};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        .control:${focusVisible} {
          outline-color: ${SystemColors.LinkText};
        }
      `,
    ),
  );
