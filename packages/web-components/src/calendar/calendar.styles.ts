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
}

.title {
  font-size: ${typeRampBaseFontSize};
  line-height: ${typeRampBaseLineHeight};
  padding: calc(${designUnit} * 1px);
  text-align: center;
}

.week-days,
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: none;
  padding: 0;
}

.day,
.week-day {
  padding: calc(${designUnit} * 1px);
}

.week-day {
  text-align: center;
}

.day {
  box-sizing: border-box;
  vertical-align: top;
  outline-offset: -1px;
  line-height: var(--cell-line-height);
  white-space: normal;
  min-height: calc(${heightNumber} * 1px);
  margin-bottom: calc(var(--design-unit) * 1px);
}

.interact .day {
  cursor: pointer;
}

.day.inactive .date {
  opacity: ${disabledOpacity};
}

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
  border-left-width: calc(${controlCornerRadius} - var(--strokeWidth));
  margin-left: calc(${controlCornerRadius} * -1px);
}

.date {
  padding: calc(${designUnit} * 1px);
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
