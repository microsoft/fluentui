import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokePressed,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorTransparentBackground,
  colorTransparentStroke,
  colorTransparentStrokeInteractive,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow2,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** TextInput styles
 * @public
 */
export const styles = css`
  ${display('block')}

  :host {
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    font-weight: var(${fontWeightRegular});
    line-height: var(${lineHeightBase300});
    max-width: 400px;
  }
  .label {
    display: flex;
    color: var(${colorNeutralForeground1});
    padding-bottom: var(${spacingVerticalXS});
    flex-shrink: 0;
    padding-inline-end: var(${spacingHorizontalXS});
  }
  .label__hidden {
    display: none;
  }
  .root {
    position: relative;
    box-sizing: border-box;
    height: 32px;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 0 var(${spacingHorizontalMNudge});
    border: var(${strokeWidthThin}) solid var(${colorNeutralStroke1});
    border-bottom-color: var(${colorNeutralStrokeAccessible});
    border-radius: var(${borderRadiusMedium});
    gap: var(${spacingHorizontalXXS});
  }
  .root::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: -1px;
    bottom: 0px;
    right: -1px;
    height: max(2px, var(${borderRadiusMedium}));
    border-radius: 0 0 var(${borderRadiusMedium}) var(${borderRadiusMedium});
    border-bottom: 2px solid var(${colorCompoundBrandStroke});
    clip-path: inset(calc(100% - 2px) 1px 0px);
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: var(${durationUltraFast});
    transition-delay: var(${curveAccelerateMid});
  }
  .control {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: var(${colorNeutralForeground1});
    border-radius: var(${borderRadiusMedium});
    background: var(${colorTransparentBackground});
    font-family: var(${fontFamilyBase});
    font-weight: var(${fontWeightRegular});
    font-size: var(${fontSizeBase300});
    border: none;
    background: transparent;
    vertical-align: center;
  }
  .control:focus-visible {
    outline: 0;
    border: 0;
  }
  .control::placeholder {
    color: var(${colorNeutralForeground4});
  }
  :host ::slotted([slot='start']),
  :host ::slotted([slot='end']) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(${colorNeutralForeground3});
    font-size: var(${fontSizeBase500});
  }
  :host ::slotted([slot='start']) {
    padding-right: var(${spacingHorizontalXXS});
  }
  :host ::slotted([slot='end']) {
    padding-left: var(${spacingHorizontalXXS});
    gap: var(${spacingHorizontalXS});
  }
  :host(:hover) .root {
    border-color: var(${colorNeutralStroke1Hover});
    border-bottom-color: var(${colorNeutralStrokeAccessibleHover});
  }
  :host(:active) .root {
    border-color: var(${colorNeutralStroke1Pressed});
  }
  :host(:focus-within) .root {
    outline: transparent solid 2px;
    border-bottom: 0;
  }
  :host(:focus-within) .root::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: var(${durationNormal});
    transition-delay: var(${curveDecelerateMid});
  }
  :host(:focus-within:active) .root:after {
    border-bottom-color: var(${colorCompoundBrandStrokePressed});
  }
  :host([appearance='outline']:focus-within) .root {
    border: var(${strokeWidthThin} solid var(${colorNeutralStroke1});
  }
  :host(:focus-within) .control {
    color: var(${colorNeutralForeground1});
  }
  :host([disabled]) .root {
    background: var(${colorTransparentBackground});
    border: var(${strokeWidthThin}) solid var(${colorNeutralStrokeDisabled});
  }
  :host([disabled]) .control::placeholder,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']) {
    color: var(${colorNeutralForegroundDisabled});
  }
  ::selection {
    color: var(${colorNeutralForegroundInverted});
    background-color: var(${colorNeutralBackgroundInverted});
  }
  :host([control-size='small']) .control {
    font-size: var(${fontSizeBase200});
    font-weight: var(${fontWeightRegular});
    line-height: var(${lineHeightBase200});
  }
  :host([control-size='small']) .root {
    height: 24px;
    gap: var(${spacingHorizontalXXS});
    padding: 0 var(${spacingHorizontalSNudge});
  }
  :host([control-size='small']) ::slotted([slot='start']),
  :host([control-size='small']) ::slotted([slot='end']) {
    font-size: var(${fontSizeBase400});
  }
  :host([control-size='large']) .control {
    font-size: var(${fontSizeBase400});
    font-weight: var(${fontWeightRegular});
    line-height: var(${lineHeightBase400});
  }
  :host([control-size='large']) .root {
    height: 40px;
    gap: var(${spacingHorizontalS});
    padding: 0 var(${spacingHorizontalM});
  }
  :host([control-size='large']) ::slotted([slot='start']),
  :host([control-size='large']) ::slotted([slot='end']) {
    font-size: var(${fontSizeBase600});
  }
  :host([appearance='underline']) .root {
    background: var(${colorTransparentBackground});
    border: 0;
    border-radius: 0;
    border-bottom: var(${strokeWidthThin}) solid var(${colorNeutralStrokeAccessible});
  }
  :host([appearance='underline']:hover) .root {
    border-bottom-color: var(${colorNeutralStrokeAccessibleHover});
  }
  :host([appearance='underline']:active) .root {
    border-bottom-color: var(${colorNeutralStrokeAccessiblePressed});
  }
  :host([appearance='underline']:focus-within) .root {
    border: 0;
    border-bottom-color: var(${colorNeutralStrokeAccessiblePressed});
  }
  :host([appearance='underline'][disabled]) .root {
    border-bottom-color: var(${colorNeutralStrokeDisabled});
  }
  :host([appearance='filled-lighter']) .root,
  :host([appearance='filled-darker']) .root {
    border: var(${strokeWidthThin}) solid var(${colorTransparentStroke});
    box-shadow: var(${shadow2});
  }
  :host([appearance='filled-lighter']) .root {
    background: var(${colorNeutralBackground1});
  }
  :host([appearance='filled-darker']) .root {
    background: var(${colorNeutralBackground3});
  }
  :host([appearance='filled-lighter']:hover) .root,
  :host([appearance='filled-darker']:hover) .root {
    border-color: var(${colorTransparentStrokeInteractive});
  }
  :host([appearance='filled-lighter']:active) .root,
  :host([appearance='filled-darker']:active) .root {
    border-color: var(${colorTransparentStrokeInteractive});
    background: var(${colorNeutralBackground3});
  }
`;
