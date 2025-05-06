import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import { spacingHorizontalM, spacingHorizontalXL } from '../theme/design-tokens.js';
import { typographySubtitle1Styles } from '../styles/partials/typography.partials.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('grid')}
  :host {
    box-sizing: border-box;
    grid-template-rows: min-content auto min-content;
    position: relative;
    height: 100%;
    padding: ${spacingHorizontalXL};
    max-height: 100svh;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${typographySubtitle1Styles}
  }

  .footer {
    display: flex;
    justify-content: flex-start;
    gap: ${spacingHorizontalM};
  }

  ::slotted([slot='title']) {
    font: inherit;
    padding: 0;
    margin: 0;
  }
`;
