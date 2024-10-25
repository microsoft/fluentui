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
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXXS,
  strokeWidthThick,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';
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

  :host([label-position='below']:not(${state('has-message')})) {
    grid-template-areas: 'input' 'label';
  }

  ::slotted([slot='label'])::after {
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

  :host(${state('focus-visible')}:focus-within) {
    border-radius: ${borderRadiusMedium};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  ::slotted(label),
  ::slotted([slot='label']) {
    cursor: inherit;
    display: inline-flex;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    grid-area: label;
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

  :host(${state('disabled')}) {
    cursor: default;
  }

  ::slotted([flag]) {
    display: none;
  }

  :host(${state(ValidationFlags.badInput)}) ::slotted([flag='${ValidationFlags.badInput}']),
  :host(${state(ValidationFlags.customError)}) ::slotted([flag='${ValidationFlags.customError}']),
  :host(${state(ValidationFlags.patternMismatch)}) ::slotted([flag='${ValidationFlags.patternMismatch}']),
  :host(${state(ValidationFlags.rangeOverflow)}) ::slotted([flag='${ValidationFlags.rangeOverflow}']),
  :host(${state(ValidationFlags.rangeUnderflow)}) ::slotted([flag='${ValidationFlags.rangeUnderflow}']),
  :host(${state(ValidationFlags.stepMismatch)}) ::slotted([flag='${ValidationFlags.stepMismatch}']),
  :host(${state(ValidationFlags.tooLong)}) ::slotted([flag='${ValidationFlags.tooLong}']),
  :host(${state(ValidationFlags.tooShort)}) ::slotted([flag='${ValidationFlags.tooShort}']),
  :host(${state(ValidationFlags.typeMismatch)}) ::slotted([flag='${ValidationFlags.typeMismatch}']),
  :host(${state(ValidationFlags.valueMissing)}) ::slotted([flag='${ValidationFlags.valueMissing}']),
  :host(${state(ValidationFlags.valid)}) ::slotted([flag='${ValidationFlags.valid}']) {
    display: block;
  }
`;
