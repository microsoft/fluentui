import { css, cssPartial, ElementStyles } from '@microsoft/fast-element';
import {
  DesignToken,
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  TreeItemOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { DirectionalStyleSheetBehavior, heightNumber } from '../styles/index';
import {
  accentFillRest,
  baseHeightMultiplier,
  bodyFont,
  controlCornerRadius,
  density,
  designUnit,
  disabledOpacity,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralFillSecondaryRecipe,
  neutralFillSecondaryRest,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralFillStealthRecipe,
  neutralFillStealthRest,
  neutralForegroundRest,
  strokeWidth,
} from '../design-tokens';
import { Swatch } from '../color/swatch';
import { typeRampBase } from '../styles/patterns/type-ramp';

const ltr = css`
  .expand-collapse-button svg {
    transform: rotate(0deg);
  }
  :host(.nested) .expand-collapse-button {
    left: var(--expand-collapse-button-nested-width, calc(${heightNumber} * -1px));
  }
  :host([selected])::after {
    left: calc(${focusStrokeWidth} * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-button svg {
    transform: rotate(90deg);
  }
`;

const rtl = css`
  .expand-collapse-button svg {
    transform: rotate(180deg);
  }
  :host(.nested) .expand-collapse-button {
    right: var(--expand-collapse-button-nested-width, calc(${heightNumber} * -1px));
  }
  :host([selected])::after {
    right: calc(${focusStrokeWidth} * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-button svg {
    transform: rotate(90deg);
  }
`;

export const expandCollapseButtonSize = cssPartial`((${baseHeightMultiplier} / 2) * ${designUnit}) + ((${designUnit} * ${density}) / 2)`;

const expandCollapseHover = DesignToken.create<Swatch>('tree-item-expand-collapse-hover').withDefault(
  (target: HTMLElement) => {
    const recipe = neutralFillStealthRecipe.getValueFor(target);
    return recipe.evaluate(target, recipe.evaluate(target).hover).hover;
  },
);

const selectedExpandCollapseHover = DesignToken.create<Swatch>('tree-item-expand-collapse-selected-hover').withDefault(
  (target: HTMLElement) => {
    const baseRecipe = neutralFillSecondaryRecipe.getValueFor(target);
    const buttonRecipe = neutralFillStealthRecipe.getValueFor(target);
    return buttonRecipe.evaluate(target, baseRecipe.evaluate(target).rest).hover;
  },
);

export const treeItemStyles: (context: ElementDefinitionContext, definition: TreeItemOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: TreeItemOptions,
) =>
  css`
    ${display('block')} :host {
      contain: content;
      position: relative;
      outline: none;
      color: ${neutralForegroundRest};
      fill: currentcolor;
      cursor: pointer;
      font-family: ${bodyFont};
      --expand-collapse-button-size: calc(${heightNumber} * 1px);
      --tree-item-nested-width: 0;
    }

    :host(:focus) > .positioning-region {
      outline: none;
    }

    :host(:focus) .content-region {
      outline: none;
    }

    .positioning-region {
      display: flex;
      position: relative;
      box-sizing: border-box;
      background: ${neutralFillStealthRest};
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
      height: calc((${heightNumber} + 1) * 1px);
    }

    :host(:${focusVisible}) .positioning-region {
      border-color: ${focusStrokeOuter};
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset;
    }

    .positioning-region::before {
      content: '';
      display: block;
      width: var(--tree-item-nested-width);
      flex-shrink: 0;
    }

    :host(:not([disabled])) .positioning-region:hover {
      background: ${neutralFillStealthHover};
    }

    :host(:not([disabled])) .positioning-region:active {
      background: ${neutralFillStealthActive};
    }

    .content-region {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      width: 100%;
      height: calc(${heightNumber} * 1px);
      margin-inline-start: calc(${designUnit} * 2px + 8px);
      ${typeRampBase}
    }

    .items {
      display: none;
      ${
        /* Font size should be based off calc(1em + (design-unit + glyph-size-number) * 1px) -
            update when density story is figured out */ ''
      } font-size: calc(1em + (${designUnit} + 16) * 1px);
    }

    .expand-collapse-button {
      background: none;
      border: none;
      border-radius: calc(${controlCornerRadius} * 1px);
      outline: none;
      ${
        /* Width and Height should be based off calc(glyph-size-number + (design-unit * 4) * 1px) -
            update when density story is figured out */ ''
      } width: calc((${expandCollapseButtonSize} + (${designUnit} * 2)) * 1px);
      height: calc((${expandCollapseButtonSize} + (${designUnit} * 2)) * 1px);
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 6px;
    }

    .expand-collapse-button svg {
      transition: transform 0.1s linear;
      pointer-events: none;
    }

    .start,
    .end {
      display: flex;
    }

    .start {
      ${
        /* need to swap out once we understand how horizontalSpacing will work */ ''
      } margin-inline-end: calc(${designUnit} * 2px + 2px);
    }

    .end {
      ${
        /* need to swap out once we understand how horizontalSpacing will work */ ''
      } margin-inline-start: calc(${designUnit} * 2px + 2px);
    }

    :host(.expanded) > .items {
      display: block;
    }

    :host([disabled]) {
      opacity: ${disabledOpacity};
      cursor: ${disabledCursor};
    }

    :host(.nested) .content-region {
      position: relative;
      margin-inline-start: var(--expand-collapse-button-size);
    }

    :host(.nested) .expand-collapse-button {
      position: absolute;
    }

    :host(.nested) .expand-collapse-button:hover {
      background: ${expandCollapseHover};
    }

    :host(:not([disabled])[selected]) .positioning-region {
      background: ${neutralFillSecondaryRest};
    }

    :host(:not([disabled])[selected]) .expand-collapse-button:hover {
      background: ${selectedExpandCollapseHover};
    }

    :host([selected])::after {
      content: '';
      display: block;
      position: absolute;
      top: calc((${heightNumber} / 4) * 1px);
      width: 3px;
      height: calc((${heightNumber} / 2) * 1px);
      ${
        /* The french fry background needs to be calculated based on the selected background state for this control.
            We currently have no way of changing that, so setting to accent-foreground-rest for the time being */ ''
      } background: ${accentFillRest};
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    ::slotted(fluent-tree-item) {
      --tree-item-nested-width: 1em;
      --expand-collapse-button-nested-width: calc(${heightNumber} * -1px);
    }
  `.withBehaviors(
    new DirectionalStyleSheetBehavior(ltr, rtl),
    forcedColorsStylesheetBehavior(
      css`
        :host {
          color: ${SystemColors.ButtonText};
        }
        .positioning-region {
          border-color: ${SystemColors.ButtonFace};
          background: ${SystemColors.ButtonFace};
        }
        :host(:not([disabled])) .positioning-region:hover,
        :host(:not([disabled])) .positioning-region:active,
        :host(:not([disabled])[selected]) .positioning-region {
          background: ${SystemColors.Highlight};
        }
        :host .positioning-region:hover .content-region,
        :host([selected]) .positioning-region .content-region {
          forced-color-adjust: none;
          color: ${SystemColors.HighlightText};
        }
        :host([disabled][selected]) .positioning-region .content-region {
          color: ${SystemColors.GrayText};
        }
        :host([selected])::after {
          background: ${SystemColors.HighlightText};
        }
        :host(:${focusVisible}) .positioning-region {
          forced-color-adjust: none;
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 2px inset ${SystemColors.ButtonFace};
        }
        :host([disabled]),
        :host([disabled]) .content-region,
        :host([disabled]) .positioning-region:hover .content-region {
          opacity: 1;
          color: ${SystemColors.GrayText};
        }
        :host(.nested) .expand-collapse-button:hover,
        :host(:not([disabled])[selected]) .expand-collapse-button:hover {
          background: ${SystemColors.ButtonFace};
          fill: ${SystemColors.ButtonText};
        }
      `,
    ),
  );
