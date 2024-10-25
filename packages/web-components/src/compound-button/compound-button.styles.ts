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
import { state } from '../utils/states.js';

// Need to support icon hover styles
export const styles = css`
  ${ButtonStyles}

  :host,
  :host(:is([size])) {
    gap: 12px;
    height: auto;
    padding-top: 14px;
    padding-inline: 12px;
    padding-bottom: 16px;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  .content {
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  ::slotted([slot='description']) {
    color: ${colorNeutralForeground2};
    line-height: 100%;
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
  }

  ::slotted(svg),
  :host(${state('large')}) ::slotted(svg) {
    font-size: 40px;
    height: 40px;
    width: 40px;
  }

  :host(:hover) ::slotted([slot='description']) {
    color: ${colorNeutralForeground2Hover};
  }

  :host(:active) ::slotted([slot='description']) {
    color: ${colorNeutralForeground2Pressed};
  }

  :host(:is(${state('primary')}, ${state('primary')}:hover, ${state('primary')}:active))
    ::slotted([slot='description']) {
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(:is(${state('subtle')}, ${state('subtle')}:hover, ${state('subtle')}:active)) ::slotted([slot='description']),
  :host(${state('transparent')}) ::slotted([slot='description']) {
    color: ${colorNeutralForeground2};
  }

  :host(${state('transparent')}:hover) ::slotted([slot='description']) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host(${state('transparent')}:active) ::slotted([slot='description']) {
    color: ${colorNeutralForeground2BrandPressed};
  }

  :host(:is(:disabled, :disabled[appearance], [disabled-focusable], [disabled-focusable][appearance]))
    ::slotted([slot='description']) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host(${state('small')}) {
    padding: 8px;
    padding-bottom: 10px;
  }

  :host(${state('icon')}) {
    min-width: 52px;
    max-width: 52px;
    padding: ${spacingHorizontalSNudge};
  }

  :host(${state('icon')}${state('small')}) {
    min-width: 48px;
    max-width: 48px;
    padding: ${spacingHorizontalXS};
  }

  :host(${state('icon')}${state('large')}) {
    min-width: 56px;
    max-width: 56px;
    padding: ${spacingHorizontalS};
  }

  :host(${state('large')}) {
    padding-top: 18px;
    padding-inline: 16px;
    padding-bottom: 20px;
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host(${state('large')}) ::slotted([slot='description']) {
    font-size: ${fontSizeBase300};
  }
`;
