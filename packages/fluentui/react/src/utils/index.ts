export { default as applyAccessibilityKeyHandlers } from './applyAccessibilityKeyHandlers'
export { default as AutoControlledComponent } from './AutoControlledComponent'
export { default as childrenExist } from './childrenExist'
export { default as UIComponent } from './UIComponent'
export { createRenderer, felaRenderer } from './felaRenderer'
export { default as rtlTextContainer } from './rtlTextContainer'
export { default as stringLiteralsArray } from './stringLiteralsArray'
export { default as getOrGenerateIdFromShorthand } from './getOrGenerateIdFromShorthand'

export * from './factories'
export { default as constants } from './constants'
export { default as mergeProviderContexts } from './mergeProviderContexts'

export * from './renderComponent'
export { default as renderComponent } from './renderComponent'

export { default as getElementProp } from './getElementProp'

export {
  htmlImageProps,
  htmlInputAttrs,
  htmlInputEvents,
  htmlInputProps,
  partitionHTMLProps,
} from './htmlPropsUtils'

export { default as isBrowser } from './isBrowser'
export { default as doesNodeContainClick } from './doesNodeContainClick'

export { pxToRem } from './fontSizeUtility'
export { default as createComponent } from './createComponent'
export { getKindProp } from './getKindProp'
export * from './whatInput'

export * from './commonPropInterfaces'
// work around api-extractor limitation
import {
  CreateCommonConfig as CreateCommonConfigLocal,
  createCommon as createCommonLocal,
} from './commonPropTypes'

export module commonPropTypes {
  export type CreateCommonConfig = CreateCommonConfigLocal
  export const createCommon = createCommonLocal
}
