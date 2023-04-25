import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalMNudge,
  spacingHorizontalXXS,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('block')} :host {
    font-family: ${fontFamilyBase};
  }

  label {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    display: block;
    width: 100%;
    color: ${colorNeutralForeground1};
  }

  select {
    display: block;
    height: 32px;
    padding: 0;
    flex-grow: 1;
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
    padding-right: calc(${spacingHorizontalMNudge} + 20px + ${spacingHorizontalXXS} + ${spacingHorizontalXXS});
    padding-left: calc(${spacingHorizontalMNudge} + ${spacingHorizontalXXS});
  }

  :host([size='small']) select {
    height: 24px;
  }

  :host([size='large']) select {
    height: 40px;
  }

  select:focus {
    outline-color: transparent;
    outline-style: solid;
    outline-width: 2px;
  }

  :host([size='small']) select {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host([size='large']) select {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  .select-wrapper {
    display: flex;
    flex-wrap: no-wrap;
    position: relative;
    align-items: center;
  }

  .select-wrapper::after {
    display: block;
    position: absolute;
    content: '';
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    transform: scaleX(0);
    transition-delay: ${curveAccelerateMid};
    transition-duration: ${durationUltraFast};
    transition-property: transform;
    left: 0;
    bottom: 0;
    right: 0;
    height: ${borderRadiusMedium};
    background-image: linear-gradient(
      0deg,
      ${colorCompoundBrandStroke} 0%,
      ${colorCompoundBrandStroke} 50%,
      transparent 50%,
      transparent 100%
    );
  }

  .select-wrapper:focus-within::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-delay: ${curveDecelerateMid};
    transition-duration: ${durationNormal};
  }

  .dropdown-arrow {
    position: absolute;
    right: ${spacingHorizontalMNudge};
    pointer-events: none;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  .dropdown-arrow svg {
    color: ${colorNeutralStrokeAccessible};
  }

  :host([size='small']) .dropdown-arrow {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }

  :host([size='large']) .dropdown-arrow {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }
`;
