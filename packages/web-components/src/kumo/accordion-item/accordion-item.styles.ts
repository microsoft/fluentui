import { css } from '@microsoft/fast-element';
import { display } from '../../utils/index.js';
import { disabledState, expandedState } from '../../styles/states/index.js';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentBackground,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalS,
} from '../../theme/design-tokens.js';

export const styles = css`
  ${display('block')}

  :host {
    max-width: 100%;
    contain: content;
  }

  .heading {
    height: 44px;
    display: grid;
    position: relative;
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    grid-template-columns: auto 1fr;
    padding-inline: ${spacingHorizontalM};
  }

  .button {
    appearance: none;
    background: ${colorTransparentBackground};
    border: none;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    cursor: pointer;
    font: inherit;
    grid-column: 2 / span 3;
    grid-row: 1;
    height: 44px;
    outline: none;
    padding: 0;
    text-align: start;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};
  }

  :where(.default-marker-collapsed, .default-marker-expanded) {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    position: relative;
    height: 100%;
    padding-inline-end: ${spacingHorizontalS};
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  .content {
    margin: 0 ${spacingHorizontalM};
  }

  button:focus-visible::after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};
    outline: none;
    border: 2px solid ${colorStrokeFocus1};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
  }

  /* --- Disabled attr styles --- */

  :host(${disabledState}) .button {
    color: ${colorNeutralForegroundDisabled};
  }

  :host(${disabledState}) svg {
    filter: invert(89%) sepia(0%) saturate(569%) hue-rotate(155deg) brightness(88%) contrast(87%);
  }

  /* --- Expanded attr styles --- */

  :host(${expandedState}) .content {
    display: block;
  }

  :host(${expandedState}) .default-marker-collapsed,
  :host(:not(${expandedState})) :is(.default-marker-expanded, .content) {
    display: none;
  }

  :host(:not(${expandedState})) .default-marker-collapsed {
    display: flex;
  }

  :is(.default-marker-collapsed, .default-marker-expanded) {
    grid-column: 5 / span 1;
    padding-inline-start: ${spacingHorizontalS};
    padding-inline-end: 0;
  }
`;
