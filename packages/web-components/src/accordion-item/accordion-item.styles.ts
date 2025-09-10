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
    padding-inline: ${spacingHorizontalM} ${spacingHorizontalMNudge};
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    grid-template-columns: auto auto 1fr auto;
  }

  .button {
    appearance: none;
    background: ${colorTransparentBackground};
    border: none;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    cursor: pointer;
    font: inherit;
    grid-column: auto / span 2;
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

  :where(.default-marker-collapsed, .default-marker-expanded),
  ::slotted(:is([slot='marker-collapsed'], [slot='marker-expanded'])) {
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

  ::slotted([slot='start']) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: ${spacingHorizontalS};
    grid-column: 2 / span 1;
    grid-row: 1;
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

  :host([expanded]) .content {
    display: block;
  }

  :host([expanded]) .default-marker-collapsed,
  :host([expanded]) ::slotted([slot='marker-collapsed']),
  :host(:not([expanded])) :is(.default-marker-expanded, .content),
  :host(:not([expanded])) ::slotted([slot='marker-expanded']) {
    display: none;
  }

  :host([expanded]) ::slotted([slot='marker-expanded']),
  :host(:not([expanded])) ::slotted([slot='marker-collapsed']) {
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

  /* --- marker-position attr styles --- */

  :host([marker-position='end']) ::slotted([slot='start']) {
    grid-column: 1 / span 1;
  }

  :host([marker-position='end']) :is(.default-marker-collapsed, .default-marker-expanded) {
    grid-column: 4 / span 1;
    padding-inline-start: ${spacingHorizontalS};
    padding-inline-end: 0;
  }

  :host([marker-position='end']) .button {
    grid-column: 2 / span 3;
  }

  /* --- Block attr styles --- */

  :host([block]) {
    max-width: 100%;
  }

  :host([marker-position='end']) .heading {
    grid-template-columns: auto auto 28px;
    padding-inline: ${spacingHorizontalM};
  }

  :host([marker-position='end']:has([slot='start'])) .heading {
    padding-inline: ${spacingHorizontalMNudge} ${spacingHorizontalM};
  }

  :host([block][marker-position='end']) .heading {
    grid-template-columns: auto 1fr;
  }

  :host([marker-position='end']) :is(.default-marker-collapsed, .default-marker-expanded) {
    grid-column: 5 / span 1;
  }
`;
