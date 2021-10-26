import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { elevationShadowFlyout } from '../styles/index';
import {
  designUnit,
  layerCornerRadius,
  neutralLayerFloating,
  neutralStrokeDividerRest,
  strokeWidth,
} from '../design-tokens';

export const menuStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('block')} :host {
      background: ${neutralLayerFloating};
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: calc(${layerCornerRadius} * 1px);
      box-shadow: ${elevationShadowFlyout};
      margin: 0;
      padding: calc(${designUnit} * 1px) 0;
      max-width: 368px;
      min-width: 64px;
    }

    :host([slot='submenu']) {
      width: max-content;
      margin: 0 calc(${designUnit} * 2px);
    }

    ::slotted(hr) {
      box-sizing: content-box;
      height: 0;
      margin: calc(${designUnit} * 1px) 0;
      border: none;
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeDividerRest};
    }
  `;
