import { css, ElementStyles } from "@microsoft/fast-element";
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillRest,
  baseHeightMultiplier,
  bodyFont,
  controlCornerRadius,
  density,
  designUnit,
  fillColor,
  foregroundOnAccentRest,
  neutralForegroundHint,
  neutralForegroundRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';
import { DirectionalStyleSheetBehavior, heightNumber } from '../styles';

/**
 * LTR styles for calendar
 * @internal
 */
const ltrStyles = css`
.selected + .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
  padding-left: calc(var(--calendar-gap) + (${strokeWidth} + ${controlCornerRadius}) * 1px);
  margin-left: calc((${controlCornerRadius} * -1px) - var(--calendar-gap));
}

.day.disabled::before {
  transform: translate(-50%, 0) rotate(45deg);
}
`;

/**
 * RTL styles for calendar
 * @internal
 */
const rtlStyles = css`
.selected + .selected {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-width: 0;
  padding-right: calc(var(--calendar-gap) + (${strokeWidth} + ${controlCornerRadius}) * 1px);
  margin-right: calc((${controlCornerRadius} * -1px) - var(--calendar-gap));
}

.day.disabled::before {
  transform: translate(50%, 0) rotate(-45deg);
}
`;

/**
 * Styles for calendar
 * @public
 */
export const calendarStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => css`
${display("inline-block")} :host {
  --calendar-cell-size: calc((${baseHeightMultiplier} + 2 + ${density}) * ${designUnit} * 1px);
  --calendar-gap: calc(${designUnit} * .5px);
  font-family: ${bodyFont};
  font-size: ${typeRampBaseFontSize};
  line-height: ${typeRampBaseLineHeight};
  color: ${neutralForegroundRest};
}

.title {
  padding: calc(${designUnit} * 2px);
  font-weight: 600;
}

.days {
  text-align: center;
}

.week-days,
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: var(--calendar-gap);
  border: 0;
  padding: 0;
}

.day,
.week-day {
  border: 0;
  width: var(--calendar-cell-size);
  height: var(--calendar-cell-size);
  line-height: var(--calendar-cell-size);
}

.week-day {
  font-weight: 600;
}

.day {
  border: calc(${strokeWidth} * 1px) solid transparent;
  border-radius: calc(${controlCornerRadius} * 1px);
}

.interact .day {
  cursor: pointer;
}

.date {
  height: 100%;
}

.inactive .date,
.inactive.disabled::before {
  color: ${neutralForegroundHint};
}

.disabled::before {
  content: '';
  display: inline-block;
  width: calc(var(--calendar-cell-size) * .8);
  height: calc(${strokeWidth} * 1px);
  background: currentColor;
  position: absolute;
  margin-top: calc(var(--calendar-cell-size) / 2);
  transform-origin: center;
  z-index: 1;
}

.selected {
  color: ${accentFillRest};
  border: 1px solid ${accentFillRest};
  background: ${fillColor};
}

.today.disabled::before {
  color: ${foregroundOnAccentRest};
}

.today .date {
  color: ${foregroundOnAccentRest};
  background: ${accentFillRest};
  border-radius: 50%;
  position: relative;
}
`.withBehaviors(
  forcedColorsStylesheetBehavior(
      css`
          .day.selected {
              color: ${SystemColors.Highlight};
          }

          .today .date {
              background: ${SystemColors.Highlight};
              color: ${SystemColors.HighlightText};
          }
      `
  ),
  new DirectionalStyleSheetBehavior(ltrStyles, rtlStyles)
);
