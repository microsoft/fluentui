import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { borderRadiusSmall, colorStrokeFocus1, colorStrokeFocus2 } from '../theme/design-tokens.js';

/** Pane Settings Item styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  .content {
    padding: 0 5px 0 0;
  }
  .body {
    padding-top: 4px;
  }
  :host {
    padding: 8px 4px;
  }
  .root {
    display: grid;
    grid-template-columns: 1fr 7fr 1fr;
    align-items: flex-start;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .icon {
    width: 28px;
    flex-shrink: 0;
  }
  .toggle {
    width: 34px;
  }
  [role='switch']:focus-visible {
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 3px ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }
`;
