import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorBrandBackground2,
  colorCompoundBrandBackground,
  colorNeutralBackground6,
  colorPaletteDarkOrangeBackground3,
  colorPaletteGreenBackground3,
  colorPaletteRedBackground3,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    --progress-bar-thickness: 2px;
    --progress-bar-radius: ${borderRadiusMedium};
    --progress-bar-color: ${colorCompoundBrandBackground};
    --progress-speed: 3s;
    align-items: center;
    height: var(--progress-bar-thickness);
    overflow-x: hidden;
  }

  :host([thickness='large']) {
    --progress-bar-thickness: 4px;
  }

  :host([shape='rectangular']) {
    --progress-bar-radius: 0;
  }

  :host([validation-state='error']) {
    --progress-bar-color: ${colorPaletteRedBackground3};
  }

  :host([validation-state='warning']) {
    --progress-bar-color: ${colorPaletteDarkOrangeBackground3};
  }

  :host([validation-state='success']) {
    --progress-bar-color: ${colorPaletteGreenBackground3};
  }

  .progress {
    background-color: ${colorNeutralBackground6};
    border-radius: var(--progress-bar-radius);
    width: 100%;
    height: var(--progress-bar-thickness);
    display: flex;
    align-items: center;
    position: relative;
  }

  .determinate {
    background-color: var(--progress-bar-color);
    border-radius: var(--progress-bar-radius);
    height: var(--progress-bar-thickness);
    transition: all 0.2s ease-in-out;
    display: flex;
  }

  .indeterminate {
    height: 6px;
    border-radius: var(--progress-bar-radius);
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .indeterminate-indicator-1 {
    position: absolute;
    opacity: 0;
    height: 100%;
    background: linear-gradient(
      to right,
      ${colorBrandBackground2} 0%,
      ${colorCompoundBrandBackground} 50%,
      ${colorBrandBackground2}
    );
    border-radius: var(--progress-bar-radius);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    width: 40%;
    animation: indeterminate-1 var(--progress-speed) infinite;
  }

  .indeterminate-indicator-2 {
    position: absolute;
    opacity: 0;
    height: 100%;
    background: linear-gradient(
      to right,
      ${colorBrandBackground2} 0%,
      ${colorCompoundBrandBackground} 50%,
      ${colorBrandBackground2}
    );
    border-radius: var(--progress-bar-radius);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    width: 60%;
    animation: indeterminate-2 var(--progress-speed) infinite;
  }

  :host([paused]) .indeterminate-indicator-1,
  :host([paused]) .indeterminate-indicator-2 {
    animation: none;
    background-color: ${colorNeutralBackground6};
    width: 100%;
    opacity: 1;
  }

  :host([paused]) .determinate {
    background-color: var(--progress-bar-color);
  }

  @keyframes indeterminate-1 {
    0% {
      opacity: 1;
      transform: translateX(-100%);
    }
    70% {
      opacity: 1;
      transform: translateX(300%);
    }
    70.01% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translateX(300%);
    }
  }
  @keyframes indeterminate-2 {
    0% {
      opacity: 0;
      transform: translateX(-150%);
    }
    29.99% {
      opacity: 0;
    }
    30% {
      opacity: 1;
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(166.66%);
      opacity: 1;
    }
  }
`;
