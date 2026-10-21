import type * as React from 'react';

/**
 * How an element enters the browser top layer.
 * - `auto`: `popover="auto"`. Light dismiss (Escape, click outside); closes other `auto` popovers that are not its ancestors.
 * - `hint`: `popover="hint"`. Light dismiss, but does not close `auto` popovers. Acts as `manual` where unsupported.
 * - `manual`: `popover="manual"`. No light dismiss; stays open until closed by React.
 * - `modal`: `<dialog>` + `showModal()`. Makes the rest of the page inert and renders a `::backdrop`.
 */
export type TopLayerMode = 'auto' | 'hint' | 'manual' | 'modal';

/**
 * `entering` only while enter animations run. `exiting` until the browser reports the close and exit animations end.
 */
export type TopLayerPhase = 'closed' | 'entering' | 'open' | 'exiting';

/**
 * What opened or closed the element.
 * - `escape`: the Escape key, or another close request such as the Android back button.
 * - `light-dismiss`: any other popover close: a click outside, another `auto` popover or a modal opening, a
 *   `popovertarget` or `commandfor` invoker, or `hidePopover()` from outside React. The browser does not say why a
 *   popover closed.
 * - `native-close`: any other dialog close, e.g. `<form method="dialog">` or `dialog.close()` from outside React.
 * - `native-open`: the browser opened the element, e.g. a `popovertarget` or `commandfor` invoker.
 */
export type TopLayerOpenChangeType = 'escape' | 'light-dismiss' | 'native-close' | 'native-open';

/**
 * Passed to `onOpenChange`. `event` is the React `keydown` event for an Escape the hook handled, otherwise the native
 * event (`toggle`, `cancel` or `close`).
 */
export type TopLayerOpenChangeData = {
  type: TopLayerOpenChangeType;
  event: Event | React.KeyboardEvent<HTMLElement>;
};
