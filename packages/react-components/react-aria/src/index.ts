export {
  // eslint-disable-next-line deprecation/deprecation
  useARIAButtonShorthand,
  useARIAButtonProps,
} from './button/index';
export {
  useActiveDescendant,
  ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE,
  ActiveDescendantContextProvider,
  useActiveDescendantContext,
  useHasParentActiveDescendantContext,
} from './activedescendant';
export type {
  ActiveDescendantImperativeRef,
  ActiveDescendantOptions,
  ActiveDescendantContextValue,
} from './activedescendant';
export type {
  ARIAButtonSlotProps,
  ARIAButtonProps,
  ARIAButtonResultProps,
  ARIAButtonType,
  ARIAButtonElement,
  ARIAButtonElementIntersection,
  ARIAButtonAlteredProps,
} from './button/index';
