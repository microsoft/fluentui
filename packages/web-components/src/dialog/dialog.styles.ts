import { css, ElementStyles } from '@microsoft/fast-element';
import { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { elevationShadowDialog } from '../styles';
import { fillColor, layerCornerRadius, strokeWidth } from '../design-tokens';

export const dialogStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) => css`
  :host([hidden]) {
    display: none;
  }

  :host {
    --dialog-height: 480px;
    --dialog-width: 640px;
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    touch-action: none;
  }

  .positioning-region {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .control {
    box-shadow: ${elevationShadowDialog};
    margin-top: auto;
    margin-bottom: auto;
    border-radius: calc(${layerCornerRadius} * 1px);
    width: var(--dialog-width);
    height: var(--dialog-height);
    background: ${fillColor};
    z-index: 1;
    border: calc(${strokeWidth} * 1px) solid transparent;
  }
`;
