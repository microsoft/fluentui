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
  spacingVerticalS,
} from '../theme/design-tokens.js';

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
    padding-inline: ${spacingHorizontalM};
    border-radius: ${borderRadiusMedium};
    min-height: 36px;
    align-items: center;
    grid-template: 'icon body actions dismiss' / auto 1fr auto auto;
    contain: layout style paint;
  }

  :host([shape='square']) {
    border-radius: 0;
  }

  :host([intent='success']) {
    background-color: ${colorPaletteGreenBackground1};
    border-color: ${colorPaletteGreenBorder1};
  }

  :host([intent='warning']) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host([intent='error']) {
    background-color: ${colorPaletteRedBackground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host([layout='multiline']) {
    grid-template-areas:
      'icon body dismiss'
      'actions actions actions';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto 1fr;
    padding-block: ${spacingVerticalMNudge};
    padding-inline: ${spacingHorizontalM};
  }

  .content {
    grid-area: body;
    max-width: 520px;
    padding-block: ${spacingVerticalMNudge};
    padding-inline: 0;
  }

  :host([layout='multiline']) .content {
    padding: 0;
  }

  ::slotted([slot='icon']) {
    display: flex;
    grid-area: icon;
    flex-direction: column;
    align-items: center;
    color: ${colorNeutralForeground3};
    margin-inline-end: ${spacingHorizontalS};
  }

  :host([layout='multiline']) ::slotted([slot='icon']) {
    align-items: start;
    height: 100%;
  }

  ::slotted([slot='dismiss']) {
    grid-area: dismiss;
  }

  .actions {
    grid-area: actions;
    display: flex;
    justify-self: end;
    margin-inline-end: ${spacingHorizontalS};
    gap: ${spacingHorizontalS};
  }

  :host([layout='multiline']) .actions {
    margin-block-start: ${spacingVerticalMNudge};
    margin-inline-end: 0;
  }

  :host([layout='multiline']) ::slotted([slot='dismiss']) {
    align-items: start;
    height: 100%;
    padding-block-start: ${spacingVerticalS};
  }

  ::slotted(*) {
    font-size: inherit;
  }
`;
