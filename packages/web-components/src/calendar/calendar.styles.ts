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
import { DirectionalStyleSheetBehavior, heightNumber } from '../styles';

const ltrStyles = css`
.selected + .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
  padding-left: calc(calc(${designUnit}  * 1px) + calc(${controlCornerRadius} * 1px));
  margin-left: calc(${controlCornerRadius} * -1px);
}

.day.disabled::before {
  transform: translate(-50%, calc(${designUnit} * 1px)) rotate(45deg);
}
`;

const rtlStyles = css`
.selected + .selected {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-width: 0;
  padding-right: calc(calc(${designUnit}  * 1px) + calc(${controlCornerRadius} * 1px));
  margin-right: calc(${controlCornerRadius} * -1px);
}

.day.disabled::before {
  transform: translate(50%, calc(${designUnit} * 1px)) rotate(-45deg);
}
`;

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
  font-weight: 600;
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
  border: 0;
}

.day {
  box-sizing: border-box;
  min-height: calc(${heightNumber} * 1px);
  margin-bottom: calc(${designUnit} * 1px);
  border: calc(${strokeWidth} * 1px) solid transparent;
  border-radius: calc(${controlCornerRadius} * 1px);
}

.interact .day {
  cursor: pointer;
}

.day.inactive .date {
  opacity: ${disabledOpacity};
}

.day.disabled::before {
  content: '';
  display: inline-block;
  width: calc(${heightNumber} * .8px);
  height: calc(${strokeWidth} * 1px);
  background: currentColor;
  position: absolute;
  margin: calc(${typeRampBaseLineHeight} * .5) auto 0;
  transform-origin: center;
}

.selected {
  color: ${accentFillRest};
  border: 1px solid ${accentFillRest};
  background: var(--fill-color);
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
