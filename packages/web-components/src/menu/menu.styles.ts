import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { elevation, neutralDividerRestBehavior, neutralLayerFloatingBehavior } from '../styles/index';

export const MenuStyles = css`
  ${display('block')} :host {
    --elevation: 11;
    background: ${neutralLayerFloatingBehavior.var};
    border: calc(var(--outline-width) * 1px) solid transparent;
    border-radius: var(--elevated-corner-radius);
    ${elevation}
    margin: 0;
    border-radius: calc(var(--corner-radius) * 1px);
    padding: calc(var(--design-unit) * 1px) 0;
    max-width: 368px;
    min-width: 64px;
  }

  ::slotted(hr) {
    box-sizing: content-box;
    height: 0;
    margin: 0;
    border: none;
    border-top: calc(var(--outline-width) * 1px) solid var(--neutral-divider-rest);
  }
`.withBehaviors(neutralLayerFloatingBehavior, neutralDividerRestBehavior);
