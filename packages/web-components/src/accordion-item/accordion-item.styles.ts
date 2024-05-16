import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentBackground,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  lineHeightBase500,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('block')}

  :host {
    max-width: fit-content;
    contain: content;
  }

  .heading {
    height: 44px;
    display: grid;
    position: relative;
    vertical-align: middle;
    padding-inline: ${spacingHorizontalM} ${spacingHorizontalMNudge};
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    grid-template-columns: auto auto 1fr auto;
  }

  .heading-content {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .button {
    box-sizing: border-box;
    appearance: none;
    border: none;
    outline: none;
    text-align: start;
    cursor: pointer;
    font-family: inherit;
    height: 44px;
    color: ${colorNeutralForeground1};
    background: ${colorTransparentBackground};
    line-height: ${lineHeightBase300};
    height: auto;
    padding: 0;
    font-size: inherit;
    grid-column: auto / span 2;
    grid-row: 1;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    position: relative;
    height: 100%;
    padding-right: ${spacingHorizontalS};
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  .region {
    margin: 0 ${spacingHorizontalM};
  }

  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    justify-content: center;
    align-items: center;
    padding-right: ${spacingHorizontalS};
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
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

  :host([disabled]) .button {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) svg {
    filter: invert(89%) sepia(0%) saturate(569%) hue-rotate(155deg) brightness(88%) contrast(87%);
  }

  /* --- Expanded attr styles --- */

  :host([expanded]) .region {
    display: block;
  }

  :host([expanded]) .default-collapsed-icon,
  :host([expanded]) ::slotted([slot='collapsed-icon']),
  :host(:not([expanded])) .default-expanded-icon,
  :host(:not([expanded])) ::slotted([slot='expanded-icon']),
  :host([expanded]) ::slotted([slot='end']),
  ::slotted([slot='start']),
  .region {
    display: none;
  }

  :host([expanded]) ::slotted([slot='start']),
  :host([expanded]) ::slotted([slot='expanded-icon']),
  :host(:not([expanded])) ::slotted([slot='collapsed-icon']),
  ::slotted([slot='end']) {
    display: flex;
  }

  /* --- Appearance attr styles --- */

  .heading {
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host([size='small']) .heading {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host([size='large']) .heading {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host([size='extra-large']) .heading {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }

  /* --- expand-icon-position attr styles --- */

  :host([expand-icon-position='end']) :slotted(span[slot='start']),
  :host([expand-icon-position='end']) ::slotted(span[slot='end']) {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  :host([expand-icon-position='end']) ::slotted(span[slot='start']),
  :host([expand-icon-position='end']) ::slotted(span[slot='end']) {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  :host([expand-icon-position='end']) .icon {
    grid-column: 4 / span 1;
    grid-row: 1;
    display: flex;
    padding-left: 10px;
    padding-right: 0;
  }

  :host([expand-icon-position='end']) .button {
    grid-column: 2 / span 3;
    grid-row: 1;
  }

  /* --- Block attr styles --- */

  :host([block]) {
    max-width: 100%;
  }

  :host([expand-icon-position='end']) .heading {
    grid-template-columns: auto auto 28px;
  }

  :host([expand-icon-position='end']) .icon {
    grid-column: 5 / span 1;
  }

  :host([block][expand-icon-position='end']) .heading {
    grid-template-columns: auto 1fr;
  }

  :host([block][expand-icon-position='end']) .icon {
    grid-column: 5 / span 1;
  }
`;
