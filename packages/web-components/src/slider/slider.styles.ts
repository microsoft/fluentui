import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorBrandBackground,
  colorCompoundBrandBackground,
  colorNeutralBackground1,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')} :host {
    --cursor-height: 20px;
    --cursor-width: 20px;
    --track-height: 4px;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
    border-radius: ${borderRadiusMedium};
  }

  .positioning-region {
    position: relative;
    margin: 0 8px;
    display: grid;
    grid-template-rows: 16px 1fr;
  }

  .track {
    background: ${colorNeutralStrokeAccessible};
    height: var(--track-height);
    border-radius: ${borderRadiusMedium};
  }

  .thumb-container {
    position: absolute;
    left: 0;
    background: ${colorCompoundBrandBackground};
    height: var(--track-height);
    border-radius: ${borderRadiusMedium};
  }

  .thumb-cursor {
    position: absolute;
    right: 0;
    height: var(--cursor-height);
    width: var(--cursor-width);
    border-radius: ${borderRadiusCircular};
    background-color: ${colorBrandBackground};
    box-shadow: inset 0 0 0 3px ${colorNeutralBackground1};
    border: 1px solid ${colorNeutralStroke1};
    transform: translateY(calc((var(--track-height) * 2) * -1));
  }
`;
