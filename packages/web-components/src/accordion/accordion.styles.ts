import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  bodyFont,
  neutralStrokeDivider,
  neutralForeground,
  strokeWidth,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
} from '../design-tokens';

export const accordionStyles = (context, definition) =>
  css`
    ${display('flex')} :host {
      box-sizing: border-box;
      flex-direction: column;
      font-family: ${bodyFont};
      font-size: ${typeRampMinus1FontSize};
      line-height: ${typeRampMinus1LineHeight};
      color: ${neutralForeground};
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeDivider};
    }
  `;
