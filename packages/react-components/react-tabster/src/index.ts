export {
  useArrowNavigationGroup,
  useFocusableGroup,
  useFocusFinders,
  useFocusVisible,
  useFocusWithin,
  useKeyboardNavAttribute,
  useDangerousNeverHidden_unstable,
  useModalAttributes,
  useTabsterAttributes,
  useObservedElement,
  useFocusObserved,
  useMergedTabsterAttributes_unstable,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  useUncontrolledFocus,
  useOnKeyboardNavigationChange,
  useIsNavigatingWithKeyboard,
  useSetKeyboardNavigation,
  useFocusedElementChange,
  useActivateModal,
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type { TabsterDOMAttribute } from './focus-navigation/types';

// ---------------------------------------------------------------------------
// Keyboard navigation events (replacing tabster re-exports)
// ---------------------------------------------------------------------------

export {
  MoverMoveFocusEventName,
  MoverMoveFocusEvent,
  MoverKeys,
  GroupperMoveFocusEventName,
  GroupperMoveFocusEvent,
  GroupperMoveFocusActions,
  MoverMemorizedElementEventName,
  MoverMemorizedElementEvent,
  TabsterMoveFocusEventName,
  TabsterMoveFocusEvent,
  /** @deprecated Use `element.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape }))` */
  dispatchGroupperMoveFocusEvent,
  /** @deprecated Use `element.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys.ArrowDown }))` */
  dispatchMoverMoveFocusEvent,
} from './focus-navigation/navigationEvents';

export type {
  MoverMoveFocusEventDetail,
  GroupperMoveFocusEventDetail,
  MoverMemorizedElementEventDetail,
  TabsterMoveFocusEventDetail,
} from './focus-navigation/navigationEvents';

// ---------------------------------------------------------------------------
// Keyboard detector (replacing keyborg re-exports)
// ---------------------------------------------------------------------------

export { KEYBORG_FOCUSIN, markNextFocusProgrammatic } from './focus-navigation/keyboardDetector';
export type { KeyborgFocusInEvent } from './focus-navigation/keyboardDetector';

// ---------------------------------------------------------------------------
// Deprecated TabsterTypes snapshot — kept to avoid breaking changes.
// Everything below is deprecated and will be removed in the next major version.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/naming-convention
import * as TabsterTypes6_0_1_DoNotUse from './tabster-types-6.0.1-do-not-use';
export {
  /** @deprecated (Do not use! Exposed by mistake and will be removed in the next major version.) */
  TabsterTypes6_0_1_DoNotUse as TabsterTypes,
};
