import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import { spacingHorizontalS, spacingVerticalL } from '../theme/design-tokens.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    height: 100%;
    padding: var(--spacingHorizontalXL);
    max-height: calc(100vh - (2 * var(--spacingVerticalXXL)));
  }
  .drawer-body {
    display: grid;
    grid-template-rows: min-content auto min-content;
    gap: ${spacingVerticalL};
    overflow-y: auto;
    max-height: calc(100vh - 2 * ${spacingVerticalL});
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-weight: var(--fontWeightSemibold);
    font-size: var(--fontSizeBase500);
    line-height: var(--lineHeightBase500);
  }
  .footer {
    display: flex;
    justify-content: flex-start;
    gap: ${spacingHorizontalS};
  }
`;
