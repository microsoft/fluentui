import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { designUnit, fillColor } from '../design-tokens';
import { focusTreatmentBase } from '../styles/focus';

export const toolbarStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('inline-flex')} :host {
      --toolbar-item-gap: calc(${designUnit} * 1px);
      background: ${fillColor};
      fill: currentcolor;
      padding: var(--toolbar-item-gap);
      box-sizing: border-box;
      align-items: center;
    }

    :host(${focusVisible}) {
      ${focusTreatmentBase}
    }

    .positioning-region {
      align-items: center;
      display: inline-flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      flex-grow: 1;
    }

    :host([orientation='vertical']) .positioning-region {
      flex-direction: column;
      align-items: start;
    }

    ::slotted(:not([slot])) {
      flex: 0 0 auto;
      margin: 0 var(--toolbar-item-gap);
    }

    :host([orientation='vertical']) ::slotted(:not([slot])) {
      margin: var(--toolbar-item-gap) 0;
    }

    :host([orientation='vertical']) {
      display: inline-flex;
      flex-direction: column;
    }

    .start,
    .end {
      display: flex;
      align-items: center;
    }

    .end {
      margin-inline-start: auto;
    }

    .start__hidden,
    .end__hidden {
      display: none;
    }

    ::slotted(svg) {
      ${/* Glyph size is temporary - replace when adaptive typography is figured out */ ''}
      width: 16px;
      height: 16px;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host(:${focusVisible}) {
          outline-color: ${SystemColors.Highlight};
          color: ${SystemColors.ButtonText};
          forced-color-adjust: none;
        }
      `,
    ),
  );
