import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  AccentButtonStyles,
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  accentForegroundActiveBehavior,
  accentForegroundCutRestBehavior,
  accentForegroundHoverBehavior,
  accentForegroundRestBehavior,
  BaseButtonStyles,
  LightweightButtonStyles,
  neutralFillActiveBehavior,
  neutralFillFocusBehavior,
  neutralFillHoverBehavior,
  neutralFillRestBehavior,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';

export const ButtonStyles = css`
    ${BaseButtonStyles}
    ${AccentButtonStyles}
    ${LightweightButtonStyles}
    ${OutlineButtonStyles}
    ${StealthButtonStyles}
`.withBehaviors(
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  accentForegroundActiveBehavior,
  accentForegroundCutRestBehavior,
  accentForegroundHoverBehavior,
  accentForegroundRestBehavior,
  neutralFillActiveBehavior,
  neutralFillFocusBehavior,
  neutralFillHoverBehavior,
  neutralFillRestBehavior,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
            :host(.disabled),
            :host(.disabled) .control {
                forced-color-adjust: none;
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.GrayText};
                color: ${SystemColors.GrayText};
                cursor: ${disabledCursor};
                opacity: 1;
            }
            :host(.accent) .control {
                forced-color-adjust: none;
                background: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
            }
    
            :host(.accent) .control:hover {
                background: ${SystemColors.HighlightText};
                border-color: ${SystemColors.Highlight};
                color: ${SystemColors.Highlight};
            }
    
            :host(.accent:${focusVisible}) .control {
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 2px ${SystemColors.HighlightText} inset;
            }
    
            :host(.accent.disabled) .control,
            :host(.accent.disabled) .control:hover {
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.GrayText};
                color: ${SystemColors.GrayText};
            }
            :host(.lightweight) .control:hover {
                forced-color-adjust: none;
                color: ${SystemColors.Highlight};
            }
    
            :host(.lightweight) .control:hover .content::before {
                background: ${SystemColors.Highlight};
            }
    
            :host(.lightweight.disabled) .control {
                forced-color-adjust: none;
                color: ${SystemColors.GrayText};
            }
        
            :host(.lightweight.disabled) .control:hover .content::before {
                background: none;
            }
            :host(.outline.disabled) .control {
                border-color: ${SystemColors.GrayText};
            }
            :host(.stealth) .control {
                forced-color-adjust: none;
                background: none;
                border-color: transparent;
                color: ${SystemColors.ButtonText};
                fill: currentColor;
            }
            :host(.stealth) .control:hover,
            :host(.stealth:${focusVisible}) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
            }
            :host(.stealth.disabled) .control {
                background: none;
                border-color: transparent;
                color: ${SystemColors.GrayText};
            }
        `,
  ),
);
