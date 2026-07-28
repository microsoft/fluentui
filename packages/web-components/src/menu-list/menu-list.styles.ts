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
    --col-indicator-width: 0px;
    --col-start-width: 0px;
    --col-content-width: 1fr;
    --col-end-width: 0px;
    --col-submenu-width: 0px;

    contain: content;
    block-size: fit-content;
    max-inline-size: 300px;
    min-inline-size: 160px;
    inline-size: auto;
    background-color: ${colorNeutralBackground1};
    border: 1px solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow16};
    grid-template-columns:
      10px
      var(--col-indicator-width)
      var(--col-start-width)
      var(--col-content-width)
      var(--col-end-width)
      var(--col-submenu-width)
      10px;
    gap: 2px 0;
    padding: 4px;
  }

  ::slotted(*) {
    grid-column: 1 / -1;
  }

  :host(:has([role='menuitemradio'], [role='menuitemcheckbox'])) {
    --col-indicator-width: 24px;
  }

  :host(:has([slot='start'])) {
    --col-start-width: 24px;
  }

  :host(:has([slot='end'])) {
    --col-end-width: 24px;
  }

  :host(:has([slot='submenu'])) {
    --col-submenu-width: 24px;
  }

  @scope {
    :scope:has([role='menuitemradio'], [role='menuitemcheckbox']) {
      --col-indicator-width: 24px;
    }

    :scope:has([slot='start']) {
      --col-start-width: 24px;
    }

    :scope:has([slot='end']) {
      --col-end-width: 24px;
    }

    :scope:has([slot='submenu']) {
      --col-submenu-width: 24px;
    }
  }
`;
