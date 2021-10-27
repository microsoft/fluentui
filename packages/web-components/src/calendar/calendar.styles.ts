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
  typeRampBaseLineHeight
} from '../design-tokens';
import { heightNumber } from '../styles';

/**
 * @internal
 */
export const calendarStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => css`
${display("block")} :host {
  font-family: ${bodyFont};
  font-size: ${typeRampBaseFontSize};
  line-height: ${typeRampBaseLineHeight};
  color: ${neutralForegroundRest};
  width: 300px;
  text-align: center;
}

.title {
  padding: calc(${designUnit} * 1px);
}

.week-days,
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: none;
  padding: 0;
}

.day,
.week-day {
  padding: calc(${designUnit} * 1px);
}

.day {
  box-sizing: border-box;
  min-height: calc(${heightNumber} * 1px);
  margin-bottom: calc(${designUnit} * 1px);
}

.interact .day {
  cursor: pointer;
}

.day.inactive .date,
.day.disabled .date {
  opacity: ${disabledOpacity};
}

.selected {
  color: ${neutralForegroundRest};
  background: ${neutralFillRest};
}

.selected + .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: calc(${controlCornerRadius} * 1px);
  margin-left: calc(${controlCornerRadius} * -1px);
}

.date {
  padding: calc(${designUnit} * 1px);
  max-width: ${typeRampBaseLineHeight};
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
