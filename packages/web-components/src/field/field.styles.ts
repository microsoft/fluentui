import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForegroundDisabled,
  colorStrokeFocus2,
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
 * Selector for the `valueMissing` state.
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
    padding: ${spacingVerticalS};
  }

  :has([slot='message']) {
    row-gap: ${spacingVerticalS};
  }

  :not(::slotted([slot='label'])) {
    gap: 0;
  }

  :host([label-position='before']) {
    grid-template-areas: 'label input' '_ message';
  }

  :host([label-position='after']) {
    grid-template-areas: 'input label' 'message message';
    grid-template-columns: min-content 1fr;
  }

  :host([label-position='above']) {
    grid-template-areas: 'label' 'input' 'message';
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
    grid-area: message;
  }

  :host(${focusVisibleState}:focus-within) {
    border-radius: ${borderRadiusMedium};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  :host(${disabledState}) {
    color: ${colorNeutralForegroundDisabled};
    cursor: default;
  }

  ::slotted([slot='message'][flag]) {
    visibility: hidden;
  }

  :host(${valueMissingState}) ::slotted([slot='message']) {
    margin-block-start: ${spacingVerticalXXS};
    visibility: visible;
  }
`;
