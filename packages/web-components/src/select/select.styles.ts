import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalMNudge,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('flex')} :host {
    flex-grow: 1;
    font-family: ${fontFamilyBase};
  }

  select {
    width: 100%;
    height: 32px;
    padding: 0 ${spacingHorizontalMNudge};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
    background-color: ${colorNeutralBackground1};
    border: 1px solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  :host([size='small']) select {
    height: 24px;
  }

  :host([size='large']) select {
    height: 40px;
  }

  select:focus {
    outline: none;
  }

  select::after {
    content: '';
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    background-image: linear-gradient(
      0deg,
      var(--colorCompoundBrandStroke) 0%,
      var(--colorCompoundBrandStroke) 50%,
      transparent 50%,
      transparent 100%
    );
  }

  select:focus::after {
    height: ${borderRadiusMedium};
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;
