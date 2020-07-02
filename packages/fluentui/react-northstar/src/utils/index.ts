export { AutoControlledComponent } from './AutoControlledComponent';
export { childrenExist } from './childrenExist';
export { UIComponent } from './UIComponent';
export { rtlTextContainer } from './rtlTextContainer';
export { stringLiteralsArray } from './stringLiteralsArray';
export { getOrGenerateIdFromShorthand } from './getOrGenerateIdFromShorthand';

export * from './factories';
export { mergeProviderContexts } from './mergeProviderContexts';

export * from './renderComponent';
export { renderComponent } from './renderComponent';

export { htmlImageProps, htmlInputAttrs, htmlInputEvents, htmlInputProps, partitionHTMLProps } from './htmlPropsUtils';

export { isBrowser } from './isBrowser';
export { doesNodeContainClick } from './doesNodeContainClick';

export { pxToRem } from './fontSizeUtility';
export { createComponent } from './createComponent';
export { getKindProp } from './getKindProp';
export * from './whatInput';

export * from './commonPropInterfaces';
export { screenReaderContainerStyles } from './accessibility/Styles/accessibilityStyles';
// work around api-extractor limitation
import { CreateCommonConfig as CreateCommonConfigLocal, createCommon as createCommonLocal } from './commonPropTypes';

export module commonPropTypes {
  export type CreateCommonConfig = CreateCommonConfigLocal;
  export const createCommon = createCommonLocal;
}
