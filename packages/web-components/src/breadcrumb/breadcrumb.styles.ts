import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { bodyFont, typeRampBaseFontSize, typeRampBaseLineHeight } from '../design-tokens';

export const breadcrumbStyles = (context, definition) => css`
  ${display('inline-block')} :host {
    box-sizing: border-box;
    font-family: ${bodyFont};
    font-size: ${typeRampBaseFontSize};
    line-height: ${typeRampBaseLineHeight};
  }

  .list {
    display: flex;
  }
`;
