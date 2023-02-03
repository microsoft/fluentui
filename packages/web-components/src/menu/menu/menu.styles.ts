import { css } from '@microsoft/fast-element';
import { colorNeutralBackground1, colorNeutralStrokeAccessible, strokeWidthThin } from '../../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
:host {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  min-with: 160px;
  background:  ${colorNeutralBackground1};
  border: 1px solid ${colorNeutralStrokeAccessible};
}

:host slot([name="start"]) {
  padding: 0 2px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
}
`;
