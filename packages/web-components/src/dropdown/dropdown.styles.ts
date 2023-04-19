import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeDisabled,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentBackground,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  shadow2,
  spacingHorizontalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Dropdown styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThick} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    box-sizing: border-box;
    color: var(--neutral-foreground-rest);
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    height: 32px;
    position: relative;
    user-select: none;
    outline: none;
    vertical-align: middle;
    padding: 0 var(--spacingHorizontalSNudge);
 }
 :host::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: -1px;
    bottom: -2px;
    right: -1px;
    height: max(${strokeWidthThick}, ${borderRadiusMedium});
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    border-bottom: ${strokeWidthThick} solid ${colorCompoundBrandStroke};
    clip-path: inset(calc(100% - 2px) 1px 0px);
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${durationUltraFast};
    transition-delay: ${curveAccelerateMid};
 }
 :host(:focus-within)::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }
 :host(appearance="underline") {
    background: ${colorTransparentBackground};
    border: 0 none;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStroke1};: 
 }

.listbox {
    border: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    top: 5px;;
    left: 0;
    z-index: 1;
    height: calc(var(--size) * 32px);
    overflow-y: auto;
    margin-top: 2px;
}
:host([size="0"]) .listbox {
    max-height: none;
}
.control + .listbox {
    max-height: 300px
}
:host(:not([aria-haspopup])) .listbox {
    left: auto;
    position: static;
    z-index: auto;
}
.listbox[hidden] {
    display: none;
}
.selected-value {
    flex: 1 1 auto;
    font-family: inherit;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 200px;
    padding-right: ${spacingHorizontalXS};
    color: ${colorNeutralForeground1};
}
.indicator {
    display: flex;
    color: ${colorNeutralForeground3};
}
.control {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    min-height: 100%;
    width: 100%;
}

:host([disabled]) {
    cursor: auto;
}
:host([disabled]) .control {
  cursor: auto;
  user-select: none;
}

slot[name="listbox"] {
    display: none;
    width: 100%;
}
:host([open]) slot[name="listbox"] {
    display: flex;
    position: absolute;
}
`;
