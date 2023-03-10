import { css, ElementStyles } from '@microsoft/fast-element';
import {
  AnchoredRegion,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition
} from '@microsoft/fast-foundation';
import { elevationShadowTooltip } from '../styles/index';
import {
  controlCornerRadius,
  fillColor,
  neutralForegroundRest,
  neutralStrokeLayerRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const tooltipStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host {
      position: relative;
      contain: layout;
      overflow: visible;
      height: 0;
      width: 0;
      z-index: 10000;
    }

    .tooltip {
      box-sizing: border-box;
      border-radius: calc(${controlCornerRadius} * 1px);
      border: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      background: ${fillColor};
      color: ${neutralForegroundRest};
      padding: 4px 12px;
      height: fit-content;
      width: fit-content;
      ${typeRampBase}
      white-space: nowrap;
      box-shadow: ${elevationShadowTooltip};
    }

    ${context.tagFor(AnchoredRegion)} {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: visible;
      flex-direction: row;
    }

    ${context.tagFor(AnchoredRegion)}.right,
    ${context.tagFor(AnchoredRegion)}.left {
      flex-direction: column;
    }

    ${context.tagFor(AnchoredRegion)}.top .tooltip::after,
    ${context.tagFor(AnchoredRegion)}.bottom .tooltip::after,
    ${context.tagFor(AnchoredRegion)}.left .tooltip::after,
    ${context.tagFor(AnchoredRegion)}.right .tooltip::after {
      content: '';
      width: 12px;
      height: 12px;
      background: ${fillColor};
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      border-left: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      position: absolute;
    }

    ${context.tagFor(AnchoredRegion)}.top .tooltip::after {
      transform: translateX(-50%) rotate(225deg);
      bottom: 5px;
      left: 50%;
    }

    ${context.tagFor(AnchoredRegion)}.top .tooltip {
      margin-bottom: 12px;
    }

    ${context.tagFor(AnchoredRegion)}.bottom .tooltip::after {
      transform: translateX(-50%) rotate(45deg);
      top: 5px;
      left: 50%;
    }

    ${context.tagFor(AnchoredRegion)}.bottom .tooltip {
      margin-top: 12px;
    }

    ${context.tagFor(AnchoredRegion)}.left .tooltip::after {
      transform: translateY(-50%) rotate(135deg);
      top: 50%;
      right: 5px;
    }

    ${context.tagFor(AnchoredRegion)}.left .tooltip {
      margin-right: 12px;
    }

    ${context.tagFor(AnchoredRegion)}.right .tooltip::after {
      transform: translateY(-50%) rotate(-45deg);
      top: 50%;
      left: 5px;
    }

    ${context.tagFor(AnchoredRegion)}.right .tooltip {
      margin-left: 12px;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]) {
          opacity: 1;
        }
        ${context.tagFor(AnchoredRegion)}.top .tooltip::after,
        ${context.tagFor(AnchoredRegion)}.bottom .tooltip::after,
        ${context.tagFor(AnchoredRegion)}.left .tooltip::after,
        ${context.tagFor(AnchoredRegion)}.right .tooltip::after {
          content: '';
          width: unset;
          height: unset;
        }
      `,
    ),
  );
