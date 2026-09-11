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
import type { EventsTypes, Types } from 'tabster';
import { tabster } from './tabsterCompat';

const dispatchGroupperMoveFocusEvent: typeof tabster.dispatchGroupperMoveFocusEvent =
  tabster.dispatchGroupperMoveFocusEvent;
const dispatchMoverMoveFocusEvent: typeof tabster.dispatchMoverMoveFocusEvent = tabster.dispatchMoverMoveFocusEvent;
const MoverMoveFocusEventName: typeof tabster.MoverMoveFocusEventName = tabster.MoverMoveFocusEventName;
const MoverMoveFocusEvent: typeof tabster.MoverMoveFocusEvent = tabster.MoverMoveFocusEvent;
const MoverKeys: typeof tabster.MoverKeys = tabster.MoverKeys;
const GroupperMoveFocusEventName: typeof tabster.GroupperMoveFocusEventName = tabster.GroupperMoveFocusEventName;
const GroupperMoveFocusEvent: typeof tabster.GroupperMoveFocusEvent = tabster.GroupperMoveFocusEvent;
const GroupperMoveFocusActions: typeof tabster.GroupperMoveFocusActions = tabster.GroupperMoveFocusActions;
const MoverMemorizedElementEventName: typeof tabster.MoverMemorizedElementEventName =
  tabster.MoverMemorizedElementEventName;
const MoverMemorizedElementEvent: typeof tabster.MoverMemorizedElementEvent = tabster.MoverMemorizedElementEvent;
const TabsterMoveFocusEventName: typeof tabster.TabsterMoveFocusEventName = tabster.TabsterMoveFocusEventName;
const TabsterMoveFocusEvent: typeof tabster.TabsterMoveFocusEvent = tabster.TabsterMoveFocusEvent;

export type TabsterDOMAttribute = Types.TabsterDOMAttribute;

export type { KeyborgFocusInEvent } from 'keyborg';
export { KEYBORG_FOCUSIN } from 'keyborg';

// WARNING! ATTENTION! Tabster.Types was exported from here by mistake. To avoid breaking changes,
// we are putting a snapshot of Tabster.Types@6.0.1 and marking the entire export as deprecated.
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as TabsterTypes6_0_1_DoNotUse from './tabster-types-6.0.1-do-not-use';
export {
  /** @deprecated (Do not use! Exposed by mistake and will be removed in the next major version.)  */
  TabsterTypes6_0_1_DoNotUse as TabsterTypes,
  /** @deprecated Use element.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape })) */
  dispatchGroupperMoveFocusEvent,
  /** @deprecated Use element.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys.ArrowDown })) */
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
