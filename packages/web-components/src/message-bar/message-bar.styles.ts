import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground3,
  colorNeutralForeground3,
  colorNeutralStroke1,
  colorPaletteDarkOrangeBackground1,
  colorPaletteDarkOrangeBorder1,
  colorPaletteGreenBackground1,
  colorPaletteGreenBorder1,
  colorPaletteRedBackground1,
  colorPaletteRedBorder1,
  fontFamilyBase,
  fontSizeBase200,
  lineHeightBase200,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalMNudge,
} from '../theme/design-tokens.js';

import { errorState, multiLineState, squareState, successState, warningState } from '../styles/states/index.js';

/**
 * Styles for the MessageBar component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  :host {
    display: grid;
    box-sizing: border-box;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    width: 100%;
    background: ${colorNeutralBackground3};
    border: 1px solid ${colorNeutralStroke1};
    padding: 0 ${spacingHorizontalM};
    border-radius: ${borderRadiusMedium};
    min-height: 36px;
    align-items: center;
    grid-template: 'icon body actions close' / auto 1fr auto auto;
  }

  :host(${squareState}) {
    border-radius: 0;
  }

  :host(${successState}) {
    background-color: ${colorPaletteGreenBackground1};
    border-color: ${colorPaletteGreenBorder1};
  }

  :host(${warningState}) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host(${errorState}) {
    background-color: ${colorPaletteRedBackground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host(${multiLineState}) {
    grid-template-areas:
      'icon body close'
      'actions actions actions';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto 1fr;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalM};
  }

  .content {
    grid-area: body;
    max-width: 520px;
    padding: ${spacingVerticalMNudge} 0;
  }

  :host(${multiLineState}) .content {
    padding: 0;
  }

  ::slotted([slot='icon']) {
    display: flex;
    grid-area: icon;
    flex-direction: column;
    align-items: center;
    color: ${colorNeutralForeground3};
    margin-right: ${spacingHorizontalS};
  }

  :host(${multiLineState}) ::slotted([slot='icon']) {
    align-items: start;
    height: 100%;
  }

  ::slotted([slot='close']) {
    grid-area: close;
    display: flex;
    justify-content: end;
  }

  :host(${multiLineState}) ::slotted([slot='close']) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }


  .actions {
    grid-area: actions;
    display: flex; /* Ensures items are laid out in a row */
    justify-self: end;
    margin-right: ${spacingHorizontalS};
  }

  :host(:is(${multiLineState}) .actions) {
    margin-top: ${spacingVerticalMNudge};
    margin-right: 0;
  }

  ::slotted(*) {
    font-size: inherit;
  }
`;
