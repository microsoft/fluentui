import { css } from '@microsoft/fast-element';
import { checkedState, disabledState } from '../styles/states/index.js';
import {
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
} from '../theme/design-tokens.js';
import { display } from '../utils/index.js';

/** RadioGroup styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    cursor: pointer;
  }

  :host(${disabledState}),
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

  ::slotted(${disabledState}) {
    color: ${colorNeutralForegroundDisabled};
  }

  ::slotted(${checkedState}) {
    color: ${colorNeutralForeground1};
  }
`;
