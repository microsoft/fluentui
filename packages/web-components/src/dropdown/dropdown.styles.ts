import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  borderRadiusNone,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorTransparentBackground,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  shadow16,
  shadow2,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { DropdownStyleSizes } from './dropdown.options.js';

/** Dropdown styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    box-sizing: border-box;
    color: var(--colorNeutralForeground1);
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    height: 32px;
    position: relative;
    user-select: none;
    outline: none;
    vertical-align: middle;
  }
  :host::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: -1px;
    bottom: 0px;
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

  .listbox {
    box-sizing: border-box;
    border: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    top: 5px;
    left: 0;
    z-index: 1;
    height: calc(var(--size) * 32px);
    overflow-y: auto;
    padding: ${spacingVerticalXS} ${spacingHorizontalXS};
    box-shadow: ${shadow16};
    border-radius: ${borderRadiusMedium};
    background: ${colorNeutralBackground1};
    margin-top: 2px;
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
    font-size: ;
  }
  .control {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    min-height: 100%;
    width: 100%;
    padding: 0 var(--spacingHorizontalSNudge);
  }
  .control + .listbox {
    max-height: 300px;
  }
  .listbox[hidden] {
    display: none;
  }
  :host(:not([aria-haspopup])) .listbox {
    left: auto;
    position: static;
    z-index: auto;
  }

  :host([style-sizes='${DropdownStyleSizes.small}']) {
    --style-size-font-small: ${fontSizeBase200} / ${lineHeightBase200};
    height: 24px;
    padding: 0 ${spacingHorizontalSNudge};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font: var(--style-size-font-small) ${fontFamilyBase};
  }

  :host([style-sizes='${DropdownStyleSizes.small}']) .selected-value {
    padding: 0 ${spacingHorizontalXXS};
  }

  :host([appearance='underline']) {
    background: ${colorTransparentBackground};
    border-color: ${colorTransparentStroke};
    border-bottom-color: ${colorNeutralStroke1};
    border-radius: ${borderRadiusNone};
  }

  :host([appearance='underline'])::after {
    height: 0;
  }

  :host([appearance='filled-darker']) {
    background: ${colorNeutralBackground3};
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStroke1};
    box-shadow: ${shadow2};
  }

  :host([appearance='filled-lighter']) {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow2};
  }

  :host([size='0']) .listbox {
    max-height: none;
  }

  :host([disabled]) {
    cursor: auto;
    user-select: none;
  }
`;
