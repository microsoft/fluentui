import { css } from '@microsoft/fast-element';
import {
  badgeBaseStyles,
  badgeFilledStyles,
  badgeGhostStyles,
  badgeOutlineStyles,
  badgeSizeStyles,
  badgeTintStyles,
} from '../styles/index.js';
import { borderRadiusMedium, borderRadiusNone, borderRadiusSmall } from '../theme/design-tokens.js';
// why is the border not showing up?
/** Badge styles
 * @public
 */
export const styles = css`
  :host([shape='square']) {
    border-radius: var(${borderRadiusNone});
  }

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
  ${badgeOutlineStyles}
  ${badgeTintStyles}
  ${badgeBaseStyles}
`;
