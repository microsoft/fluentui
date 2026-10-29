import type * as React from 'react';

export type ToggleEvent = Event & { newState?: 'open' | 'closed' };

/**
 * How an element enters the browser top layer.
 * - `auto`: `popover="auto"`. Light dismiss (Escape, click outside); closes other `auto` popovers that are not its ancestors.
 * - `hint`: `popover="hint"`. Light dismiss, but does not close `auto` popovers. Acts as `manual` where unsupported.
 * - `manual`: `popover="manual"`. No light dismiss; stays open until closed by React.
 * - `modal`: `<dialog>` + `showModal()`. Makes the rest of the page inert and renders a `::backdrop`.
 */
export type TopLayerMode = 'auto' | 'hint' | 'manual' | 'modal';

/**
 * What opened or closed the element.
 * - `escape`: a modal dialog closed by Escape, or another close request such as the Android back button.
 * - `light-dismiss`: any popover close: Escape, a click outside, another `auto` popover or a modal opening, a
 *   `popovertarget` or `commandfor` invoker, or `hidePopover()` from outside React. The browser does not say why a
 *   popover closed.
 * - `native-close`: any other dialog close, e.g. `<form method="dialog">` or `dialog.close()` from outside React.
 * - `native-open`: the browser opened the element, e.g. a `popovertarget` or `commandfor` invoker.
 */
export type TopLayerOpenChangeType = 'escape' | 'light-dismiss' | 'native-close' | 'native-open';

/**
 * Passed to `onOpenChange`. `event` is the native event: `toggle`, or `close` for a dialog.
 */
export type TopLayerOpenChangeData = {
  type: TopLayerOpenChangeType;
  event: Event;
};

export type PopoverMode = Exclude<TopLayerMode, 'modal'>;

export type UseLayerOpenStateOptions<Mode extends TopLayerMode = PopoverMode> = {
  /**
   * Controlled open state. `undefined` keeps the state inside the hook.
   */
  open?: boolean;
  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * How the element enters the top layer. `modal` needs `useDialogLayerOpenState` and a `<dialog>` element.
   */
  mode: Mode;
  /**
   * Called when the browser opens or closes the element; never for changes made through `open` or `setOpen`. A browser
   * close is final: the element stays hidden even if `open` stays true. A browser open that leaves `open` false is
   * hidden again.
   */
  onOpenChange?: (open: boolean, data: TopLayerOpenChangeData) => void;
  /**
   * Called before the hook shows the element: once per open, and again when a new element replaces the shown one.
   */
  onBeforeShow?: (element: HTMLElement) => void;
  /**
   * Called after the element is shown: once per open, and again when a new element replaces the shown one.
   */
  onShow?: (element: HTMLElement) => void;
  /**
   * Called once per close as it starts, before the element leaves the top layer: before the hook hides it, or on the
   * browser's `beforetoggle` or `cancel`. Not called when the browser closes a dialog without either.
   */
  onBeforeHide?: (element: HTMLElement) => void;
  /**
   * Called once per close, after the element has left the top layer, whether React or the browser closed it.
   */
  onHide?: (element: HTMLElement) => void;
};

/**
 * Lifecycle callbacks for `useLayerOpenState`; spread them into its options.
 */
export type LayerLifecycleCallbacks = Pick<UseLayerOpenStateOptions, 'onBeforeShow' | 'onBeforeHide' | 'onHide'>;

export type UseLayerFocusReturnOptions = {
  /**
   * Where focus goes on close. Defaults to the element focused before the layer was shown.
   */
  target?: React.RefObject<HTMLElement | null>;
  /**
   * When focus goes back:
   * - `inside`: when focus was inside as the close started, and is now on `<body>` or still inside;
   * - `always`: whenever the target is still in the document;
   * - `false`: never, e.g. a modal dialog, where the browser returns focus.
   * @default 'inside'
   */
  when?: 'inside' | 'always' | false;
};

export type UseLayerEscapeOptions = {
  open: boolean;
  onEscape: (event: KeyboardEvent | React.KeyboardEvent) => void;
  /**
   * Which Escapes to handle:
   * - `manual`: only where the browser doesn't close the layer itself: `popover="manual"`, and `hint` where unsupported;
   * - `always`: every Escape for the layer, e.g. to report it before the browser closes a modal dialog.
   * @default 'manual'
   */
  when?: 'manual' | 'always';
  /**
   * Where Escape is caught:
   * - `layer`: merge the returned `onKeyDown` into the element. Escape from a popover or dialog nested inside it is
   *   left alone; content portaled out of it still counts;
   * - `document`: a capture listener on the document while open, for layers that never hold focus, like a tooltip.
   *   It closes the layer before any other one, as Escape closes the topmost layer.
   * @default 'layer'
   */
  listen?: 'layer' | 'document';
};

export type UseLayerOpenStateReturn = {
  open: boolean;
  /**
   * Sets the open state. Not reported through `onOpenChange`.
   */
  setOpen: (open: boolean) => void;
  /**
   * Value for the element's `popover` attribute: the mode, or `undefined` for `modal`.
   */
  popover: PopoverMode | undefined;
};

/**
 * `<dialog>` support, plugged in by `useDialogLayerOpenState`.
 */
export type DialogAdapter = {
  /**
   * Whether the element reports closes through `cancel` and `close` instead of `toggle`.
   */
  usesDialogEvents: (element: HTMLElement, mode: TopLayerMode) => boolean;
  /**
   * Shows the element with `showModal()` for `modal`. Returns whether this call showed it, or `undefined` to leave it to
   * the Popover API.
   */
  show: (element: HTMLElement, mode: TopLayerMode) => boolean | undefined;
  hide: (element: HTMLElement) => void;
  /**
   * Handles `cancel` and `close`; calls `onClose` when the dialog closed.
   */
  handleEvent: (event: Event, onClose: (type: TopLayerOpenChangeType) => void) => void;
};

export type UseLayerPresenceOptions = {
  open: boolean;
  /**
   * Unmount after the element closes and its exit animations end.
   * @default true
   */
  unmountOnClose?: boolean;
};

export type UseLayerPresenceReturn = {
  /**
   * Whether to render the element. Stays true until the exit finishes.
   */
  shouldRender: boolean;
};
