import { css } from '@microsoft/fast-element';
import { flipBlockState } from '../styles/states/index.js';
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

  :host([popover]) {
    inset: unset;
    overflow: auto;
  }

  @supports (anchor-name: --anchor) {
    :host([popover]) {
      position: absolute;
      margin-block-start: 0;
      max-height: var(--listbox-max-height, calc(50vh - anchor-size(self-block)));
      min-width: anchor-size(width);
      position-anchor: --dropdown;
      position-area: block-end span-inline-end;
      position-try-fallbacks: flip-inline, flip-block, --flip-block, block-start;
    }

    @position-try --flip-block {
      bottom: anchor(top);
      top: unset;
    }
  }

  @supports not (anchor-name: --anchor) {
    :host([popover]) {
      margin-block-start: var(--margin-offset, 0);
      max-height: var(--listbox-max-height, 50vh);
      position: fixed;
    }

    :host([popover]${flipBlockState}) {
      margin-block-start: revert;
      translate: 0 -100%;
    }
  }
`;
