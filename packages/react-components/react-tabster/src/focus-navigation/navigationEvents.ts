/**
 * Custom DOM events replacing tabster's event re-exports.
 *
 * Consumers can dispatch these events to programmatically drive arrow
 * navigation and groupper behaviour without calling focus APIs directly.
 *
 * Names are kept identical to tabster's so that external code that
 * dispatches or listens to these events continues to work.
 */

// ---------------------------------------------------------------------------
// MoverMoveFocusEvent
// ---------------------------------------------------------------------------

export const MoverMoveFocusEventName = 'tabster:mover:movefocus' as const;

export type MoverKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End' | 'PageUp' | 'PageDown';

export const MoverKeys = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
} as const satisfies Record<MoverKey, MoverKey>;

export type MoverMoveFocusEventDetail = {
  key: MoverKey;
};

export class MoverMoveFocusEvent extends CustomEvent<MoverMoveFocusEventDetail> {
  constructor(detail: MoverMoveFocusEventDetail) {
    super(MoverMoveFocusEventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    });
  }
}

/** @deprecated Use `element.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys.ArrowDown }))` */
export function dispatchMoverMoveFocusEvent(element: HTMLElement, key: MoverKey): void {
  element.dispatchEvent(new MoverMoveFocusEvent({ key }));
}

// ---------------------------------------------------------------------------
// GroupperMoveFocusEvent
// ---------------------------------------------------------------------------

export const GroupperMoveFocusEventName = 'tabster:groupper:movefocus' as const;

export const GroupperMoveFocusActions = {
  Enter: 'enter',
  Escape: 'escape',
} as const;

export type GroupperMoveFocusAction = (typeof GroupperMoveFocusActions)[keyof typeof GroupperMoveFocusActions];

export type GroupperMoveFocusEventDetail = {
  action: GroupperMoveFocusAction;
};

export class GroupperMoveFocusEvent extends CustomEvent<GroupperMoveFocusEventDetail> {
  constructor(detail: GroupperMoveFocusEventDetail) {
    super(GroupperMoveFocusEventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    });
  }
}

/** @deprecated Use `element.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape }))` */
export function dispatchGroupperMoveFocusEvent(element: HTMLElement, action: GroupperMoveFocusAction): void {
  element.dispatchEvent(new GroupperMoveFocusEvent({ action }));
}

// ---------------------------------------------------------------------------
// MoverMemorizedElementEvent
// ---------------------------------------------------------------------------

export const MoverMemorizedElementEventName = 'tabster:mover:memorized' as const;

export type MoverMemorizedElementEventDetail = {
  element: HTMLElement | undefined;
};

export class MoverMemorizedElementEvent extends CustomEvent<MoverMemorizedElementEventDetail> {
  constructor(detail: MoverMemorizedElementEventDetail) {
    super(MoverMemorizedElementEventName, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}

// ---------------------------------------------------------------------------
// TabsterMoveFocusEvent (generic move event dispatched after every navigation)
// ---------------------------------------------------------------------------

export const TabsterMoveFocusEventName = 'tabster:movefocus' as const;

export type TabsterMoveFocusEventDetail = {
  by: 'mover' | 'groupper';
  key: string;
};

export class TabsterMoveFocusEvent extends CustomEvent<TabsterMoveFocusEventDetail> {
  constructor(detail: TabsterMoveFocusEventDetail) {
    super(TabsterMoveFocusEventName, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}
