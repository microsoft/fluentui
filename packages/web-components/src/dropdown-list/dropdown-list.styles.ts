import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  shadow16,
  spacingHorizontalXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/**
 * Styles of the {@link (DropdownList:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    --border-color: transaprent;
    --box-shadow: ${shadow16};

    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid var(--border-color);
    border-radius: ${borderRadiusMedium};
    box-shadow: var(--box-shadow);
    box-sizing: border-box;
    flex-direction: column;
    gap: ${spacingVerticalXXS};
    inline-size: auto;
    margin: 0;
    min-inline-size: 160px;
    overflow: auto;
    padding: ${spacingHorizontalXS} ${spacingVerticalXS};
    position: absolute;
  }
`;
