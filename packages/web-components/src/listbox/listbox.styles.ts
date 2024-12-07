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

  :host([popover]) {
    position-anchor: --dropdown-trigger;
    border: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    inset: unset;
    margin: 0;
    min-width: 160px;
    overflow: visible;
    padding: 0;
    position: absolute;
    z-index: 1;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-inline, flip-block, block-start;
    width: anchor-size(width);
  }

  :host([popover]:not(:popover-open)) {
    display: none;
  }
`;
