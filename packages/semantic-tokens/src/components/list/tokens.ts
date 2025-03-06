import {
  backgroundCtrlSubtleHoverRaw,
  backgroundCtrlSubtlePressedRaw,
  cornerCtrlLgRestRaw,
  cornerCtrlRestRaw,
  cornerCtrlSmRestRaw,
  foregroundCtrlBrandDisabledRaw,
  foregroundCtrlBrandRestRaw,
  nullColorRaw,
  paddingCtrlHorizontalDefaultRaw,
  paddingCtrlLgHorizontalDefaultRaw,
  paddingCtrlSmHorizontalDefaultRaw,
  sizeCtrlIconsecondaryRaw,
  strokeCtrlDividerOnneutralRaw,
} from '../../control/variables';
import {
  backgroundCtrlSubtleDisabledRaw,
  backgroundCtrlSubtleRestRaw,
  foregroundCtrlHintDefaultRaw,
} from '../../nullable/variables';
import { ctrlChoiceCheckboxCornerRaw } from '../choice/variables';
import {
  ctrlListBackgroundSelectedDisabledRaw,
  ctrlListBackgroundSelectedHoverRaw,
  ctrlListBackgroundSelectedPressedRaw,
  ctrlListBackgroundSelectedRestRaw,
  ctrlListChoiceBackgroundDisabledRaw,
  ctrlListChoiceBackgroundRestRaw,
  ctrlListChoiceBackgroundSelectedDisabledRaw,
  ctrlListChoiceBackgroundSelectedRestRaw,
  ctrlListChoiceCheckboxCornerRaw,
  ctrlListChoiceCheckboxIconSizeFigmaOnlyRaw,
  ctrlListChoiceCheckboxIconSizeRaw,
  ctrlListChoiceDotSizeFigmaOnlyRaw,
  ctrlListChoiceDotSizeRaw,
  ctrlListChoiceForegroundHoverRaw,
  ctrlListChoiceForegroundSelectedDisabledRaw,
  ctrlListChoiceForegroundSelectedRestRaw,
  ctrlListChoiceStrokeDisabledRaw,
  ctrlListChoiceStrokeRestRaw,
  ctrlListChoiceStrokeSelectedDisabledRaw,
  ctrlListChoiceStrokeSelectedRestRaw,
  ctrlListCornerHoverRaw,
  ctrlListCornerPressedRaw,
  ctrlListCornerRestRaw,
  ctrlListIndentLevel1Raw,
  ctrlListIndentLevel2Raw,
  ctrlListIndentLevel3Raw,
  ctrlListLgCornerHoverRaw,
  ctrlListLgCornerPressedRaw,
  ctrlListLgCornerRestRaw,
  ctrlListLgIndentLevel1Raw,
  ctrlListLgIndentLevel2Raw,
  ctrlListLgIndentLevel3Raw,
  ctrlListPillFullwidthRaw,
  ctrlListPillLengthHintRaw,
  ctrlListPillLengthHoverRaw,
  ctrlListPillLengthPressedRaw,
  ctrlListPillLengthRestRaw,
  ctrlListPillStretchPaddingDefaultRaw,
  ctrlListPillStretchPaddingHintRaw,
  ctrlListPillWidthRaw,
  ctrlListSmCornerHoverRaw,
  ctrlListSmCornerPressedRaw,
  ctrlListSmCornerRestRaw,
  ctrlListSmIndentLevel1Raw,
  ctrlListSmIndentLevel2Raw,
  ctrlListSmIndentLevel3Raw,
  ctrlListSplitDividerPaddingInsetRaw,
  ctrlListSplitDividerShowdividerRaw,
  ctrlListSplitDividerStrokeRaw,
} from './variables';

export const ctrlListPillWidth = `var(${ctrlListPillWidthRaw})`;
export const ctrlListPillFullwidth = `var(${ctrlListPillFullwidthRaw})`;
export const ctrlListPillStretchPaddingDefault = `var(${ctrlListPillStretchPaddingDefaultRaw})`;
export const ctrlListPillStretchPaddingHint = `var(${ctrlListPillStretchPaddingHintRaw})`;
export const ctrlListPillLengthRest = `var(${ctrlListPillLengthRestRaw})`;
export const ctrlListPillLengthHover = `var(${ctrlListPillLengthHoverRaw}, ${ctrlListPillLengthRestRaw})`;
export const ctrlListPillLengthPressed = `var(${ctrlListPillLengthPressedRaw}, ${ctrlListPillLengthRestRaw})`;
export const ctrlListPillLengthHint = `var(${ctrlListPillLengthHintRaw}, ${ctrlListPillLengthRestRaw})`;
export const ctrlListCornerRest = `var(${ctrlListCornerRestRaw}, ${cornerCtrlRestRaw})`;
export const ctrlListCornerHover = `var(${ctrlListCornerHoverRaw}, ${cornerCtrlRestRaw})`;
export const ctrlListCornerPressed = `var(${ctrlListCornerPressedRaw}, ${cornerCtrlRestRaw})`;
export const ctrlListIndentLevel1 = `var(${ctrlListIndentLevel1Raw}, ${paddingCtrlHorizontalDefaultRaw})`;
export const ctrlListIndentLevel2 = `var(${ctrlListIndentLevel2Raw})`;
export const ctrlListIndentLevel3 = `var(${ctrlListIndentLevel3Raw})`;
export const ctrlListBackgroundSelectedRest = `var(${ctrlListBackgroundSelectedRestRaw}, var(${backgroundCtrlSubtleRestRaw}, ${nullColorRaw}))`;
export const ctrlListBackgroundSelectedHover = `var(${ctrlListBackgroundSelectedHoverRaw}, ${backgroundCtrlSubtleHoverRaw})`;
export const ctrlListBackgroundSelectedPressed = `var(${ctrlListBackgroundSelectedPressedRaw}, ${backgroundCtrlSubtlePressedRaw})`;
export const ctrlListBackgroundSelectedDisabled = `var(${ctrlListBackgroundSelectedDisabledRaw}, var(${backgroundCtrlSubtleDisabledRaw}, ${nullColorRaw}))`;
export const ctrlListChoiceBackgroundRest = `var(${ctrlListChoiceBackgroundRestRaw}, ${nullColorRaw})`;
export const ctrlListChoiceStrokeRest = `var(${ctrlListChoiceStrokeRestRaw}, ${nullColorRaw})`;
export const ctrlListChoiceStrokeDisabled = `var(${ctrlListChoiceStrokeDisabledRaw}, ${nullColorRaw})`;
export const ctrlListChoiceStrokeSelectedRest = `var(${ctrlListChoiceStrokeSelectedRestRaw}, ${nullColorRaw})`;
export const ctrlListChoiceStrokeSelectedDisabled = `var(${ctrlListChoiceStrokeSelectedDisabledRaw}, ${nullColorRaw})`;
export const ctrlListChoiceForegroundHover = `var(${ctrlListChoiceForegroundHoverRaw}, var(${foregroundCtrlHintDefaultRaw}, ${nullColorRaw}))`;
export const ctrlListChoiceForegroundSelectedRest = `var(${ctrlListChoiceForegroundSelectedRestRaw}, ${foregroundCtrlBrandRestRaw})`;
export const ctrlListChoiceForegroundSelectedDisabled = `var(${ctrlListChoiceForegroundSelectedDisabledRaw}, ${foregroundCtrlBrandDisabledRaw})`;
export const ctrlListChoiceBackgroundDisabled = `var(${ctrlListChoiceBackgroundDisabledRaw}, ${nullColorRaw})`;
export const ctrlListChoiceBackgroundSelectedRest = `var(${ctrlListChoiceBackgroundSelectedRestRaw}, ${nullColorRaw})`;
export const ctrlListChoiceBackgroundSelectedDisabled = `var(${ctrlListChoiceBackgroundSelectedDisabledRaw}, ${nullColorRaw})`;
export const ctrlListChoiceCheckboxCorner = `var(${ctrlListChoiceCheckboxCornerRaw}, ${ctrlChoiceCheckboxCornerRaw})`;
export const ctrlListChoiceCheckboxIconSize = `var(${ctrlListChoiceCheckboxIconSizeRaw}, ${sizeCtrlIconsecondaryRaw})`;
export const ctrlListChoiceCheckboxIconSizeFigmaOnly = `var(${ctrlListChoiceCheckboxIconSizeFigmaOnlyRaw})`;
export const ctrlListChoiceDotSize = `var(${ctrlListChoiceDotSizeRaw})`;
export const ctrlListChoiceDotSizeFigmaOnly = `var(${ctrlListChoiceDotSizeFigmaOnlyRaw})`;
export const ctrlListSplitDividerPaddingInset = `var(${ctrlListSplitDividerPaddingInsetRaw})`;
export const ctrlListSplitDividerStroke = `var(${ctrlListSplitDividerStrokeRaw}, ${strokeCtrlDividerOnneutralRaw})`;
export const ctrlListSmCornerRest = `var(${ctrlListSmCornerRestRaw}, ${cornerCtrlSmRestRaw})`;
export const ctrlListSmCornerHover = `var(${ctrlListSmCornerHoverRaw}, ${cornerCtrlSmRestRaw})`;
export const ctrlListSmCornerPressed = `var(${ctrlListSmCornerPressedRaw}, ${cornerCtrlSmRestRaw})`;
export const ctrlListSmIndentLevel1 = `var(${ctrlListSmIndentLevel1Raw}, ${paddingCtrlSmHorizontalDefaultRaw})`;
export const ctrlListSmIndentLevel2 = `var(${ctrlListSmIndentLevel2Raw})`;
export const ctrlListSmIndentLevel3 = `var(${ctrlListSmIndentLevel3Raw})`;
export const ctrlListLgCornerRest = `var(${ctrlListLgCornerRestRaw}, ${cornerCtrlLgRestRaw})`;
export const ctrlListLgCornerHover = `var(${ctrlListLgCornerHoverRaw}, ${cornerCtrlLgRestRaw})`;
export const ctrlListLgCornerPressed = `var(${ctrlListLgCornerPressedRaw}, ${cornerCtrlLgRestRaw})`;
export const ctrlListLgIndentLevel1 = `var(${ctrlListLgIndentLevel1Raw}, ${paddingCtrlLgHorizontalDefaultRaw})`;
export const ctrlListLgIndentLevel2 = `var(${ctrlListLgIndentLevel2Raw})`;
export const ctrlListLgIndentLevel3 = `var(${ctrlListLgIndentLevel3Raw})`;
export const ctrlListSplitDividerShowdivider = `var(${ctrlListSplitDividerShowdividerRaw})`;
