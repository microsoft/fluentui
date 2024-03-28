export {
  useArrowNavigationGroup,
  useFocusableGroup,
  useFocusFinders,
  useFocusVisible,
  useFocusWithin,
  useKeyboardNavAttribute,
  useModalAttributes,
  useTabsterAttributes,
  useObservedElement,
  useFocusObserved,
  useMergedTabsterAttributes_unstable,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  useUncontrolledFocus,
  useOnKeyboardNavigationChange,
  useSetKeyboardNavigation,
} from './hooks/index';
export type {
  UseArrowNavigationGroupOptions,
  UseFocusableGroupOptions,
  UseModalAttributesOptions,
} from './hooks/index';

export { createCustomFocusIndicatorStyle, createFocusOutlineStyle } from './focus/index';

export type {
  CreateCustomFocusIndicatorStyleOptions,
  CreateFocusOutlineStyleOptions,
  FocusOutlineOffset,
  FocusOutlineStyleOptions,
} from './focus/index';

export { applyFocusVisiblePolyfill } from './focus/index';
import {
  Types as TabsterTypes,
  Events as TabsterEvents,
  dispatchGroupperMoveFocusEvent,
  dispatchMoverMoveFocusEvent,
} from 'tabster';

export type TabsterDOMAttribute = TabsterTypes.TabsterDOMAttribute;

export type { KeyborgFocusInEvent } from 'keyborg';
export { KEYBORG_FOCUSIN } from 'keyborg';

// @internal (undocumented)
export {
  TabsterTypes,
  TabsterEvents,
  // eslint-disable-next-line deprecation/deprecation
  dispatchGroupperMoveFocusEvent,
  // eslint-disable-next-line deprecation/deprecation
  dispatchMoverMoveFocusEvent,
};
