import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { elevation } from '../styles/index';
import {
  neutralLayerFloating,
  strokeWidth,
  surfaceCornerRadius,
  controlCornerRadius,
  designUnit,
  neutralStrokeDivider,
} from '../design-tokens';

export const menuStyles = (context, definition) =>
  css`
    ${display('block')} :host {
      --elevation: 11;
      background: ${neutralLayerFloating};
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: ${surfaceCornerRadius};
      ${elevation}
      margin: 0;
      border-radius: calc(${controlCornerRadius} * 1px);
      padding: calc(${designUnit} * 1px) 0;
      max-width: 368px;
      min-width: 64px;
    }

    :host([slot='submenu']) {
      width: max-content;
      margin: 0 calc(${designUnit} * 1px);
    }

    ::slotted(hr) {
      box-sizing: content-box;
      height: 0;
      margin: 0;
      border: none;
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeDivider};
    }
  `;
