import { css } from '@microsoft/fast-element';
import {
  badInputState,
  customErrorState,
  disabledState,
  focusVisibleState,
  hasMessageState,
  patternMismatchState,
  rangeOverflowState,
  rangeUnderflowState,
  stepMismatchState,
  tooLongState,
  tooShortState,
  typeMismatchState,
  validState,
  valueMissingState,
} from '../styles/states/index.js';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorStrokeFocus2,
  spacingHorizontalM,
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXXS,
  strokeWidthThick,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import { ValidationFlags } from './field.options.js';

/**
 * The styles for the {@link Field} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    color: ${colorNeutralForeground1};
    align-items: center;
    gap: 0 ${spacingHorizontalM};
    justify-items: start;
    position: relative;
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
    justify-items: center;
  }

  :host([label-position='below']) ::slotted([slot='label']) {
    margin-block-start: ${spacingVerticalM};
  }

  :host([label-position='below']:not(${hasMessageState})) {
    grid-template-areas: 'input' 'label';
  }

  ::slotted(label[slot='label'])::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
  }

  ::slotted([slot='input']) {
    grid-area: input;
    position: relative;
    z-index: 1;
  }

  ::slotted([slot='message']) {
    margin-block-start: ${spacingVerticalXXS};
    grid-area: message;
  }

  :host(${focusVisibleState}:focus-within) {
    border-radius: ${borderRadiusMedium};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  ::slotted(label),
  ::slotted([slot='label']) {
    cursor: inherit;
    grid-area: label;
    user-select: none;
  }

  :host(${disabledState}) {
    cursor: default;
  }

  ::slotted([flag]) {
    display: none;
  }

  :host(${badInputState}) ::slotted([flag='${ValidationFlags.badInput}']),
  :host(${customErrorState}) ::slotted([flag='${ValidationFlags.customError}']),
  :host(${patternMismatchState}) ::slotted([flag='${ValidationFlags.patternMismatch}']),
  :host(${rangeOverflowState}) ::slotted([flag='${ValidationFlags.rangeOverflow}']),
  :host(${rangeUnderflowState}) ::slotted([flag='${ValidationFlags.rangeUnderflow}']),
  :host(${stepMismatchState}) ::slotted([flag='${ValidationFlags.stepMismatch}']),
  :host(${tooLongState}) ::slotted([flag='${ValidationFlags.tooLong}']),
  :host(${tooShortState}) ::slotted([flag='${ValidationFlags.tooShort}']),
  :host(${typeMismatchState}) ::slotted([flag='${ValidationFlags.typeMismatch}']),
  :host(${valueMissingState}) ::slotted([flag='${ValidationFlags.valueMissing}']),
  :host(${validState}) ::slotted([flag='${ValidationFlags.valid}']) {
    display: block;
  }
`;
