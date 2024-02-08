import { css } from '@microsoft/fast-element';
import { styles as ButtonStyles } from '../button/button.styles.js';
import {
  colorNeutralForeground2,
  colorNeutralForeground2BrandHover,
  colorNeutralForeground2BrandPressed,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundOnBrand,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
} from '../theme/design-tokens.js';

// Need to support icon hover styles
export const styles = css`
  ${ButtonStyles}

  :host .control,
  :host(:is([size])) .control {
    gap: 12px;
    height: auto;
    padding-top: 14px;
    padding-inline: 12px;
    padding-bottom: 16px;
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
  }

  .content {
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2});
    line-height: 100%;
    font-size: var(${fontSizeBase200});
    font-weight: var(${fontWeightRegular});
  }

  ::slotted(svg),
  :host([size='large']) ::slotted(svg) {
    font-size: 40px;
    height: 40px;
    width: 40px;
  }

  :host(:hover) ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2Hover});
  }

  :host(:active) ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2Pressed});
  }

  :host(:is([appearance='primary'], [appearance='primary']:hover, [appearance='primary']:active))
    ::slotted([slot='description']) {
    color: var(${colorNeutralForegroundOnBrand});
  }

  :host(:is([appearance='subtle'], [appearance='subtle']:hover, [appearance='subtle']:active))
    ::slotted([slot='description']),
  :host([appearance='transparent']) ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2});
  }

  :host([appearance='transparent']:hover) ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2BrandHover});
  }

  :host([appearance='transparent']:active) ::slotted([slot='description']) {
    color: var(${colorNeutralForeground2BrandPressed});
  }

  :host(:is([disabled], [disabled][appearance], [disabled-focusable], [disabled-focusable][appearance]))
    ::slotted([slot='description']) {
    color: var(${colorNeutralForegroundDisabled});
  }

  :host([size='small']) .control {
    padding: 8px;
    padding-bottom: 10px;
  }

  :host([icon-only]) .control {
    min-width: 52px;
    max-width: 52px;
    padding: var(${spacingHorizontalSNudge});
  }

  :host([icon-only][size='small']) .control {
    min-width: 48px;
    max-width: 48px;
    padding: var(${spacingHorizontalXS});
  }

  :host([icon-only][size='large']) .control {
    min-width: 56px;
    max-width: 56px;
    padding: var(${spacingHorizontalS});
  }

  :host([size='large']) .control {
    padding-top: 18px;
    padding-inline: 16px;
    padding-bottom: 20px;
    font-size: var(${fontSizeBase400});
    line-height: var(${lineHeightBase400});
  }
  :host([size='large']) ::slotted([slot='description']) {
    font-size: var(${fontSizeBase300});
  }
`;
