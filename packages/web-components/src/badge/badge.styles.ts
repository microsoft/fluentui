import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  accentForegroundRest,
  bodyFont,
  cornerRadius,
  designUnit,
  neutralForegroundRest,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
  neutralFillRest,
  accentForegroundCut,
} from '../design-tokens';

export const badgeStyles = (context, definition) =>
  css`
    ${display('inline-block')} :host {
      box-sizing: border-box;
      font-family: ${bodyFont};
      font-size: ${typeRampMinus1FontSize};
      line-height: ${typeRampMinus1LineHeight};
    }

    .control {
      border-radius: calc(${cornerRadius} * 1px);
      padding: calc(${designUnit} * 0.5px) calc(${designUnit} * 1px);
    }

    :host(.lightweight) .control {
      background: transparent;
      color: ${neutralForegroundRest};
      font-weight: 600;
    }

    :host(.accent) .control {
      background: ${accentForegroundRest};
      color: ${accentForegroundCut};
    }

    :host(.neutral) .control {
      background: ${neutralFillRest};
      color: ${neutralForegroundRest};
    }
  `;
