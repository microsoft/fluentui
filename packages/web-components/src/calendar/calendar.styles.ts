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
  bodyFont,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  foregroundOnAccentRest,
  neutralForegroundRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
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
  width: calc(calc(${heightNumber} + calc(${designUnit} * 2) + calc(${strokeWidth} * 2)) * 7px);
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
  border: calc(${strokeWidth} * 1px) solid transparent;
}

.interact .day {
  cursor: pointer;
}

.day.inactive .date {
  opacity: ${disabledOpacity};
}

.day.disabled::before {
  content: '';
  display: block;
  width: calc(${heightNumber} * .8px);
  height: calc(${strokeWidth} * 1px);
  background: currentColor;
  position: absolute;
  margin-top: calc(${typeRampBaseLineHeight} * .5);
  margin-left: calc(calc(${typeRampBaseLineHeight} * .5) + calc(${designUnit} * 1px));
  transform-origin: center;
  transform: translate(-50%, calc(${designUnit} * 1px)) rotate(45deg);
}

.selected {
  color: ${accentFillRest};
  border: 1px solid ${accentFillRest};
  background: var(--fill-color);
}

.selected + .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
  padding-left: calc(calc(${designUnit}  * 1px) + calc(${controlCornerRadius} * 1px));
  margin-left: calc(${controlCornerRadius} * -1px);
}

.date {
  padding: calc(${designUnit} * 1px);
  max-width: ${typeRampBaseLineHeight};
  margin: 0 auto;
}

.today {
  color: ${foregroundOnAccentRest};
}

.interact .today .date,
.today .date {
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
