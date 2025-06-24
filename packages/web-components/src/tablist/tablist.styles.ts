import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
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

  :host([orientation='vertical']) {
    flex-direction: column;
  }

  :host([orientation='vertical']) ::slotted([role='tab']) {
    justify-content: flex-start;
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

  :host([orientation='vertical']) ::slotted([slot='tab'])::after {
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

  :host([orientation='vertical']) ::slotted([slot='tab'])::before,
  :host([orientation='vertical']) ::slotted([slot='tab'][aria-selected='false']:hover)::after {
    height: unset;
    width: ${strokeWidthThicker};
    margin-inline-end: auto;
    transform-origin: top;
  }

  :host(:where([size='small'], [size='large'])) ::slotted([slot='tab']) {
    padding-inline: var(--tabPaddingInline);
    padding-block: var(--tabPaddingBlock);
  }

  :host([size='small']) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalSNudge};
    --tabPaddingInline: ${spacingHorizontalSNudge};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host([size='large']) ::slotted([slot='tab']) {
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

  :host([size='small']) ::slotted([slot='tab']) {
    --tabIndicatorInsetInline: ${spacingHorizontalSNudge};
  }

  :host([size='large']) ::slotted([slot='tab']) {
    --tabIndicatorInsetInline: ${spacingHorizontalMNudge};
  }

  :host([orientation='vertical']) ::slotted([slot='tab']) {
    padding-block: var(--tabPaddingBlock);
  }

  :host([orientation='vertical']) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalS};
  }

  :host([orientation='vertical'][size='small']) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalXXS};
  }

  :host([orientation='vertical'][size='large']) ::slotted([slot='tab']) {
    --tabPaddingBlock: ${spacingVerticalS};
  }

  :host([orientation='vertical']) ::slotted([slot='tab'])::after,
  :host([orientation='vertical']) ::slotted([slot='tab'])::before,
  :host([orientation='vertical']) ::slotted([slot='tab']:hover)::after {
    inset-inline: 0;
    inset-block: var(--tabIndicatorInsetBlock);
  }

  :host([orientation='vertical']) {
    --tabIndicatorInsetBlock: ${spacingVerticalS};
  }

  :host([orientation='vertical'][size='small']) {
    --tabIndicatorInsetBlock: ${spacingVerticalSNudge};
  }

  :host([orientation='vertical'][size='large']) {
    --tabIndicatorInsetBlock: ${spacingVerticalMNudge};
  }

  /* disabled styles */
  :host([disabled]) {
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted([slot='tab']) {
    pointer-events: none;
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted([slot='tab']:after) {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted([slot='tab'][aria-selected='true'])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted([slot='tab']:hover):before {
    content: unset;
  }

  :host([appearance='subtle']) ::slotted([slot='tab']:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground1Hover};
    fill: ${colorCompoundBrandForeground1Hover};
  }

  :host([appearance='subtle']) ::slotted([slot='tab']:active) {
    background-color: ${colorSubtleBackgroundPressed};
    fill: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground1};
  }
`;
