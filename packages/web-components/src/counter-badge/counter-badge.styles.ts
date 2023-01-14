import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { badgeFilledStyles, badgeGhostStyles, badgeSizeStyles } from '../styles/index';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightSemibold,
  lineHeightBase200,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Badge styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')} :host {
    position: relative;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host(:not([appearance='ghost'])) {
    content: '';
    position: 'absolute';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: ${strokeWidthThin};
    border-color: inherit;
    border-radius: inherit;
  }

  :host([shape='circular']) {
    border-radius: ${borderRadiusCircular};
  }

  :host([shape='rounded']) {
    border-radius: ${borderRadiusMedium};
  }

  :host([shape='rounded'][size='tiny']),
  :host([shape='rounded'][size='extra-small']),
  :host([shape='rounded'][size='small']) {
    border-radius: ${borderRadiusSmall};
  }

  :host([dot]) {
    min-width: auto;
    width: 6px;
    height: 6px;
    padding: 0;
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
`;
