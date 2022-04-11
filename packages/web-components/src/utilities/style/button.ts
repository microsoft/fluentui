import { tokens } from '@fluentui/react-theme';
import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

/**
 * Base button styles
 */
export const baseButtonStyles = css`
  ${display('inline-block')}

  :host {
    --button-border-color: ${tokens.colorNeutralStroke1};
    --button-border-right-color: var(--button-border-color);
    --button-border-left-color: var(--button-border-color);
    --button-border-radius: ${tokens.borderRadiusMedium};
    --border-top-right-radius: var(--button-border-radius);
    --border-top-left-radius: var(--button-border-radius);
    --border-bottom-right-radius: var(--button-border-radius);
    --border-bottom-left-radius: var(--button-border-radius);
    border: none;
  }

  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin: 0;
    max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: ${tokens.colorNeutralBackground1};
    color: ${tokens.colorNeutralForeground1};
    border-width: ${tokens.strokeWidthThin};
    border-style: solid;
    font-family: ${tokens.fontFamilyBase};
    outline-style: none;
    border-color: var(--button-border-color);
    border-right-color: var(--button-border-right-color);
    border-left-color: var(--button-border-left-color);
    border-top-right-radius: var(--border-top-right-radius);
    border-top-left-radius: var(--border-top-left-radius);
    border-bottom-right-radius: var(--border-bottom-right-radius);
    border-bottom-left-radius: var(--border-bottom-left-radius);
  }

  :host(:hover) {
    --button-border-color: ${tokens.colorNeutralStroke1Hover};
  }

  :host(:active) {
    --button-border-color: ${tokens.colorNeutralStroke1Pressed};
  }

  :host(:hover) .base {
    background-color: ${tokens.colorNeutralBackground1Hover};
    color: ${tokens.colorNeutralForeground1};
    cursor: pointer;
  }

  :host(:active) .base {
    background-color: ${tokens.colorNeutralBackground1Pressed};
    color: ${tokens.colorNeutralForeground1};
    outline-style: none;
  }

  :host([size][shape='circular']) {
    --button-border-radius: ${tokens.borderRadiusCircular};
  }

  :host([size][shape='square']) {
    --button-border-radius: ${tokens.borderRadiusNone};
  }

  :host([disabled]),
  :host([disabled]:active),
  :host([disabled]:hover) {
    --button-border-color: ${tokens.colorNeutralStrokeDisabled};
  }

  :host([disabled]) .base,
  :host .base[aria-disabled='true'] {
    background-color: ${tokens.colorNeutralBackgroundDisabled};
    color: ${tokens.colorNeutralForegroundDisabled};
    cursor: not-allowed;
  }

  ::slotted(svg),
  slot > svg {
    font-size: 20px;
    height: 20px;
    width: 20px;
    fill: currentColor;
  }
`;

/**
 * Primary button styles
 */
export const primaryButtonStyles = css`
  :host([appearance='primary']),
  :host([appearance='primary']:hover),
  :host([appearance='primary']:active) {
    --button-border-color: transparent;
  }

  :host([appearance='primary']) .base,
  :host([appearance='primary']:hover) .base,
  :host([appearance='primary']:active) .base {
    border-color: inherit;
  }

  :host([appearance='primary']) .base {
    background-color: ${tokens.colorBrandBackground};
    color: ${tokens.colorNeutralForegroundOnBrand};
  }

  :host([appearance='primary']:hover) .base {
    background-color: ${tokens.colorBrandBackgroundHover};
    color: ${tokens.colorNeutralForegroundOnBrand};
  }

  :host([appearance='primary']:active) .base {
    background-color: ${tokens.colorBrandBackgroundPressed};
    color: ${tokens.colorNeutralForegroundOnBrand};
  }

  :host([appearance='primary'][disabled]) .base,
  :host([appearance='primary'][disabled]:hover) .base,
  :host([appearance='primary'][disabled]:active) .base,
  :host([appearance='primary']) .base[aria-disabled='true'],
  :host([appearance='primary']:hover) .base[aria-disabled='true'],
  :host([appearance='primary']:active) .base[aria-disabled='true'] {
    background-color: ${tokens.colorNeutralBackgroundDisabled};
    border-color: ${tokens.colorNeutralStrokeDisabled};
    color: ${tokens.colorNeutralForegroundDisabled};
    cursor: not-allowed;
  }
`;

/**
 * Subtle button styles
 */
export const subtleButtonStyles = css`
  :host([appearance='subtle']),
  :host([appearance='subtle']:hover),
  :host([appearance='subtle']:active) {
    --button-border-color: transparent;
  }

  :host([appearance='subtle']) .base {
    background-color: ${tokens.colorSubtleBackground};
    color: ${tokens.colorNeutralForeground2};
  }

  :host([appearance='subtle']:hover) .base {
    background-color: ${tokens.colorSubtleBackgroundHover};
    color: ${tokens.colorNeutralForeground2BrandHover};
  }

  :host([appearance='subtle']:active) .base {
    background-color: ${tokens.colorSubtleBackgroundPressed};
    color: ${tokens.colorNeutralForeground2BrandPressed};
  }

  :host([appearance='subtle'][disabled]) .base,
  :host([appearance='subtle'][disabled]:hover) .base,
  :host([appearance='subtle'][disabled]:active) .base {
    color: ${tokens.colorNeutralForegroundDisabled};
    cursor: not-allowed;
    background-color: transparent;
    border-color: transparent;
  }
`;

/**
 * Outline button styles
 */
export const outlineButtonStyles = css`
  :host([appearance='outline']) .base {
    background-color: ${tokens.colorTransparentBackground};
  }

  :host([appearance='outline']:hover) .base {
    background-color: ${tokens.colorTransparentBackgroundHover};
  }

  :host([appearance='outline']:active) .base {
    background-color: ${tokens.colorTransparentBackgroundPressed};
  }
`;

/**
 * Transparent button styles
 */
export const transparentButtonStyles = css`
  :host([appearance='transparent']),
  :host([appearance='transparent']:hover),
  :host([appearance='transparent']:active) {
    --button-border-color: transparent;
  }
  :host([appearance='transparent']) .base {
    background-color: ${tokens.colorTransparentBackground};
    color: ${tokens.colorNeutralForeground2};
  }

  :host([appearance='transparent']:hover) .base {
    background-color: ${tokens.colorTransparentBackgroundHover};
    color: ${tokens.colorNeutralForeground2BrandHover};
  }

  :host([appearance='transparent']:active) .base {
    background-color: ${tokens.colorTransparentBackgroundPressed};
    color: ${tokens.colorNeutralForeground2BrandPressed};
  }

  :host([appearance='transparent'][disabled]) .base,
  :host([appearance='transparent'][disabled]:hover) .base,
  :host([appearance='transparent'][disabled]:active) .base {
    background-color: transparent;
    border-color: transparent;
    color: ${tokens.colorNeutralForegroundDisabled};
  }
`;

/**
 * Small button styles
 */
export const smallButtonStyles = css`
  :host([size='small']) .base {
    --button-border-radius: ${tokens.borderRadiusSmall};
    gap: 4px;
    padding: 0 8px;
    height: 24px;
    min-width: 64px;
    font-size: ${tokens.fontSizeBase200};
    font-weight: ${tokens.fontWeightRegular};
    line-height: ${tokens.lineHeightBase200};
  }

  :host([size='small']) .base.icon-only {
    padding: 4px;
    min-width: 28px;
    max-width: 28px;
  }
`;

/**
 * Medium button styles
 */
export const mediumButtonStyles = css`
  :host([size='medium']) .base {
    gap: 6px;
    padding: 0 12px;
    height: 32px;
    min-width: 96px;
    font-size: ${tokens.fontSizeBase300};
    font-weight: ${tokens.fontWeightSemibold};
    line-height: ${tokens.lineHeightBase300};
  }

  :host([size='medium']) .base.icon-only {
    padding: 0;
    min-width: 32px;
    max-width: 32px;
  }
`;

export const largeButtonStyles = css`
  :host([size='large']) .base {
    --button-border-radius: ${tokens.borderRadiusLarge};
    gap: 6px;
    padding: 0 16px;
    height: 40px;
    min-width: 96px;
    font-size: ${tokens.fontSizeBase300};
    font-weight: ${tokens.fontWeightSemibold};
    line-height: ${tokens.lineHeightBase300};
  }

  :host([size='large']) slot > svg,
  :host([size='large']) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host([size='large']) .base.icon-only {
    padding: 0;
    min-width: 40px;
    max-width: 40px;
  }
`;
