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
  useFocusedElementChange,
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
  type Types,
  type EventsTypes,
  dispatchGroupperMoveFocusEvent,
  dispatchMoverMoveFocusEvent,
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
} from 'tabster';

export type TabsterDOMAttribute = Types.TabsterDOMAttribute;

export type { KeyborgFocusInEvent } from 'keyborg';
export { KEYBORG_FOCUSIN } from 'keyborg';

// WARNING! ATTENTION! Tabster.Types was exported from here by mistake. To avoid breaking changes,
// we are putting a snapshot of Tabster.Types@6.0.1 and marking the entire export as deprecated.
import * as TabsterTypes6_0_1_DoNotUse from './tabster-types-6.0.1-do-not-use';
export {
  /** @deprecated (Do not use! Exposed by mistake and will be removed in the next major version.)  */
  TabsterTypes6_0_1_DoNotUse as TabsterTypes,
  /** @deprecated Use element.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape })) */
  // eslint-disable-next-line deprecation/deprecation
  dispatchGroupperMoveFocusEvent,
  /** @deprecated Use element.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys.ArrowDown })) */
  // eslint-disable-next-line deprecation/deprecation
  dispatchMoverMoveFocusEvent,
};

/**
 * For all exports below, we don't do wildcard exports to keep Tabster API flexible. We export only required
 * parts when they are needed.
 */

export { MoverMoveFocusEventName, MoverMoveFocusEvent, MoverKeys };
export type MoverMoveFocusEventDetail = EventsTypes.MoverMoveFocusEventDetail;

export { GroupperMoveFocusEventName, GroupperMoveFocusEvent, GroupperMoveFocusActions };
export type GroupperMoveFocusEventDetail = EventsTypes.GroupperMoveFocusEventDetail;

export { MoverMemorizedElementEventName, MoverMemorizedElementEvent };
export type MoverMemorizedElementEventDetail = EventsTypes.MoverMemorizedElementEventDetail;

export { TabsterMoveFocusEventName, TabsterMoveFocusEvent };
export type TabsterMoveFocusEventDetail = EventsTypes.TabsterMoveFocusEventDetail;
