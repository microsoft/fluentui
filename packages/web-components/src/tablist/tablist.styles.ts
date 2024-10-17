import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorCompoundBrandForeground1Hover,
  colorNeutralForeground1,
  colorNeutralForeground1Hover,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  curveDecelerateMax,
  durationSlow,
  fontSizeBase300,
  fontSizeBase400,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXXS,
  strokeWidthThicker,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';
/**
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    --tabPaddingInline: inherit;
    --tabPaddingBlock: inherit;
    --tabIndicatorInsetInline: 0;
    --tabIndicatorInsetBlock: 0;
    box-sizing: border-box;
    color: ${colorNeutralForeground2};
    flex-direction: row;
  }

  :host(${state('vertical')}) {
    flex-direction: column;
  }

  :host ::slotted([role='tab']) {
    align-items: flex-start;
  }

  /* indicator animation  */
  :host ::slotted([slot='tab'][data-animate='true'])::after {
    transition-property: transform;
    transition-duration: ${durationSlow};
    transition-timing-function: ${curveDecelerateMax};
  }

  :host ::slotted([slot='tab'])::after {
    height: ${strokeWidthThicker};
    margin-block-start: auto;
    transform-origin: left;
    transform: translateX(var(--tabIndicatorOffset)) scaleX(var(--tabIndicatorScale));
  }

  :host(${state('vertical')}) ::slotted([slot='tab'])::after {
    width: ${strokeWidthThicker};
    height: unset;
    margin-block-start: unset;
    transform-origin: top;
    transform: translateY(var(--tabIndicatorOffset)) scaleY(var(--tabIndicatorScale));
  }

  /* ::before adds a secondary indicator placeholder that appears right after click on the active tab */
  :host ::slotted([slot='tab'])::before {
    height: ${strokeWidthThicker};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset-inline: var(--tabIndicatorInsetInline);
    inset-block: var(--tabIndicatorInsetBlock);
    position: absolute;
    margin-top: auto;
  }

  :host ::slotted([slot='tab'])::before {
    inset-inline: var(--tabIndicatorInsetInline);
    inset-block: var(--tabIndicatorInsetBlock);
  }

  :host ::slotted([slot='tab'][aria-selected='true'])::before {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host ::slotted([slot='tab'][aria-selected='false']:hover)::after {
    height: ${strokeWidthThicker};
    margin-block-start: auto;
    transform-origin: left;
  }

  :host(${state('vertical')}) ::slotted([slot='tab'])::before,
  :host(${state('vertical')}) ::slotted([slot='tab'][aria-selected='false']:hover)::after {
    height: unset;
    width: ${strokeWidthThicker};
    margin-inline-end: auto;
    transform-origin: top;
  }

  :host(:where(${state('small')}, ${state('large')})) ::slotted([slot='tab']) {
    padding-inline: var(--tabPaddingInline);
    padding-block: var(--tabPaddingBlock);
  }

  :host(${state('small')}) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalSNudge};
    --tabPaddingInline: ${spacingHorizontalSNudge};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host(${state('large')}) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalL};
    --tabPaddingInline: ${spacingHorizontalMNudge};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  /* horizontal spacing for indicator */
  :host ::slotted([slot='tab'])::after,
  :host ::slotted([slot='tab'])::before,
  :host ::slotted([slot='tab']:hover)::after {
    inset-inline: var(--tabIndicatorInsetInline);
  }

  :host ::slotted([slot='tab']) {
    --tabIndicatorInsetInline: ${spacingHorizontalMNudge};
  }

  :host(${state('small')}) ::slotted([slot='tab']) {
    --tabIndicatorInsetInline: ${spacingHorizontalSNudge};
  }

  :host(${state('large')}) ::slotted([slot='tab']) {
    --tabIndicatorInsetInline: ${spacingHorizontalMNudge};
  }

  :host(${state('vertical')}) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalS};
    padding-block: var(--tabPaddingBlock);
  }

  :host(${state('vertical')}${state('small')}) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalXXS};
  }

  :host(${state('vertical')}${state('large')}) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalS};
  }

  :host(${state('vertical')}) ::slotted([slot='tab'])::after,
  :host(${state('vertical')}) ::slotted([slot='tab'])::before,
  :host(${state('vertical')}) ::slotted([slot='tab']:hover)::after {
    inset-inline: 0;
    inset-block: var(--tabIndicatorInsetBlock);
  }

  :host(${state('vertical')}) {
    --tabIndicatorInsetBlock: ${spacingVerticalS};
  }

  :host(${state('vertical')}${state('small')}) {
    --tabIndicatorInsetBlock: ${spacingVerticalSNudge};
  }

  :host(${state('vertical')}${state('large')}) {
    --tabIndicatorInsetBlock: ${spacingVerticalMNudge};
  }

  /* disabled styles */
  :host(${state('disabled')}) {
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
  }

  :host(${state('disabled')}) ::slotted([slot='tab']) {
    pointer-events: none;
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
  }

  :host(${state('disabled')}) ::slotted([slot='tab'])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host(${state('disabled')}) ::slotted([slot='tab'][aria-selected='true'])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host(${state('disabled')}) ::slotted([slot='tab']:hover):before {
    content: unset;
  }

  :host(${state('subtle')}) ::slotted([slot='tab']:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground1Hover};
    fill: ${colorCompoundBrandForeground1Hover};
  }

  :host(${state('subtle')}) ::slotted([slot='tab']:active) {
    background-color: ${colorSubtleBackgroundPressed};
    fill: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground1};
  }
`;
