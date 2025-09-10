import { css } from '@microsoft/fast-element';
import { badgeBaseStyles, badgeFilledStyles, badgeGhostStyles, badgeSizeStyles } from '../styles/index.js';
import { borderRadiusMedium, borderRadiusSmall } from '../theme/design-tokens.js';

/** Badge styles
 * @public
 */
export const styles = css`
  :host([shape='rounded']) {
    border-radius: ${borderRadiusMedium};
  }

  :host([shape='rounded']:is([size='tiny'], [size='extra-small'], [size='small'])) {
    border-radius: ${borderRadiusSmall};
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeBaseStyles}

  :host(:is([dot], [dot][appearance][size])) {
    min-width: auto;
    width: 6px;
    height: 6px;
    padding: 0;
  }
`;
