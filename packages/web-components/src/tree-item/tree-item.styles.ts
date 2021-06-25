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
  accentForegroundRest,
  baseHeightMultiplier,
  bodyFont,
  controlCornerRadius,
  density,
  designUnit,
  disabledOpacity,
  focusStrokeOuter,
  neutralFillRecipe,
  neutralFillRest,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralFillStealthRecipe,
  neutralFillStealthRest,
  neutralForegroundRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';
import { Swatch } from '../color/swatch';

const ltr = css`
  .expand-collapse-glyph {
    transform: rotate(0deg);
  }
  :host(.nested) .expand-collapse-button {
    left: var(--expand-collapse-button-nested-width, calc(${heightNumber} * -1px));
  }
  :host([selected])::after {
    left: calc(var(--focus-outline-width) * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-glyph {
    transform: rotate(45deg);
  }
`;

const rtl = css`
  .expand-collapse-glyph {
    transform: rotate(180deg);
  }
  :host(.nested) .expand-collapse-button {
    right: var(--expand-collapse-button-nested-width, calc(${heightNumber} * -1px));
  }
  :host([selected])::after {
    right: calc(var(--focus-outline-width) * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-glyph {
    transform: rotate(135deg);
  }
`;

export const expandCollapseButtonSize = cssPartial`((${baseHeightMultiplier} / 2) * ${designUnit}) + ((${designUnit} * ${density}) / 2)`;

const expandCollapseHoverBehavior = DesignToken.create<Swatch>('tree-item-expand-collapse-hover').withDefault(
  (target: HTMLElement) => {
    const recipe = neutralFillStealthRecipe.getValueFor(target);
    return recipe.evaluate(target, recipe.evaluate(target).hover).hover;
  },
);

const selectedExpandCollapseHoverBehavior = DesignToken.create<Swatch>(
  'tree-item-expand-collapse-selected-hover',
).withDefault((target: HTMLElement) => {
  const baseRecipe = neutralFillRecipe.getValueFor(target);
  const buttonRecipe = neutralFillStealthRecipe.getValueFor(target);
  return buttonRecipe.evaluate(target, baseRecipe.evaluate(target).rest).hover;
});

export const treeItemStyles: (context: ElementDefinitionContext, definition: TreeItemOptions) => ElementStyles = (context: ElementDefinitionContext, definition: TreeItemOptions) =>
  css`
    ${display('block')} :host {
        contain: content;
        position: relative;
        outline: none;
        color: ${neutralForegroundRest};
        background: ${neutralFillStealthRest};
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
      border: calc(${strokeWidth} * 1px) solid transparent;
      height: calc((${heightNumber} + 1) * 1px);
    }

    :host(:${focusVisible}) .positioning-region {
        border: calc(${strokeWidth} * 1px) solid ${focusStrokeOuter};
        border-radius: calc(${controlCornerRadius} * 1px);
        color: ${neutralForegroundRest};
    }

    .positioning-region::before {
        content: "";
        display: block;
        width: var(--tree-item-nested-width);
        flex-shrink: 0;
    }

    .positioning-region:hover {
        background: ${neutralFillStealthHover};
    }

    .positioning-region:active {
        background: ${neutralFillStealthActive};
    }

    .content-region {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        width: 100%;
        height: calc(${heightNumber} * 1px);
        margin-inline-start: calc(${designUnit} * 2px + 8px);
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        font-weight: 400;
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

    .expand-collapse-glyph {
        width: 16px;
        height: 16px;
        transition: transform 0.1s linear;
        transform: rotate(-45deg);
        pointer-events: none;
        fill: ${neutralForegroundRest};
    }
    .start,
    .end {
        display: flex;
        fill: currentcolor;
    }

     ::slotted(svg) {
        ${/* Glyph size is temporary -
            replace when glyph-size var is added */ ''} width: 16px;
        height: 16px;
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

    :host(.expanded) > .positioning-region .expand-collapse-glyph {
        ${/* transform needs to be localized */ ''} transform: rotate(0deg);
    }

    :host(.expanded) > .items {
        display: block;
    }

    :host([disabled]) .content-region {
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
        background: ${expandCollapseHoverBehavior};
    }

    :host([selected]) .positioning-region {
        background: ${neutralFillRest};
    }

    :host([selected]) .expand-collapse-button:hover {
      background: ${selectedExpandCollapseHoverBehavior};
    }

    :host([selected])::after {
        content: "";
        display: block;
        position: absolute;
        top: calc((${heightNumber} / 4) * 1px);
        width: 3px;
        height: calc((${heightNumber} / 2) * 1px);
        ${
          /* The french fry background needs to be calculated based on the selected background state for this control.
            We currently have no way of chaning that, so setting to accent-foreground-rest for the time being */ ''
        } background: ${accentForegroundRest};
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
            forced-color-adjust: none;
            border-color: transparent;
            background: ${SystemColors.Field};
            color: ${SystemColors.FieldText};
        }
        :host .content-region {
            color: ${SystemColors.FieldText};
        }
        :host .content-region .expand-collapse-glyph,
        :host .content-region .start,
        :host .content-region .end {
            fill: ${SystemColors.FieldText};
        }
        :host .positioning-region:hover,
        :host([selected]) .positioning-region {
            background: ${SystemColors.Highlight};
        }
        :host .positioning-region:hover .content-region,
        :host([selected]) .positioning-region .content-region {
            color: ${SystemColors.HighlightText};
        }
        :host .positioning-region:hover .content-region .expand-collapse-glyph,
        :host .positioning-region:hover .content-region .start,
        :host .positioning-region:hover .content-region .end,
        :host([selected]) .content-region .expand-collapse-glyph,
        :host([selected]) .content-region .start,
        :host([selected]) .content-region .end {
            fill: ${SystemColors.HighlightText};
        }
        :host([selected])::after {
            background: ${SystemColors.Field}
        }
        :host(:${focusVisible}) .positioning-region {
            border-color: ${SystemColors.FieldText};
            box-shadow: 0 0 0 2px inset ${SystemColors.Field};
            color: ${SystemColors.FieldText};
        }
        :host([disabled]) .content-region,
        :host([disabled]) .positioning-region:hover .content-region {
            opacity: 1;
            color: ${SystemColors.GrayText};
        }
        :host([disabled]) .content-region .expand-collapse-glyph,
        :host([disabled]) .content-region .start,
        :host([disabled]) .content-region .end,
        :host([disabled]) .positioning-region:hover .content-region .expand-collapse-glyph,
        :host([disabled]) .positioning-region:hover .content-region .start,
        :host([disabled]) .positioning-region:hover .content-region .end {
            fill: ${SystemColors.GrayText};
        }
        :host([disabled]) .positioning-region:hover {
            background: ${SystemColors.Field};
        }
        .expand-collapse-glyph,
        .start,
        .end {
            fill: ${SystemColors.FieldText};
        }
        :host(.nested) .expand-collapse-button:hover {
            background: ${SystemColors.Field};
        }
        :host(.nested) .expand-collapse-button:hover .expand-collapse-glyph {
            fill: ${SystemColors.FieldText};
        }
        `,
    ),
  );
