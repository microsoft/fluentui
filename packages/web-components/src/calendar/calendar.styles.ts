import { css, ElementStyles } from "@microsoft/fast-element";
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillRest,
  bodyFont,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  foregroundOnAccentRest,
  neutralFillRest,
  neutralForegroundRest,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  typeRampPlus3FontSize,
  typeRampPlus3LineHeight
} from '../design-tokens';
import { heightNumber } from '../styles';

export const calendarStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => css`
${display("block")} :host {
  --cell-border: none;
  --cell-height: calc(${heightNumber} * 1px);
  --selected-day-background: ${neutralFillRest};
  --selected-day-color: ${neutralForegroundRest};
  --cell-padding: calc(${designUnit} * 1px);
  --disabled-day-opacity: ${disabledOpacity};
  --inactive-day-opacity: ${disabledOpacity};
  font-family: ${bodyFont};
  font-size: ${typeRampBaseFontSize};
  line-height: ${typeRampBaseLineHeight};
  color: ${neutralForegroundRest};
  width: 300px;
}

.title {
  font-size: ${typeRampPlus3FontSize};
  line-height: ${typeRampPlus3LineHeight};
  padding: var(--cell-padding);
  text-align: center;
}

.week-days,
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-left: var(--cell-border, none);
  border-bottom: none;
  padding: 0;
}

.day,
.week-day {
  border-bottom: var(--cell-border);
  border-right: var(--cell-border);
  padding: var(--cell-padding);
}

.week-day {
  text-align: center;
  border-top: var(--cell-border);
}

.day {
  box-sizing: border-box;
  vertical-align: top;
  outline-offset: -1px;
  line-height: var(--cell-line-height);
  white-space: normal;
  min-height: var(--cell-height);
  margin-bottom: calc(var(--design-unit) * 1px);
}

.interact .day {
  cursor: pointer;
}

.day.inactive {
  background: var(--inactive-day-background);
  color: var(--inactive-day-color);
  outline: var(--inactive-day-outline);
}

.day.inactive .date {
  opacity: var(--inactive-day-opacity);
}

.day.disabled {
  background: var(--disabled-day-background);
  color: var(--disabled-day-color);
  cursor: ${disabledCursor};
  outline: var(--disabled-day-outline);
}

.day.disabled .date {
  opacity: var(--disabled-day-opacity);
}

.selected {
  color: var(--selected-day-color);
  background: var(--selected-day-background);
  outline: var(--selected-day-outline);
}

.selected + .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: calc(${controlCornerRadius} - var(--strokeWidth));
  margin-left: calc(${controlCornerRadius} * -1px);
}

.selected + .selected:before {

}

.date {
  padding: var(--cell-padding);
  text-align: center;
  max-width: ${typeRampBaseLineHeight};
  margin: 0 auto;
}

.interact .today .date,
.today .date {
  color: ${foregroundOnAccentRest};
  background: ${accentFillRest};
  border-radius: 50%;
}

.today.inactive .date {
  background: transparent;
  color: inherit;
  width: auto;
}
`.withBehaviors(
  forcedColorsStylesheetBehavior(
      css`
          :host {
              --selected-day-outline: 1px solid ${SystemColors.Highlight};
          }

          .day,
          .week-day {
              background: ${SystemColors.Canvas};
              color: ${SystemColors.CanvasText};
              fill: currentcolor;
          }

          .day.selected {
              color: ${SystemColors.Highlight};
          }

          .today .date {
              background: ${SystemColors.Highlight};
              color: ${SystemColors.HighlightText};
          }
      `
  )
);
