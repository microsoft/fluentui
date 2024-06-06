import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalM,
  spacingVerticalS,
  spacingVerticalXXS,
  strokeWidthThick,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/**
 * Selector for the `disabled` state.
 * @public
 */
const disabledState = css.partial`:is([state--disabled], :state(disabled))`;

/**
 * Selector for the `focus-visible` state.
 * @public
 */
const focusVisibleState = css.partial`:is([state--focus-visible], :state(focus-visible))`;

/**
 * Selector for the `bad-input` state.
 * @public
 */
const badInputState = css.partial`:is([state--badInput], :state(badInput))`;

/**
 * Selector for the `custom-error` state.
 * @public
 */
const customErrorState = css.partial`:is([state--customError], :state(customError))`;

/**
 * Selector for the `pattern-mismatch` state.
 * @public
 */
const patternMismatchState = css.partial`:is([state--patternMismatch], :state(patternMismatch))`;

/**
 * Selector for the `range-overflow` state.
 * @public
 */
const rangeOverflowState = css.partial`:is([state--rangeOverflow], :state(rangeOverflow))`;

/**
 * Selector for the `range-underflow` state.
 * @public
 */
const rangeUnderflowState = css.partial`:is([state--rangeUnderflow], :state(rangeUnderflow))`;

/**
 * Selector for the `step-mismatch` state.
 * @public
 */
const stepMismatchState = css.partial`:is([state--stepMismatch], :state(stepMismatch))`;

/**
 * Selector for the `too-long` state.
 * @public
 */
const tooLongState = css.partial`:is([state--tooLong], :state(tooLong))`;

/**
 * Selector for the `too-short` state.
 * @public
 */
const tooShortState = css.partial`:is([state--tooShort], :state(tooShort))`;

/**
 * Selector for the `type-mismatch` state.
 * @public
 */
const typeMismatchState = css.partial`:is([state--typeMismatch], :state(typeMismatch))`;

/**
 * Selector for the `valid` state.
 * @public
 */
const validState = css.partial`:is([state-valid], :state(valid))`;

/**
 * Selector for the `value-missing` state.
 * @public
 */
const valueMissingState = css.partial`:is([state--valueMissing], :state(valueMissing))`;

/**
 * The styles for the {@link Field} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    align-items: center;
    cursor: pointer;
    gap: 0 ${spacingHorizontalM};
    justify-items: start;
    padding: ${spacingVerticalS};
  }

  :has([slot='message']) {
    color: ${colorNeutralForeground1};
    row-gap: ${spacingVerticalS};
  }

  :not(::slotted([slot='label'])) {
    gap: 0;
  }

  :host([label-position='before']) {
    grid-template-areas: 'label input' 'label message';
  }

  :host([label-position='after']) {
    gap: 0;
    grid-template-areas: 'input label' 'message message';
    grid-template-columns: auto 1fr;
  }

  :host([label-position='after']) ::slotted([slot='input']) {
    margin-inline-end: ${spacingHorizontalM};
  }

  :host([label-position='above']) {
    grid-template-areas: 'label' 'input' 'message';
    row-gap: ${spacingVerticalXXS};
  }

  :host([label-position='below']) {
    grid-template-areas: 'input' 'label' 'message';
  }

  ::slotted([slot='label']) {
    cursor: pointer;
    grid-area: label;
  }

  ::slotted([slot='input']) {
    grid-area: input;
  }

  ::slotted([slot='message']) {
    margin-block-start: ${spacingVerticalXXS};
    grid-area: message;
  }

  :host(${focusVisibleState}:focus-within) {
    border-radius: ${borderRadiusMedium};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  ::slotted(label) {
    display: inline-flex;
    color: ${colorNeutralForeground1};
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    user-select: none;
  }

  :host([size='small']) ::slotted(label) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host([size='large']) ::slotted(label) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host([size='large']) ::slotted(label),
  :host([weight='semibold']) ::slotted(label) {
    font-weight: ${fontWeightSemibold};
  }

  :host(${disabledState}) ::slotted(label) {
    color: ${colorNeutralForeground1};
    cursor: default;
  }

  ::slotted([flag]) {
    display: none;
  }

  :host(${badInputState}) ::slotted([flag='badInput']),
  :host(${customErrorState}) ::slotted([flag='customError']),
  :host(${patternMismatchState}) ::slotted([flag='patternMismatch']),
  :host(${rangeOverflowState}) ::slotted([flag='rangeOverflow']),
  :host(${rangeUnderflowState}) ::slotted([flag='rangeUnderflow']),
  :host(${stepMismatchState}) ::slotted([flag='stepMismatch']),
  :host(${tooLongState}) ::slotted([flag='tooLong']),
  :host(${tooShortState}) ::slotted([flag='tooShort']),
  :host(${typeMismatchState}) ::slotted([flag='typeMismatch']),
  :host(${valueMissingState}) ::slotted([flag='valueMissing']),
  :host(${validState}) ::slotted([flag='valid']) {
    display: block;
  }
`;
