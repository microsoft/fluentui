import { css } from '@microsoft/fast-element';
import { badgeBaseStyles, badgeFilledStyles, badgeGhostStyles, badgeSizeStyles } from '../styles/index.js';
import { borderRadiusMedium, borderRadiusSmall } from '../theme/design-tokens.js';
import { extraSmallState, roundedState, smallState, tinyState } from '../styles/states/index.js';

/**
 * Selector for the `dot` state.
 * @public
 */
const dotState = css.partial`:is([state--dot], :state(dot))`;

/** Badge styles
 * @public
 */
export const styles = css`
  :host(${roundedState}) {
    border-radius: ${borderRadiusMedium};
  }

  :host(${roundedState}${tinyState}),
  :host(${roundedState}${extraSmallState}),
  :host(${roundedState}${smallState}) {
    border-radius: ${borderRadiusSmall};
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeBaseStyles}

  :host(${dotState}),
  :host(${dotState}[appearance][size]) {
    min-width: auto;
    width: 6px;
    height: 6px;
    padding: 0;
  }
`;
