import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  // Design tokens
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeDisabled,
  colorTransparentBackground,
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

  /* Label styles */
  label {
    display: block;
    width: 100%;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
  }

  /* Select styles */
  select {
    display: block;
    flex-grow: 1;
    height: 32px;
    padding: 0;
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

  /* Select size variations */
  :host([control-size='small']) select {
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host([control-size='large']) select {
    height: 40px;
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  /* Disabled styles */
  :host([disabled]) select {
    color: ${colorNeutralForegroundDisabled};
    background-color: ${colorTransparentBackground};
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host([disabled]) select:hover {
    cursor: not-allowed;
  }

  /* Focus styles */
  select:focus {
    outline-color: transparent;
    outline-style: solid;
    outline-width: 2px;
  }

  /* Select wrapper styles */
  .select-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    flex-wrap: no-wrap;
  }

  .select-wrapper::after {
    display: block;
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    right: 0;
    height: ${borderRadiusMedium};
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    background-image: linear-gradient(
      0deg,
      ${colorCompoundBrandStroke} 0%,
      ${colorCompoundBrandStroke} 50%,
      transparent 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transition-delay: ${curveAccelerateMid};
    transition-duration: ${durationUltraFast};
    transition-property: transform;
  }

  .select-wrapper:focus-within::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-delay: ${curveDecelerateMid};
    transition-duration: ${durationNormal};
  }

  /* Dropdown arrow styles */
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

  /* Dropdown arrow size variations */
  :host([control-size='small']) .dropdown-arrow {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }

  :host([control-size='large']) .dropdown-arrow {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  /* Disabled dropdown arrow styles */
  :host([disabled]) .dropdown-arrow svg {
    color: ${colorNeutralForegroundDisabled};
  }
`;
