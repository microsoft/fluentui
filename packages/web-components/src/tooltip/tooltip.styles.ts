import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  neutralFillHoverBehavior,
  neutralFillInputActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFillRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineRestBehavior,
} from '../styles/index';

export const TooltipStyles = css`
  :host {
    contain: layout;
    overflow: visible;
    height: 0;
    width: 0;
    margin-top: 10px;
  }

  .tooltip {
    position: relative;
    box-sizing: border-box;
    border-radius: calc(var(--corner-radius) * 1px);
    border: calc(var(--outline-width) * 1px) solid transparent;
    background: #424242;
    color: #ffffff;
    padding: 4px;
    height: fit-content;
    width: fit-content;
    font-family: var(--body-font);
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-line-height);
    white-space: nowrap;
    // TODO: a mechanism to manage z-index across components
    // https://github.com/microsoft/fast/issues/3813
    z-index: 10000;
    margin-top: 10px;
  }

  fast-anchored-region {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }

  :host([position='top']) fast-anchored-region,
  :host([position='bottom']) fast-anchored-region {
    flex-direction: row;
  }

  :host([position='right']) fast-anchored-region,
  :host([position='left']) fast-anchored-region {
    flex-direction: column;
  }

  :host([position='top']) .tooltip {
    margin-bottom: 10px;
  }

  :host([position='top']) .tooltip::after {
    content: '';
    width: 12px;
    height: 12px;
    background: #424242;
    border-radius: calc(var(--corner-radius) * 1px);
    position: absolute;
    transform: rotate(45deg);
    bottom: -6px;
    left: 50%;
  }

  :host([position='bottom']) .tooltip {
    margin-top: 10px;
  }

  :host([position='bottom']) .tooltip::after {
    content: '';
    width: 12px;
    height: 12px;
    background: #424242;
    border-radius: calc(var(--corner-radius) * 1px);
    position: absolute;
    transform: rotate(45deg) translate(50%, 50%);
    top: -14px;
    left: 50%;
  }

  :host([position='left']) .tooltip {
    margin-right: 4px;
  }

  :host([position='right']) .tooltip {
    margin-left: 4px;
  }
`.withBehaviors(
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  neutralFillHoverBehavior,
  neutralFillInputActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFillRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host([disabled]) {
        opacity: 1;
      }
    `,
  ),
);
