import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  shadow16,
  spacingHorizontalXS,
  spacingHorizontalXXS,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/**
 * Styles for the {@link (Listbox:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: none;
    box-shadow: ${shadow16};
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    min-width: 160px;
    padding: ${spacingHorizontalXS};
    row-gap: ${spacingHorizontalXXS};
    width: auto;
  }
`;
