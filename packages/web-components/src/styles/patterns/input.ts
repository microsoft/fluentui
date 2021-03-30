import { css, ElementStyles } from '@microsoft/fast-element';
import { accentFillRestBehavior } from '../behaviors';

export const FillStateStyles: ElementStyles = css`
  :host([appearance='filled']:not(.disabled):active)::after,
  :host([appearance='filled']:not(.disabled):focus-within:not(:active))::after {
    content: '';
    position: absolute;
    bottom: 0;
    border-bottom: calc(var(--focus-outline-width) * 1px) solid ${accentFillRestBehavior.var};
    border-bottom-left-radius: calc(var(--corner-radius) * 1px);
    border-bottom-right-radius: calc(var(--corner-radius) * 1px);
    z-index: 2;
  }

  :host([appearance='filled']:not(.disabled):active)::after {
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([appearance='filled']:not(.disabled):focus-within:not(:active))::after {
    left: 0;
    width: 100%;
  }
`;
