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
    anchor-name: --dropdown-listbox;
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: none;
    box-shadow: ${shadow16};
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    max-height: var(--menu-max-height, auto);
    min-width: 160px;
    width: auto;
    padding: ${spacingHorizontalXS};
    row-gap: ${spacingHorizontalXXS};
    z-index: 1;
  }
`;
