import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import { spacingHorizontalM, spacingHorizontalMNudge } from '../theme/design-tokens.js';

export const styles = css`
  ${display('block')}

  :host {
    box-sizing: border-box;
    padding: ${spacingHorizontalM} ${spacingHorizontalMNudge};
  }
`;
