import { css, ElementStyles } from '@microsoft/fast-element';
import {
  AccordionItemOptions,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillRest,
  bodyFont,
  density,
  designUnit,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralForegroundRest,
  neutralStrokeDividerRest,
  strokeWidth,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
} from '../../design-tokens';
import { heightNumber } from '../../styles/size';

export const accordionItemStyles: (
  context: ElementDefinitionContext,
  definition: AccordionItemOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: AccordionItemOptions) =>
  css`
    ${display('flex')} :host {
      box-sizing: border-box;
      font-family: ${bodyFont};
      flex-direction: column;
      font-size: ${typeRampMinus1FontSize};
      line-height: ${typeRampMinus1LineHeight};
      border-bottom: calc(${strokeWidth} * 1px) solid ${neutralStrokeDividerRest};
    }

    .region {
      display: none;
      padding: calc((6 + (${designUnit} * 2 * ${density})) * 1px);
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
      padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
      text-align: left;
      height: calc(${heightNumber} * 1px);
      color: ${neutralForegroundRest};
      cursor: pointer;
      font-family: inherit;
    }

    .button:hover,
    .button:active {
      color: ${neutralForegroundRest};
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      cursor: pointer;
    }

    .button: ${focusVisible}::before {
      outline: none;
      border: calc(${strokeWidth} * 1px) solid ${focusStrokeOuter};
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter};
    }

    :host(.expanded) .region {
      display: block;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: 4;
      z-index: 2;
      pointer-events: none;
      fill: ${accentFillRest};
    }

    slot[name='collapsed-icon'] {
      display: flex;
    }

    :host(.expanded) slot[name='collapsed-icon'] {
      display: none;
    }

    slot[name='expanded-icon'] {
      display: none;
    }

    :host(.expanded) slot[name='expanded-icon'] {
      display: flex;
    }

    .start {
      display: flex;
      align-items: center;
      padding-inline-start: calc(${designUnit} * 1px);
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
    forcedColorsStylesheetBehavior(
      css`
        .button: ${focusVisible}::before {
          border-color: ${SystemColors.Highlight};
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.Highlight};
        }
        .icon {
          fill: ${SystemColors.ButtonText};
        }
      `,
    ),
  );
