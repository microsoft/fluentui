import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { display, ElementDefinitionContext, forcedColorsStylesheetBehavior, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {
  accentFillRest,
  bodyFont,
  controlCornerRadius,
  neutralForegroundRest,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const tabsStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('grid')} :host {
      box-sizing: border-box;
      font-family: ${bodyFont};
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      color: ${neutralForegroundRest};
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto 1fr;
    }

    .tablist {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: auto;
      position: relative;
      width: max-content;
      align-self: end;
    }

    .start,
    .end {
      align-self: center;
    }

    .activeIndicator {
      grid-row: 2;
      grid-column: 1;
      width: 20px;
      height: 3px;
      border-radius: calc(${controlCornerRadius} * 1px);
      justify-self: center;
      background: ${accentFillRest};
    }

    .activeIndicatorTransition {
      transition: transform 0.2s ease-in-out;
    }

    .tabpanel {
      grid-row: 2;
      grid-column-start: 1;
      grid-column-end: 4;
      position: relative;
    }

    :host(.vertical) {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto 1fr;
    }

    :host(.vertical) .tablist {
      grid-row-start: 2;
      grid-row-end: 2;
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: auto 1fr;
      position: relative;
      width: max-content;
      justify-self: end;
      width: 100%;
    }

    :host(.vertical) .tabpanel {
      grid-column: 2;
      grid-row-start: 1;
      grid-row-end: 4;
    }

    :host(.vertical) .end {
      grid-row: 3;
    }

    :host(.vertical) .activeIndicator {
      grid-column: 1;
      grid-row: 1;
      width: 3px;
      height: 20px;
      border-radius: calc(${controlCornerRadius} * 1px);
      align-self: center;
      background: ${accentFillRest};
    }

    :host(.vertical) .activeIndicatorTransition {
      transition: transform 0.2s linear;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .activeIndicator,
        :host(.vertical) .activeIndicator {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
        }
      `,
    ),
  );
