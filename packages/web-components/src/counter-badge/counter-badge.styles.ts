import { css } from '@microsoft/fast-element';
import {
  badgeBaseStyles,
  badgeFilledStyles,
  badgeGhostStyles,
  badgeSizeStyles,
} from '../styles/partials/badge.partials.js';
import { borderRadiusMedium, borderRadiusSmall } from '../theme/design-tokens.js';
import { state } from '../utils/states.js';

/** Badge styles
 * @public
 */
export const styles = css`
  :host(${state('rounded')}) {
    border-radius: ${borderRadiusMedium};
  }

  :host(${state('rounded')}${state('tiny')}),
  :host(${state('rounded')}${state('extra-small')}),
  :host(${state('rounded')}${state('small')}) {
    border-radius: ${borderRadiusSmall};
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeBaseStyles}

  :host(${state('dot')}),
  :host(${state('dot')}[appearance][size]) {
    min-width: auto;
    width: 6px;
    height: 6px;
    padding: 0;
  }
`;
