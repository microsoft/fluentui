import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBrandBackground,
  colorBrandBackground2,
  colorBrandStroke1,
  colorBrandStroke2,
  colorCompoundBrandBackground,
  colorNeutralBackground1,
  colorNeutralBackground4,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline')}
  :host {
    --cell-border: none;
    --cell-height: calc(var(--height-number) * 1px);
    --selected-day-outline: 1px solid var(--accent-foreground-active);
    --selected-day-color: var(--accent-foreground-active);
    --selected-day-background: var(--neutral-fill-rest);
    --cell-padding: calc(var(--design-unit) * 1px);
    --disabled-day-opacity: var(--disabled-opacity);
    --inactive-day-opacity: var(--disabled-opacity);
    display: block;
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    width: 248px;
    height: 285px;
    color: ${colorNeutralForeground3};
    padding: 12px;
  }
  :host .title {
    font-size: var(--type-ramp-plus3-font-size);
    line-height: var(--type-ramp-plus3-line-height);
    padding: var(--cell-padding);
    text-align: center;
  }
  :host .week-days,
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-left: var(--cell-border, none);
    border-bottom: none;
    padding: 0;
  }
  :host .interact .week {
    grid-gap: calc(var(--design-unit) * 1px);
    margin-top: calc(var(--design-unit) * 1px);
  }
  :host .day,
  .week-day {
    border-bottom: var(--cell-border);
    border-right: var(--cell-border);
    padding: var(--cell-padding);
  }
  :host .week-day {
    text-align: center;
    border-radius: 0;
    border-top: var(--cell-border);
    color: ${colorNeutralForeground3};
  }
  :host .day {
    box-sizing: border-box;
    vertical-align: top;
    outline-offset: -1px;
    line-height: 32px;
    white-space: normal;
    width: 32px;
  }
  :host .interact .day {
    background: var(--neutral-fill-rest);
    cursor: pointer;
  }
  :host .day.inactive {
    background: var(--inactive-day-background);
    color: var(--inactive-day-color);
    opacity: var(--inactive-day-opacity);
    outline: var(--inactive-day-outline);
  }
  :host .day.disabled {
    background: var(--disabled-day-background);
    color: var(--disabled-day-color);
    cursor: var(--disabled-cursor);
    opacity: var(--disabled-day-opacity);
    outline: var(--disabled-day-outline);
  }
  :host .day.selected {
    color: var(--selected-day-color);
    background: var(--selected-day-background);
    outline: var(--selected-day-outline);
  }
  :host .date {
    text-align: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  :host .interact .today,
  .today {
    color: ${colorNeutralForegroundInverted};
    background: ${colorCompoundBrandBackground};
  }
  :host .today.inactive .date {
    background: transparent;
    color: inherit;
    width: auto;
  }
`;
