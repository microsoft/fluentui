import { css, ElementStyles } from '@microsoft/fast-element';
import { accentFillRestBehavior } from '../behaviors';
import { focusStrokeWidth, accentFillRest, controlCornerRadius } from '../../design-tokens';

/**
 * @internal
 */
export const fillStateStyles = (context, definition) => css`
  :host([appearance='filled']:not(.disabled):active)::after,
  :host([appearance='filled']:not(.disabled):focus-within:not(:active))::after {
    content: '';
    position: absolute;
    bottom: 0;
    border-bottom: calc(${focusStrokeWidth} * 1px) solid ${accentFillRest};
    border-bottom-left-radius: calc(${controlCornerRadius} * 1px);
    border-bottom-right-radius: calc(${controlCornerRadius} * 1px);
    z-index: 2;
    transition: all 300ms cubic-bezier(0.1, 0.9, 0.2, 1);
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
