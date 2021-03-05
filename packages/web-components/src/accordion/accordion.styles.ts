import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { accentFillRestBehavior, neutralDividerRestBehavior, neutralForegroundRestBehavior } from '../styles/';

export const AccordionStyles = css`
  ${display('flex')} :host {
    box-sizing: border-box;
    flex-direction: column;
    font-family: var(--body-font);
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-line-height);
    color: ${neutralForegroundRestBehavior.var};
    border-top: calc(var(--outline-width) * 1px) solid ${neutralDividerRestBehavior.var};
  }
`.withBehaviors(accentFillRestBehavior, neutralDividerRestBehavior, neutralForegroundRestBehavior);
