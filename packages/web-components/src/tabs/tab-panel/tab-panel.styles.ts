import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

export const TabPanelStyles = css`
  ${display('flex')} :host {
    box-sizing: border-box;
    font-family: var(--body-font);
    ${/* Font size, weight, and line height are temporary - 
            replace when adaptive typography is figured out */ ''} font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    padding: 0 calc((6 + (var(--design-unit) * 2 * var(--density))) * 1px);
  }
`;
