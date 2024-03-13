import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation/utilities.js';
import {
  borderRadiusMedium,
  colorBrandBackground2,
  colorCompoundBrandBackground,
  colorNeutralBackground6,
  colorPaletteDarkOrangeBackground2,
  colorPaletteDarkOrangeBackground3,
  colorPaletteGreenBackground2,
  colorPaletteGreenBackground3,
  colorPaletteRedBackground2,
  colorPaletteRedBackground3,
} from '../theme/design-tokens.js';

/** ProgressBar styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    align-items: center;
    height: 2px;
    overflow-x: hidden;
    border-radius: ${borderRadiusMedium};
    contain: content;
  }

  :host([thickness='large']),
  :host([thickness='large']) .progress,
  :host([thickness='large']) .determinate {
    height: 4px;
  }

  :host([shape='square']),
  :host([shape='square']) .progress,
  :host([shape='square']) .determinate {
    border-radius: 0;
  }

  :host([validation-state='error']) .determinate {
    background-color: ${colorPaletteRedBackground3};
  }

  :host([validation-state='error']) .indeterminate-indicator-1,
  :host([validation-state='error']) .indeterminate-indicator-2 {
    background: linear-gradient(
      to right,
      ${colorPaletteRedBackground2} 0%,
      ${colorPaletteRedBackground3} 50%,
      ${colorPaletteRedBackground2}
    );
  }

  :host([validation-state='warning']) .determinate {
    background-color: ${colorPaletteDarkOrangeBackground3};
  }

  :host([validation-state='warning']) .indeterminate-indicator-1,
  :host([validation-state='warning']) .indeterminate-indicator-2 {
    background: linear-gradient(
      to right,
      ${colorPaletteDarkOrangeBackground2} 0%,
      ${colorPaletteDarkOrangeBackground3} 50%,
      ${colorPaletteDarkOrangeBackground2}
    );
  }

  :host([validation-state='success']) .determinate {
    background-color: ${colorPaletteGreenBackground3};
  }

  :host([validation-state='success']) .indeterminate-indicator-1,
  :host([validation-state='success']) .indeterminate-indicator-2 {
    background: linear-gradient(
      to right,
      ${colorPaletteGreenBackground2} 0%,
      ${colorPaletteGreenBackground3} 50%,
      ${colorPaletteGreenBackground2}
    );
  }

  .progress {
    background-color: ${colorNeutralBackground6};
    border-radius: ${borderRadiusMedium};
    width: 100%;
    height: 2px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .determinate {
    background-color: ${colorCompoundBrandBackground};
    border-radius: ${borderRadiusMedium};
    height: 2px;
    transition: all 0.2s ease-in-out;
    display: flex;
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
    border-radius: ${borderRadiusMedium};
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    width: 40%;
    animation: indeterminate-1 3s infinite;
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
    border-radius: ${borderRadiusMedium};
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    width: 60%;
    animation: indeterminate-2 3s infinite;
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
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .progress {
      background-color: HighlightText;
    }
    .determinate,
    :host([validation-state='success']) .determinate,
    :host([validation-state='warning']) .determinate,
    :host([validation-state='error']) .determinate,
    :host([validation-state='success']) ..indeterminate-indicator-1,
    :host([validation-state='success']) ..indeterminate-indicator-2,
    :host([validation-state='warning']) .indeterminate-indicator-1,
    :host([validation-state='warning']) .indeterminate-indicator-2,
    :host([validation-state='error']) .indeterminate-indicator-1,
    :host([validation-state='error']) .indeterminate-indicator-2 {
      background-color: Highlight;
    }
  `),
);
