import { css, ElementStyles } from '@microsoft/fast-element';
import {
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
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

    fluent-anchored-region {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: visible;
      flex-direction: row;
    }

    fluent-anchored-region.right,
    fluent-anchored-region.left {
      flex-direction: column;
    }

    fluent-anchored-region.top .tooltip::after,
    fluent-anchored-region.bottom .tooltip::after,
    fluent-anchored-region.left .tooltip::after,
    fluent-anchored-region.right .tooltip::after {
      content: '';
      width: 12px;
      height: 12px;
      background: ${fillColor};
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      border-left: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      position: absolute;
    }

    fluent-anchored-region.top .tooltip::after {
      transform: translateX(-50%) rotate(225deg);
      bottom: 5px;
      left: 50%;
    }

    fluent-anchored-region.top .tooltip {
      margin-bottom: 12px;
    }

    fluent-anchored-region.bottom .tooltip::after {
      transform: translateX(-50%) rotate(45deg);
      top: 5px;
      left: 50%;
    }

    fluent-anchored-region.bottom .tooltip {
      margin-top: 12px;
    }

    fluent-anchored-region.left .tooltip::after {
      transform: translateY(-50%) rotate(135deg);
      top: 50%;
      right: 5px;
    }

    fluent-anchored-region.left .tooltip {
      margin-right: 12px;
    }

    fluent-anchored-region.right .tooltip::after {
      transform: translateY(-50%) rotate(-45deg);
      top: 50%;
      left: 5px;
    }

    fluent-anchored-region.right .tooltip {
      margin-left: 12px;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]) {
          opacity: 1;
        }
        fluent-anchored-region.top .tooltip::after,
        fluent-anchored-region.bottom .tooltip::after,
        fluent-anchored-region.left .tooltip::after,
        fluent-anchored-region.right .tooltip::after {
          content: '';
          width: unset;
          height: unset;
        }
      `,
    ),
  );
