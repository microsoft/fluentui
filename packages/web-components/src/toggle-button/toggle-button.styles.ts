import { css } from '@microsoft/fast-element';
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
    color: ${colorNeutralForeground1};
  }

  :host([aria-pressed='true']:active) .control {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
    color: ${colorNeutralForeground1};
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
    --button-border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host([aria-pressed='true'][appearance='subtle']:hover) .control {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([aria-pressed='true'][appearance='subtle']:active) .control {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2BrandPressed};
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
`;
