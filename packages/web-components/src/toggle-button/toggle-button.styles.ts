import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '../utils/index.js';
import { styles as ButtonStyles } from '../button/button.styles.js';
import {
  colorBrandBackgroundHover,
  colorBrandBackgroundPressed,
  colorBrandBackgroundSelected,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground1Selected,
  colorNeutralForeground1,
  colorNeutralForeground2BrandHover,
  colorNeutralForeground2BrandPressed,
  colorNeutralForeground2BrandSelected,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground2Selected,
  colorNeutralForegroundOnBrand,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed,
  colorTransparentBackgroundSelected,
  strokeWidthThin,
} from '../theme/design-tokens.js';

// Need to support icon hover styles
export const styles = css`
  ${ButtonStyles}

  :host([aria-pressed="true"]) .control {
    border-color: ${colorNeutralStroke1};
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground1};
    border-width: ${strokeWidthThin};
  }

  :host([aria-pressed='true']:hover) .control {
    border-color: ${colorNeutralStroke1Hover};
    background-color: ${colorNeutralBackground1Hover};
  }

  :host([aria-pressed='true']:active) .control {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
  }

  :host([aria-pressed='true'][appearance='primary']) .control {
    border-color: transparent;
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([aria-pressed='true'][appearance='primary']:hover) .control {
    background-color: ${colorBrandBackgroundHover};
  }

  :host([aria-pressed='true'][appearance='primary']:active) .control {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host([aria-pressed='true'][appearance='subtle']) .control {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([aria-pressed='true'][appearance='subtle']:hover) .control {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host([aria-pressed='true'][appearance='subtle']:active) .control {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host([aria-pressed='true'][appearance='outline']) .control,
  :host([aria-pressed='true'][appearance='transparent']) .control {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host([aria-pressed='true'][appearance='outline']:hover) .control,
  :host([aria-pressed='true'][appearance='transparent']:hover) .control {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host([aria-pressed='true'][appearance='outline']:active) .control,
  :host([aria-pressed='true'][appearance='transparent']:active) .control {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host([aria-pressed='true'][appearance='transparent']) .control {
    border-color: transparent;
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host([aria-pressed='true'][appearance='transparent']:hover) .control {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([aria-pressed='true'][appearance='transparent']:active) .control {
    color: ${colorNeutralForeground2BrandPressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([aria-pressed='true']) .control,
    :host([aria-pressed='true'][appearance='primary']) .control,
    :host([aria-pressed='true'][appearance='subtle']) .control,
    :host([aria-pressed='true'][appearance='outline']) .control,
    :host([aria-pressed='true'][appearance='transparent']) .control,
    :host([aria-pressed='true'][appearance='transparent']) .control {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
