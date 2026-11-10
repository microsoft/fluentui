import { css } from '@microsoft/fast-element';
import { flipBlockState } from '../styles/states/index.js';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStroke,
  shadow16,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  strokeWidthThin,
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
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow16};
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    min-inline-size: 160px;
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
      position: fixed;
      max-block-size: var(--listbox-max-height, calc(50vh - anchor-size(self-block)));
      min-inline-size: anchor-size(inline);
      inset-block-start: anchor(outside);
      inset-inline-start: anchor(inside);
      position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block;
    }
  }

  @supports not (anchor-name: --anchor) {
    :host([popover]) {
      margin-block-start: var(--margin-offset, 0);
      max-block-size: var(--listbox-max-height, 50vh);
      position: absolute;
    }

    :host([popover]${flipBlockState}) {
      margin-block-start: revert;
      translate: 0 -100%;
    }
  }
`;
