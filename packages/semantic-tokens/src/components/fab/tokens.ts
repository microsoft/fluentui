import {
  cornerCircularRaw,
  shadowFlyoutKeyBlurRaw,
  shadowFlyoutKeyColorRaw,
  shadowFlyoutKeyXRaw,
  shadowFlyoutKeyYRaw,
} from '../../control/variables';
import {
  ctrlFabBackgroundDisabledRaw,
  ctrlFabBackgroundHoverRaw,
  ctrlFabBackgroundPressedRaw,
  ctrlFabBackgroundRestRaw,
  ctrlFabCornerHoverRaw,
  ctrlFabCornerPressedRaw,
  ctrlFabCornerRestRaw,
  ctrlFabShadowDisabledKeyBlurRaw,
  ctrlFabShadowDisabledKeyColorRaw,
  ctrlFabShadowDisabledKeyXRaw,
  ctrlFabShadowDisabledKeyYRaw,
  ctrlFabShadowHoverKeyBlurRaw,
  ctrlFabShadowHoverKeyColorRaw,
  ctrlFabShadowHoverKeyXRaw,
  ctrlFabShadowHoverKeyYRaw,
  ctrlFabShadowPressedKeyBlurRaw,
  ctrlFabShadowPressedKeyColorRaw,
  ctrlFabShadowPressedKeyXRaw,
  ctrlFabShadowPressedKeyYRaw,
  ctrlFabShadowRestAmbientBlurRaw,
  ctrlFabShadowRestAmbientColorRaw,
  ctrlFabShadowRestAmbientXRaw,
  ctrlFabShadowRestAmbientYRaw,
  ctrlFabShadowRestKeyBlurRaw,
  ctrlFabShadowRestKeyColorRaw,
  ctrlFabShadowRestKeyXRaw,
  ctrlFabShadowRestKeyYRaw,
} from './variables';

export const ctrlFabBackgroundRest = `var(${ctrlFabBackgroundRestRaw})`;
export const ctrlFabBackgroundHover = `var(${ctrlFabBackgroundHoverRaw})`;
export const ctrlFabBackgroundPressed = `var(${ctrlFabBackgroundPressedRaw})`;
export const ctrlFabBackgroundDisabled = `var(${ctrlFabBackgroundDisabledRaw})`;
export const ctrlFabCornerRest = `var(${ctrlFabCornerRestRaw}, var(${cornerCircularRaw}))`;
export const ctrlFabShadowRestKeyX = `var(${ctrlFabShadowRestKeyXRaw})`;
export const ctrlFabShadowRestKeyY = `var(${ctrlFabShadowRestKeyYRaw})`;
export const ctrlFabShadowRestKeyBlur = `var(${ctrlFabShadowRestKeyBlurRaw})`;
export const ctrlFabShadowRestKeyColor = `var(${ctrlFabShadowRestKeyColorRaw})`;
export const ctrlFabShadowRestAmbientX = `var(${ctrlFabShadowRestAmbientXRaw})`;
export const ctrlFabShadowRestAmbientY = `var(${ctrlFabShadowRestAmbientYRaw})`;
export const ctrlFabShadowRestAmbientBlur = `var(${ctrlFabShadowRestAmbientBlurRaw})`;
export const ctrlFabShadowRestAmbientColor = `var(${ctrlFabShadowRestAmbientColorRaw})`;
export const ctrlFabShadowHoverKeyX = `var(${ctrlFabShadowHoverKeyXRaw}, var(${shadowFlyoutKeyXRaw}))`;
export const ctrlFabShadowHoverKeyY = `var(${ctrlFabShadowHoverKeyYRaw}, var(${shadowFlyoutKeyYRaw}))`;
export const ctrlFabShadowHoverKeyBlur = `var(${ctrlFabShadowHoverKeyBlurRaw}, var(${shadowFlyoutKeyBlurRaw}))`;
export const ctrlFabShadowHoverKeyColor = `var(${ctrlFabShadowHoverKeyColorRaw}, var(${shadowFlyoutKeyColorRaw}))`;
export const ctrlFabShadowPressedKeyX = `var(${ctrlFabShadowPressedKeyXRaw})`;
export const ctrlFabShadowPressedKeyY = `var(${ctrlFabShadowPressedKeyYRaw})`;
export const ctrlFabShadowPressedKeyBlur = `var(${ctrlFabShadowPressedKeyBlurRaw})`;
export const ctrlFabShadowPressedKeyColor = `var(${ctrlFabShadowPressedKeyColorRaw})`;
export const ctrlFabShadowDisabledKeyX = `var(${ctrlFabShadowDisabledKeyXRaw}, var(${ctrlFabShadowPressedKeyXRaw}))`;
export const ctrlFabShadowDisabledKeyY = `var(${ctrlFabShadowDisabledKeyYRaw}, var(${ctrlFabShadowPressedKeyYRaw}))`;
export const ctrlFabShadowDisabledKeyBlur = `var(${ctrlFabShadowDisabledKeyBlurRaw}, var(${ctrlFabShadowPressedKeyBlurRaw}))`;
export const ctrlFabShadowDisabledKeyColor = `var(${ctrlFabShadowDisabledKeyColorRaw}, var(${ctrlFabShadowPressedKeyColorRaw}))`;
export const ctrlFabCornerHover = `var(${ctrlFabCornerHoverRaw}, var(${cornerCircularRaw}))`;
export const ctrlFabCornerPressed = `var(${ctrlFabCornerPressedRaw}, var(${cornerCircularRaw}))`;
