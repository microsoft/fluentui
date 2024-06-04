import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  spacingHorizontalM,
  spacingHorizontalXL,
  spacingVerticalL,
  spacingVerticalXXL,
} from '../theme/design-tokens.js';
import { typographySubtitle1Styles } from '../styles/partials/typography.partials.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    position: relative;
    height: 100%;
    padding: ${spacingHorizontalXL};
    max-height: calc(100vh - (2 * ${spacingVerticalXXL}));
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
    ${typographySubtitle1Styles}
  }

  .footer {
    display: flex;
    justify-content: flex-start;
    gap: ${spacingHorizontalM};
  }
`;
