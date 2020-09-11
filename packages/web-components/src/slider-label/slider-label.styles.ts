import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { heightNumber, neutralOutlineRestBehavior } from '../styles';

export const SliderLabelStyles = css`
  ${display('block')} :host {
  }
  .root {
    position: absolute;
    display: grid;
  }
  :host(.horizontal) {
    align-self: start;
    grid-row: 2;
    margin-top: -2px;
  }
  :host(.vertical) {
    justify-self: start;
    grid-column: 2;
    margin-left: 2px;
  }
  .container {
    display: grid;
    justify-self: center;
  }
  :host(.horizontal) .container {
    grid-template-rows: auto auto;
    grid-template-columns: 0;
  }
  :host(.vertical) .container {
    grid-template-columns: auto auto;
    grid-template-rows: 0;
    min-width: calc(var(--thumb-size) * 1px);
    height: calc(var(--thumb-size) * 1px);
  }
  .label {
    justify-self: center;
    align-self: center;
    white-space: nowrap;
    max-width: 30px;
    margin: 2px 0;
  }
  .mark {
    width: calc((var(--design-unit) / 2) * 1px);
    height: calc(${heightNumber} * 0.25 * 1px);
    background: ${neutralOutlineRestBehavior.var};
    justify-self: center;
  }
  :host(.vertical) .mark {
    transform: rotate(90deg);
    align-self: center;
  }
  :host(.vertical) .label {
    margin-left: calc((var(--design-unit) / 2) * 2px);
    align-self: center;
  }
  :host(.disabled) {
    opacity: var(--disabled-opacity);
  }
`.withBehaviors(
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      .mark {
        forced-color-adjust: none;
        background: ${SystemColors.FieldText};
      }
      :host(.disabled) {
        forced-color-adjust: none;
        opacity: 1;
      }
      :host(.disabled) .label {
        color: ${SystemColors.GrayText};
      }
      :host(.disabled) .mark {
        background: ${SystemColors.GrayText};
      }
    `,
  ),
);
