import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  SelectOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { elevationShadowFlyout } from '../styles/elevation';
import { heightNumber } from '../styles/size';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  bodyFont,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  fillColor,
  layerCornerRadius,
  neutralForegroundRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';
import { focusTreatmentBase } from '../styles/focus';
import { inputFilledStyles, inputForcedColorStyles, NeutralButtonStyles, StealthButtonStyles } from '../styles';

const logicalControlSelector: string = '.control';
const interactivitySelector: string = ':not([disabled]):not([open])';
const nonInteractivitySelector: string = '[disabled]';

/**
 * The base styles for a select and combobox, without `appearance` visual differences.
 * 
 * @internal
 */
export const baseSelectStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) =>
  css`
    ${display('inline-flex')}
    
    :host {
      border-radius: calc(${controlCornerRadius} * 1px);
      box-sizing: border-box;
      color: ${neutralForegroundRest};
      fill: currentcolor;
      font-family: ${bodyFont};
      position: relative;
      user-select: none;
      min-width: 250px;
      vertical-align: top;
    }

    .listbox {
      box-shadow: ${elevationShadowFlyout};
      background: ${fillColor};
      border-radius: calc(${layerCornerRadius} * 1px);
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      left: 0;
      max-height: calc(var(--max-height) - (${heightNumber} * 1px));
      padding: calc((${designUnit} - ${strokeWidth} ) * 1px);
      overflow-y: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
      margin: 1px 0;
      border: calc(${strokeWidth} * 1px) solid transparent;
    }

    .listbox[hidden] {
      display: none;
    }

    .control {
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
      height: calc(${heightNumber} * 1px);
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      ${typeRampBase}
      min-height: 100%;
      padding: 0 calc(${designUnit} * 2.25px);
      width: 100%;
    }

    :host(:${focusVisible}) {
      ${focusTreatmentBase}
    }

    :host([disabled]) .control {
      cursor: ${disabledCursor};
      opacity: ${disabledOpacity};
      user-select: none;
    }

    :host([open][position='above']) .listbox {
      bottom: calc((${heightNumber} + ${designUnit} * 2) * 1px);
    }

    :host([open][position='below']) .listbox {
      top: calc((${heightNumber} + ${designUnit} * 2) * 1px);
    }

    .selected-value {
      font-family: inherit;
      flex: 1 1 auto;
      text-align: start;
    }

    .indicator {
      flex: 0 0 auto;
      margin-inline-start: 1em;
    }

    slot[name='listbox'] {
      display: none;
      width: 100%;
    }

    :host([open]) slot[name='listbox'] {
      display: flex;
      position: absolute;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }

    .start,
    .end,
    .indicator,
    ::slotted(svg) {
      display: flex;
    }

    ::slotted([role='option']) {
      flex: 0 0 auto;
    }
  `;
  
/**
 * @internal
 */
export const baseSelectForcedColorStyles: (
  context: ElementDefinitionContext,
  definition: SelectOptions
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) =>
  css`
    :host([open]) .listbox {
      background: ${SystemColors.ButtonFace};
      border-color: ${SystemColors.CanvasText};
    }
  `;

export const selectStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) =>
  baseSelectStyles(context, definition)
  .withBehaviors(
    appearanceBehavior('outline', NeutralButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('filled',
      inputFilledStyles(context, definition, logicalControlSelector, interactivitySelector)
      .withBehaviors(forcedColorsStylesheetBehavior(inputForcedColorStyles(context, definition, logicalControlSelector, interactivitySelector)))
    ),
    appearanceBehavior('stealth', StealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    forcedColorsStylesheetBehavior(baseSelectForcedColorStyles(context, definition))
  );
