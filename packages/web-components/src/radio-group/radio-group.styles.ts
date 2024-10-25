import { css } from '@microsoft/fast-element';
import {
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  spacingVerticalL,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

/** RadioGroup styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    gap: ${spacingVerticalL};
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    justify-content: flex-start;
  }

  :host([orientation='horizontal']) {
    flex-direction: row;
  }

  ::slotted(*) {
    color: ${colorNeutralForeground3};
  }

  ::slotted(:hover) {
    color: ${colorNeutralForeground2};
  }

  ::slotted(:active) {
    color: ${colorNeutralForeground1};
  }

  ::slotted(${state('disabled')}) {
    color: ${colorNeutralForegroundDisabled};
  }

  ::slotted(${state('checked')}) {
    color: ${colorNeutralForeground1};
  }
`;
