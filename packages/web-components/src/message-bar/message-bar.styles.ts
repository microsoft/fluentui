import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground3,
  colorNeutralForeground3,
  colorNeutralStroke1,
  colorPaletteDarkOrangeBackground1,
  colorPaletteDarkOrangeBorder1,
  colorPaletteDarkOrangeForeground1,
  colorPaletteGreenBackground1,
  colorPaletteGreenBorder1,
  colorPaletteGreenForeground1,
  colorPaletteRedBackground1,
  colorPaletteRedBorder1,
  colorPaletteRedForeground1,
  fontFamilyBase,
  fontSizeBase200,
  lineHeightBase200,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalMNudge,
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
    padding: 0 ${spacingHorizontalM};
    border-radius: ${borderRadiusMedium};
    min-height: 36px;
    align-items: center;
    grid-template: 'icon body actions close' / auto 1fr auto auto;
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
      'icon body close'
      'actions actions actions';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalM};
  }

  .icon {
  }

  :host([intent='info']) .info,
  :host([intent='warning']) .warning,
  :host([intent='error']) .error,
  :host([intent='success']) .success {
    display: flex;
  }

  :host([intent='success']) .success {
    color: ${colorPaletteGreenForeground1};
  }

  :host([intent='warning']) .warning {
    color: ${colorPaletteDarkOrangeForeground1};
  }

  :host([intent='error']) .error {
    color: ${colorPaletteRedForeground1};
  }

  .content {
    grid-area: body;
    max-width: 520px;
    padding: ${spacingVerticalMNudge} 0;
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
    margin-right: ${spacingHorizontalS};
  }

  ::slotted([slot='close']) {
    grid-area: close;
    display: flex;
    justify-content: end;
  }

  :host([layout='multiline']) ::slotted([slot='close']) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }

  ::slotted([slot='actions']) {
    grid-area: actions;
    display: flex;
    justify-content: end;
    margin-right: ${spacingHorizontalS};
  }

  :host([layout='multiline']) ::slotted([slot='actions']) {
    margin-top: ${spacingVerticalMNudge};
  }

  ::slotted(*) {
    font-size: unset;
  }
`;
