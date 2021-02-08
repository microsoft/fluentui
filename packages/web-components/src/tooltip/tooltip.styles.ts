import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  elevation,
  neutralContrastFillRestBehavior,
  neutralContrastForegroundRestBehavior,
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
    --elevation: 11;
    position: relative;
    contain: layout;
    overflow: visible;
    height: 0;
    width: 0;
    z-index: 10000;
  }

  .tooltip {
    box-sizing: border-box;
    border-radius: calc(var(--corner-radius) * 1px);
    border: calc(var(--outline-width) * 1px) solid transparent;
    background: ${neutralContrastFillRestBehavior.var};
    color: ${neutralContrastForegroundRestBehavior.var};
    padding: 4px 12px;
    height: fit-content;
    width: fit-content;
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    white-space: nowrap;
    ${elevation}
  }

  fluent-anchored-region {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    flex-direction: row;
  }

  fluent-anchored-region.right,
  fluent-anchored-region.left {
    flex-direction: column;
  }

  fluent-anchored-region.top .tooltip::after,
  fluent-anchored-region.bottom .tooltip::after,
  fluent-anchored-region.left .tooltip::after,
  fluent-anchored-region.right .tooltip::after {
    content: '';
    width: 12px;
    height: 12px;
    background: ${neutralForegroundRestBehavior.var};
    border-radius: calc(var(--corner-radius) * 1px);
    position: absolute;
  }

  fluent-anchored-region.top .tooltip::after {
    transform: rotate(45deg) translateX(-50%);
    bottom: 4px;
    left: 50%;
  }

  fluent-anchored-region.top .tooltip {
    margin-bottom: 12px;
  }

  fluent-anchored-region.bottom .tooltip::after {
    transform: rotate(45deg) translateX(-50%);
    top: 12px;
    left: 50%;
  }

  fluent-anchored-region.bottom .tooltip {
    margin-top: 12px;
  }

  fluent-anchored-region.left .tooltip::after {
    transform: rotate(45deg) translateY(-50%);
    top: 50%;
    right: 12px;
  }

  fluent-anchored-region.left .tooltip {
    margin-right: 12px;
  }

  fluent-anchored-region.right .tooltip::after {
    transform: rotate(45deg) translateY(-50%);
    top: 50%;
    left: 4px;
  }

  fluent-anchored-region.right .tooltip {
    margin-left: 12px;
  }
`.withBehaviors(
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  neutralContrastFillRestBehavior,
  neutralContrastForegroundRestBehavior,
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
      fluent-anchored-region.top .tooltip::after,
      fluent-anchored-region.bottom .tooltip::after,
      fluent-anchored-region.left .tooltip::after,
      fluent-anchored-region.right .tooltip::after {
        content: '';
        width: unset;
        height: unset;
      }
    `,
  ),
);
