import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  accentFillRestBehavior,
  accentForegroundCutRestBehavior,
  neutralFillRestBehavior,
  neutralForegroundRestBehavior,
} from '../styles';

export const BadgeStyles = css`
  ${display('inline-block')} :host {
    box-sizing: border-box;
    font-family: var(--body-font);
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-height);
  }

  .control {
    border-radius: calc(var(--corner-radius) * 1px);
    padding: calc(var(--design-unit) * 0.5px) calc(var(--design-unit) * 1px);
  }

  :host(.lightweight) .control {
    background: transparent;
    color: ${neutralForegroundRestBehavior.var};
    font-weight: 600;
  }

  :host(.accent) .control {
    background: ${accentFillRestBehavior.var};
    color: ${accentForegroundCutRestBehavior.var};
  }

  :host(.neutral) .control {
    background: ${neutralFillRestBehavior.var};
    color: ${neutralForegroundRestBehavior.var};
  }
`.withBehaviors(
  accentFillRestBehavior,
  accentForegroundCutRestBehavior,
  neutralFillRestBehavior,
  neutralForegroundRestBehavior,
);
