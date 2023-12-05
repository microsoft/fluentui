import { css } from '@microsoft/fast-element';
import { badgeBaseStyles, badgeFilledStyles, badgeGhostStyles, badgeSizeStyles } from '../styles/index.js';
import { borderRadiusMedium, borderRadiusSmall } from '../theme/design-tokens.js';

/** Badge styles
 * @public
 */
export const styles = css`
  :host([shape='rounded']) {
    border-radius: var(${borderRadiusMedium});
  }

  :host([shape='rounded'][size='tiny']),
  :host([shape='rounded'][size='extra-small']),
  :host([shape='rounded'][size='small']) {
    border-radius: var(${borderRadiusSmall});
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeBaseStyles}

  :host([dot]),
  :host([dot][appearance][size]) {
    min-width: auto;
    width: 6px;
    height: 6px;
    padding: 0;
  }
`;
