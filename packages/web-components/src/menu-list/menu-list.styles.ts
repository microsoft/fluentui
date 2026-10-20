import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStroke,
  shadow16,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/** MenuList styles
 * @public
 */
export const styles = css`
  ${display('grid')}

  :host {
    --_has-indicator: 0;

    contain: layout style;
    block-size: auto;
    max-inline-size: 300px;
    min-inline-size: 160px;
    inline-size: auto;
    background-color: ${colorNeutralBackground1};
    border: 1px solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow16};
    grid-template-columns: 10px calc(var(--_has-indicator) * 24px) auto 1fr auto auto 10px;
    gap: 2px 0;
    padding: 4px;
  }

  :host(:has(> [role='menuitemradio'])),
  :host(:has(> [role='menuitemcheckbox'])) {
    --_has-indicator: 1;
  }

  @scope {
    :scope:has(> :is([role='menuitemradio'], [role='menuitemcheckbox'])) {
      --_has-indicator: 1;
    }
  }

  ::slotted(*) {
    grid-column: 1 / -1;
  }
`;
