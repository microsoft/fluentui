import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  MenuItemOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { DirectionalStyleSheetBehavior, heightNumber } from '../styles/index';
import {
  controlCornerRadius,
  disabledOpacity,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralForegroundHint,
  neutralForegroundRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const menuItemStyles: (context: ElementDefinitionContext, definition: MenuItemOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: MenuItemOptions,
) =>
  css`
    ${display('grid')} :host {
      contain: layout;
      overflow: visible;
      ${typeRampBase}
      outline: none;
      box-sizing: border-box;
      height: calc(${heightNumber} * 1px);
      grid-template-columns: minmax(32px, auto) 1fr minmax(32px, auto);
      grid-template-rows: auto;
      justify-items: center;
      align-items: center;
      padding: 0;
      white-space: nowrap;
      color: ${neutralForegroundRest};
      fill: currentcolor;
      cursor: pointer;
      border-radius: calc(${controlCornerRadius} * 1px);
      border: calc(${strokeWidth} * 1px) solid transparent;
    }

    :host(.indent-0) {
      grid-template-columns: auto 1fr minmax(32px, auto);
    }

    :host(.indent-0) .content {
      grid-column: 1;
      grid-row: 1;
      margin-inline-start: 10px;
    }

    :host(.indent-0) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }

    :host(.indent-2) {
      grid-template-columns: minmax(32px, auto) minmax(32px, auto) 1fr minmax(32px, auto) minmax(32px, auto);
    }

    :host(.indent-2) .content {
      grid-column: 3;
      grid-row: 1;
      margin-inline-start: 10px;
    }

    :host(.indent-2) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }

    :host(.indent-2) .start {
      grid-column: 2;
    }

    :host(.indent-2) .end {
      grid-column: 4;
    }

    :host(:${focusVisible}) {
      border: calc(${strokeWidth} * 1px) solid ${focusStrokeOuter};
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter};
    }

    :host(:not([disabled]):hover) {
      background: ${neutralFillStealthHover};
    }

    :host(:not([disabled]):active),
    :host(.expanded) {
      background: ${neutralFillStealthActive};
      color: ${neutralForegroundRest};
    }

    :host([disabled]) {
      cursor: ${disabledCursor};
      opacity: ${disabledOpacity};
    }

    .content {
      grid-column-start: 2;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .start,
    .end {
      display: flex;
      justify-content: center;
    }

    :host(.indent-0[aria-haspopup='menu']) {
      display: grid;
      grid-template-columns: minmax(32px, auto) auto 1fr minmax(32px, auto) minmax(32px, auto);
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-1[aria-haspopup='menu']),
    :host(.indent-1[role='menuitemcheckbox']),
    :host(.indent-1[role='menuitemradio']) {
      display: grid;
      grid-template-columns: minmax(32px, auto) auto 1fr minmax(32px, auto) minmax(32px, auto);
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-2:not([aria-haspopup='menu'])) .end {
      grid-column: 5;
    }

    :host .input-container,
    :host .expand-collapse-glyph-container {
      display: none;
    }

    :host([aria-haspopup='menu']) .expand-collapse-glyph-container,
    :host([role='menuitemcheckbox']) .input-container,
    :host([role='menuitemradio']) .input-container {
      display: grid;
    }

    :host([aria-haspopup='menu']) .content,
    :host([role='menuitemcheckbox']) .content,
    :host([role='menuitemradio']) .content {
      grid-column-start: 3;
    }

    :host([aria-haspopup='menu'].indent-0) .content {
      grid-column-start: 1;
    }

    :host([aria-haspopup='menu']) .end,
    :host([role='menuitemcheckbox']) .end,
    :host([role='menuitemradio']) .end {
      grid-column-start: 4;
    }

    :host .expand-collapse,
    :host .checkbox,
    :host .radio {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      outline: none;
    }

    :host .checkbox-indicator,
    :host .radio-indicator,
    slot[name='checkbox-indicator'],
    slot[name='radio-indicator'] {
      display: none;
    }

    ::slotted([slot='end']:not(svg)) {
      margin-inline-end: 10px;
      color: ${neutralForegroundHint};
    }

    :host([aria-checked='true']) .checkbox-indicator,
    :host([aria-checked='true']) slot[name='checkbox-indicator'],
    :host([aria-checked='true']) .radio-indicator,
    :host([aria-checked='true']) slot[name='radio-indicator'] {
      display: flex;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host,
        ::slotted([slot='end']:not(svg)) {
          forced-color-adjust: none;
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        :host(:not([disabled]):hover) {
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host(:hover) .start,
        :host(:hover) .end,
        :host(:hover)::slotted(svg),
        :host(:active) .start,
        :host(:active) .end,
        :host(:active)::slotted(svg),
        :host(:hover) ::slotted([slot='end']:not(svg)),
        :host(:${focusVisible}) ::slotted([slot='end']:not(svg)) {
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host(.expanded) {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }
        :host(:${focusVisible}) {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 calc(${strokeWidth} * 1px) inset ${SystemColors.HighlightText};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:hover) .start,
        :host([disabled]:hover) .end,
        :host([disabled]:hover)::slotted(svg),
        :host([disabled]:${focusVisible}) {
          background: ${SystemColors.ButtonFace};
          color: ${SystemColors.GrayText};
          fill: currentcolor;
          opacity: 1;
        }
        :host([disabled]:${focusVisible}) {
          border-color: ${SystemColors.GrayText};
        }
        :host .expanded-toggle,
        :host .checkbox,
        :host .radio {
          border-color: ${SystemColors.ButtonText};
          background: ${SystemColors.HighlightText};
        }
        :host([checked]) .checkbox,
        :host([checked]) .radio {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.HighlightText};
        }
        :host(:hover) .expanded-toggle,
            :host(:hover) .checkbox,
            :host(:hover) .radio,
            :host(:${focusVisible}) .expanded-toggle,
            :host(:${focusVisible}) .checkbox,
            :host(:${focusVisible}) .radio,
            :host([checked]:hover) .checkbox,
            :host([checked]:hover) .radio,
            :host([checked]:${focusVisible}) .checkbox,
            :host([checked]:${focusVisible}) .radio {
          border-color: ${SystemColors.HighlightText};
        }
        :host([aria-checked='true']) {
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }
        :host([aria-checked='true']) .checkbox-indicator,
        :host([aria-checked='true']) ::slotted([slot='checkbox-indicator']),
        :host([aria-checked='true']) ::slotted([slot='radio-indicator']) {
          fill: ${SystemColors.Highlight};
        }
        :host([aria-checked='true']) .radio-indicator {
          background: ${SystemColors.Highlight};
        }
      `,
    ),
    new DirectionalStyleSheetBehavior(
      css`
        .expand-collapse-glyph-container {
          transform: rotate(0deg);
        }
      `,
      css`
        .expand-collapse-glyph-container {
          transform: rotate(180deg);
        }
      `,
    ),
  );
