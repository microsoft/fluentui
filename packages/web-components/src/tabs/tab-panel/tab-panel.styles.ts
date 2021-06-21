import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { bodyFont, density, designUnit, typeRampMinus1FontSize, typeRampMinus1LineHeight } from '../../design-tokens';

export const tabPanelStyles = (context, definition) => css`
  ${display('flex')} :host {
    box-sizing: border-box;
    font-family: ${bodyFont};
    font-size: ${typeRampMinus1FontSize};
    font-weight: 400;
    line-height: ${typeRampMinus1LineHeight};
    padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
  }
`;
