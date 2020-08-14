import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentForegroundRestBehavior,
  heightNumber,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFillStealthSelectedBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundRestBehavior,
} from '../styles/index';

export const TreeItemStyles = css`
    ${display('block')} :host {
        contain: content;
        position: relative;
        outline: none;
        color: ${neutralForegroundRestBehavior.var};
        background: ${neutralFillStealthRestBehavior.var};
        cursor: pointer;
        font-family: var(--body-font);
        --expand-collapse-button-size: calc(${heightNumber} * 1px);
        --tree-item-nested-width: 0;
    }

    :host(:focus) > .positioning-region {
        outline: none;
    }

    :host(:focus) .content-region {
        outline: none;
    }

    :host(:${focusVisible}) .positioning-region {
        border: ${neutralFocusBehavior.var} 1px solid;
        border-radius: calc(var(--corner-radius) * 1px);
        color: ${neutralForegroundActiveBehavior.var};
    }

    .positioning-region {
        display: flex;
        position: relative;
        box-sizing: border-box;
        border: transparent 1px solid;
        height: calc(${heightNumber} * 1px);
    }

    .positioning-region::before {
        content: "";
        display: block;
        width: var(--tree-item-nested-width);
        flex-shrink: 0;
    }

    .positioning-region:hover {
        background: ${neutralFillStealthHoverBehavior.var};
    }

    .positioning-region:active {
        background: ${neutralFillStealthActiveBehavior.var};
    }

    .content-region {
        display: flex;
        align-items: center;
        white-space: nowrap;
        width: 100%;
        height: calc(${heightNumber} * 1px);
        margin-inline-start: calc(var(--design-unit) * 2px + 2px);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        font-weight: 400;
    }

    .items {
        display: none;
        ${
          /* Font size should be based off calc(1em + (design-unit + glyph-size-number) * 1px) -
            update when density story is figured out */ ''
        } font-size: calc(1em + (var(--design-unit) + 16) * 1px);
    }

    .expand-collapse-button {
        background: none;
        border: none;
        outline: none;
        ${
          /* Width and Height should be based off calc(glyph-size-number + (design-unit * 4) * 1px) -
            update when density story is figured out */ ''
        } width: var(--expand-collapse-button-size);
        height: var(--expand-collapse-button-size);
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .expand-collapse-glyph {
        ${/* Glyph size is temporary -
            replace when glyph-size var is added */ ''} width: 16px;
        height: 16px;
        transition: transform 0.1s linear;
        ${/* transform needs to be localized */ ''} transform: rotate(-45deg);
        pointer-events: none;
        fill: ${neutralForegroundRestBehavior.var};
    }
    .start,
    .end {
        ${/* Glyph size is temporary -
            replace when glyph-size var is added */ ''} width: 16px;
        height: 16px;
        fill: ${neutralForegroundRestBehavior.var};
    }

    .start {
        ${
          /* need to swap out once we understand how horizontalSpacing will work */ ''
        } margin-inline-end: calc(var(--design-unit) * 2px + 2px);
    }

    .end {
        ${
          /* need to swap out once we understand how horizontalSpacing will work */ ''
        } margin-inline-start: calc(var(--design-unit) * 2px + 2px);
    }

    :host(.expanded) > .positioning-region .expand-collapse-glyph {
        ${/* transform needs to be localized */ ''} transform: rotate(0deg);
    }

    :host(.expanded) > .items {
        display: block;
    }

    :host([disabled]) .content-region {
        opacity: var(--disabled-opacity);
        cursor: ${disabledCursor};
    }

    :host([selected]) .positioning-region {
        background: ${neutralFillStealthSelectedBehavior.var};
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
        } background: ${accentForegroundRestBehavior.var};
        ${/* value needs to be localized */ ''} left: calc(var(--focus-outline-width) * 1px);
        border-radius: calc(var(--corner-radius) * 1px);
    }

    :host(.nested) .content-region {
        position: relative;
        margin-inline-start: var(--expand-collapse-button-size);
    }

    :host(.nested) .expand-collapse-button {
        position: absolute;
        ${/* value needs to be localized  */ ''}
        left: var(--expand-collapse-button-nested-width, calc(${heightNumber} * -1px));
    }

    ::slotted(fluent-tree-item) {
        --tree-item-nested-width: 1em;
        --expand-collapse-button-nested-width: calc(${heightNumber} * -1px);
    }
`.withBehaviors(
  accentForegroundRestBehavior,
  neutralFillStealthSelectedBehavior,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
        :host {
            forced-color-adjust: none;
            border-color: transparent;
            background: ${SystemColors.Field};
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
        `,
  ),
);
