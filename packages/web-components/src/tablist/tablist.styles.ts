import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusCircular,
  colorCompoundBrandForeground1Hover,
  colorCompoundBrandStroke,
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
  spacingHorizontalM,
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
    --tabPaddingInline: ${spacingHorizontalMNudge};
    --tabPaddingBlock: ${spacingHorizontalM};
    --tabIndicatorInsetInline: var(--tabPaddingInline);
    --tabIndicatorInsetBlock: 0;
    box-sizing: border-box;
    color: ${colorNeutralForeground2};
    flex-direction: row;
    position: relative;
  }

  :host([size='small']) {
    --tabPaddingBlock: ${spacingVerticalSNudge};
    --tabPaddingInline: ${spacingHorizontalSNudge};
  }

  :host([size='large']) {
    --tabPaddingBlock: ${spacingVerticalL};
    --tabPaddingInline: ${spacingHorizontalMNudge};
  }

  :host([orientation='vertical']) {
    --tabPaddingBlock: ${spacingVerticalS};
    --tabIndicatorInsetBlock: ${spacingVerticalS};
    flex-direction: column;
  }

  :host([orientation='vertical'][size='small']) {
    --tabPaddingBlock: ${spacingVerticalXXS};
    --tabIndicatorInsetBlock: ${spacingVerticalSNudge};
  }

  :host([orientation='vertical'][size='large']) {
    --tabPaddingBlock: ${spacingVerticalS};
    --tabIndicatorInsetBlock: ${spacingVerticalMNudge};
  }

  ::slotted([slot='tab']) {
    padding-inline: var(--tabPaddingInline);
    padding-block: var(--tabPaddingBlock);
  }

  :host([orientation='vertical']) ::slotted([role='tab']) {
    justify-content: flex-start;
  }

  :host ::slotted([slot='tab'])::after {
    height: ${strokeWidthThicker};
    margin-block-start: auto;
  }

  :host([orientation='vertical']) ::slotted([slot='tab'])::after {
    width: ${strokeWidthThicker};
    height: unset;
    margin-block-start: unset;
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

  :host([size='small']) ::slotted([slot='tab']) {
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host([size='large']) ::slotted([slot='tab']) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  /* horizontal spacing for indicator */
  :host ::slotted([slot='tab'])::after,
  :host ::slotted([slot='tab'])::before,
  :host ::slotted([slot='tab']:hover)::after {
    inset-inline: var(--tabIndicatorInsetInline);
  }

  :host([orientation='vertical']) ::slotted([slot='tab'])::after,
  :host([orientation='vertical']) ::slotted([slot='tab'])::before,
  :host([orientation='vertical']) ::slotted([slot='tab']:hover)::after {
    inset-inline: 0;
    inset-block: var(--tabIndicatorInsetBlock);
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

  /*
   * TODO: Remove '(text-size-adjust: auto)' after this bug is fixed:
   * https://bugs.webkit.org/show_bug.cgi?id=298646
   * Also remove the same trick from tab.styles.ts.
   * Using '@supports (text-size-adjust: auto)' here to exclude Safari 26 from
   * using CSS Anchor Positioning here because it crashes.
   */
  @supports (anchor-name: --a) and (text-size-adjust: auto) {
    ::slotted([slot='tab'][aria-selected='true']) {
      anchor-name: --tab;
    }

    :host::after {
      background-color: ${colorCompoundBrandStroke};
      content: '';
      inline-size: 100%;
      inset: auto auto anchor(end) anchor(center);
      position: absolute;
      position-anchor: --tab;
      transform: translateX(-50%);
      transition-property: inset-inline, width;
      transition-duration: ${durationSlow};
      transition-timing-function: ${curveDecelerateMax};
      z-index: 3;

      /* These styles should be in sync with tab.styles.ts’s :host::after */
      border-radius: ${borderRadiusCircular};
      width: calc(anchor-size() - var(--tabIndicatorInsetInline) * 2);
      height: ${strokeWidthThicker};
    }

    :host([orientation='vertical'])::after {
      inset: anchor(center) anchor(end) auto 0;
      transform: translateY(-50%);
      transition-property: inset-block, height;

      /* These styles should be in sync with #vertical-tab-highlight above */
      width: ${strokeWidthThicker};
      height: calc(anchor-size() - var(--tabIndicatorInsetBlock) * 2);
    }

    :host(:dir(rtl)[orientation='vertical'])::after {
      inset: anchor(center) anchor(start) auto 0;
    }

    :host([disabled])::after {
      background-color: ${colorNeutralForegroundDisabled};
    }
  }
`;
