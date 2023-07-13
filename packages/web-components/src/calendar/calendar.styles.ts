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
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline')}
  :host {
    display: block;
    width: 248px;
    height: 285px;
    color: ${colorNeutralForeground3};
    padding: ${spacingHorizontalM};
    outline: solid black;
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
  }
  :host .day:not(.today, .selected):hover {
    background: #eff6fc;
    color: ${colorNeutralForeground2};
  }
  :host .day:not(.today):active {
    background: ${colorBrandStroke2};
    color: ${colorNeutralForeground2};
  }
  :host .title {
    position: inline;
    padding: ${spacingHorizontalM};
    text-align: left;
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
    border-radius: 4px;
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
    color: ${colorNeutralForegroundDisabled};
  }
  :host .day.disabled {
    background: var(--disabled-day-background);
    color: var(--disabled-day-color);
    cursor: var(--disabled-cursor);
    opacity: var(--disabled-day-opacity);
    outline: var(--disabled-day-outline);
  }
  :host .day.selected {
    color: ${colorNeutralForeground2};
    background: ${colorBrandStroke2};
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
    border-radius: 50%;
  }
  :host .today.inactive .date {
    background: transparent;
    color: inherit;
    width: auto;
  }
  :host .navicon-container {
    display: flex;
  }
  :host .navicon-left,
  .navicon-right {
    padding: ${spacingVerticalXS};
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin: auto 0;
  }
  :host .header {
    width: 248px;
    height: 41px;
    display: flex;
    justify-content: space-between;
  }
  :host .slotted-link {
    height: 20px;
    cursor: pointer;
    margin: ${spacingVerticalM} 0;
    margin-right: 8px;
  }
  :host .footer {
    display: flex;
    justify-content: flex-end;
  }
`;
