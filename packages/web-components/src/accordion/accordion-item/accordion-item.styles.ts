import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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
} from '../../theme/design-tokens.js';

export const styles = css`
  /* --- Default styles --- */
  ${display('block')}

  :host {
    max-width: fit-content;
  }

  :host .heading {
    height: 44px;
    display: grid;
    position: relative;
    vertical-align: middle;
    padding-left: ${spacingHorizontalMNudge};
    padding-right: ${spacingHorizontalM};
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    grid-template-columns: 28px 28px auto 28px;
  }

  :host .heading .heading-content {
    height: 100%;
    display: flex;
    align-items: center;
  }

  :host .button {
    box-sizing: border-box;
    appearance: none;
    border: none;
    outline: none;
    text-align: left;
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

  :host .button::before {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};
  }

  :host .icon {
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

  :host .region {
    display: none;
    margin-left: ${spacingHorizontalM};
    margin-right: ${spacingHorizontalM};
  }

  :host .heading ::slotted(*) {
    display: flex;
    align-self: center;
  }

  :host slot[name='collapsed-icon'],
  :host slot[name='expanded-icon'] {
    display: flex;
    align-items: center;
  }

  :host slot[name='expanded-icon'] {
    display: none;
  }

  :host .heading ::slotted(span[slot='start']),
  :host .heading ::slotted(span[slot='end']) {
    justify-content: center;
    align-items: center;
    padding-right: ${spacingHorizontalS};
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }

  :host button:focus-visible::after {
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

  :host([expanded]) slot[name='collapsed-icon'] {
    display: none;
  }

  :host([expanded]) slot[name='expanded-icon'] {
    display: flex;
  }

  :host([expanded]) ::slotted(span[slot='end']),
  :host ::slotted(span[slot='start']) {
    display: none;
  }

  :host([expanded]) .heading ::slotted(span[slot='start']),
  :host ::slotted(span[slot='end']) {
    display: flex;
  }

  /* --- Appearance attr styles --- */

  :host .heading slot[name='heading'] {
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host([size='small']) .heading slot[name='heading'] {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host([size='large']) slot[name='heading'] {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host([size='extra-large']) slot[name='heading'] {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }

  /* --- expandIconPosition attr styles --- */

  :host([expandIconPosition='end']) slot[name='start'],
  :host([expandIconPosition='end']) slot[name='end'] {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  :host([expandIconPosition='end']) .heading ::slotted(span[slot='start']),
  :host([expandIconPosition='end']) .heading ::slotted(span[slot='end']) {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  :host([expandIconPosition='end']) .icon {
    grid-column: 4 / span 1;
    grid-row: 1;
    display: flex;
    padding-left: 10px;
    padding-right: 0;
  }

  :host([expandIconPosition='end']) .button {
    grid-column: 2 / span 3;
    grid-row: 1;
  }

  /* --- Block attr styles --- */

  :host([block]) {
    max-width: 100%;
  }

  :host([expandIconPosition='end']) .heading {
    grid-template-columns: auto auto 28px;
  }

  :host([expandIconPosition='end']) .icon {
    grid-column: 5 / span 1;
  }

  :host([block][expandIconPosition='end']) .heading {
    grid-template-columns: auto 1fr;
  }

  :host([block][expandIconPosition='end']) .icon {
    grid-column: 5 / span 1;
  }
`;
