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
   * Whether the element is open. The component owns this state.
   */
  open: boolean;
  /**
   * How the element enters the top layer. `modal` needs `useDialogLayerOpenState` and a `<dialog>` element. The
   * element's `popover` attribute must match: the mode, or none for `modal`.
   */
  mode: Mode;
  /**
   * Called when the browser opens or closes the element; never for changes made through `open`. A browser close is
   * final: the element stays hidden even if `open` stays true. A browser open that leaves `open` false is hidden again.
   */
  onOpenChange?: (open: boolean, data: TopLayerOpenChangeData) => void;
  /**
   * Called after the element is shown: once per open, and again when a new element replaces the shown one.
   */
  onShow?: (element: HTMLElement) => void;
};

export type UseDialogLayerOpenStateOptions = UseLayerOpenStateOptions<TopLayerMode> & {
  /**
   * Returns focus on close where the browser doesn't: `manual` and `hint` popovers, light dismiss, and a `<dialog>`
   * shown as a popover. Off when omitted.
   */
  returnFocus?: UseLayerFocusReturnOptions;
};

/**
 * Called by the open-state hook around a show and a hide, each exactly once. Internal: `useDialogLayerOpenState` passes
 * the ones from `useLayerFocusReturn`.
 */
export type LayerLifecycleCallbacks = {
  /**
   * Before the hook shows the element: once per open, and again when a new element replaces the shown one. For a
   * browser open, on its `beforetoggle`, before `[autofocus]` takes focus.
   */
  onBeforeShow: (element: HTMLElement) => void;
  /**
   * Once per close as it starts, before the element leaves the top layer: before the hook hides it, or on the browser's
   * `beforetoggle` or `cancel`. Not called when the browser closes a dialog without either.
   */
  onBeforeHide: (element: HTMLElement) => void;
  /**
   * Once per close, after the element has left the top layer, whether React or the browser closed it.
   */
  onHide: (element: HTMLElement) => void;
};

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
