import { css, ElementStyles } from '@microsoft/fast-element';
import {
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { elevation } from '../styles/index';
import {
  bodyFont,
  controlCornerRadius,
  fillColor,
  neutralForegroundRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const tooltipStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host {
      --elevation: 11;
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
      border: calc(${strokeWidth} * 1px) solid transparent;
      background: ${fillColor};
      color: ${neutralForegroundRest};
      padding: 4px 12px;
      height: fit-content;
      width: fit-content;
      font-family: ${bodyFont};
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      white-space: nowrap;
      ${elevation}
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
      border-radius: calc(${controlCornerRadius} * 1px);
      position: absolute;
    }

    fluent-anchored-region.top .tooltip::after {
      transform: rotate(45deg) translateX(-50%);
      bottom: 4px;
      left: 50%;
    }

    fluent-anchored-region.top .tooltip {
      margin-bottom: 12px;
    }

    fluent-anchored-region.bottom .tooltip::after {
      transform: rotate(45deg) translateX(-50%);
      top: 12px;
      left: 50%;
    }

    fluent-anchored-region.bottom .tooltip {
      margin-top: 12px;
    }

    fluent-anchored-region.left .tooltip::after {
      transform: rotate(45deg) translateY(-50%);
      top: 50%;
      right: 12px;
    }

    fluent-anchored-region.left .tooltip {
      margin-right: 12px;
    }

    fluent-anchored-region.right .tooltip::after {
      transform: rotate(45deg) translateY(-50%);
      top: 50%;
      left: 4px;
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
