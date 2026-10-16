/**
 * The role of a top-layer element. Decides where focus moves on open, and the trigger's `aria-haspopup`.
 */
export type TopLayerRole =
  | 'dialog'
  | 'alertdialog'
  | 'menu'
  | 'listbox'
  | 'tree'
  | 'grid'
  | 'tooltip'
  | 'note'
  | 'status'
  | 'alert'
  | 'log'
  | 'group';

/**
 * How an element enters the browser top layer.
 * - `auto`: `popover="auto"`. Light dismiss (Escape, click outside); closes other `auto` popovers that are not its ancestors.
 * - `hint`: `popover="hint"`. Light dismiss, but does not close `auto` popovers. Falls back to `auto` when unsupported.
 * - `manual`: `popover="manual"`. No light dismiss; stays open until closed by React.
 * - `modal`: `<dialog>` + `showModal()`. Makes the rest of the page inert and renders a `::backdrop`.
 */
export type TopLayerMode = 'auto' | 'hint' | 'manual' | 'modal';

/**
 * Lifecycle phase of a top-layer element.
 * `entering` is used only while enter animations run. `exiting` lasts until the browser reports the close and exit
 * animations finish.
 */
export type TopLayerPhase = 'closed' | 'entering' | 'open' | 'exiting';

/**
 * Why the browser closed the element.
 * - `escape`: the Escape key (or another close request, such as the Android back button).
 * - `light-dismiss`: a click outside, or another `auto` popover opening.
 * - `native-close`: a modal `<dialog>` closed natively, e.g. by `<form method="dialog">`.
 */
export type TopLayerCloseReason = 'escape' | 'light-dismiss' | 'native-close';

/**
 * Data reported when the browser closes a top-layer element. `type` is the close reason.
 */
export type TopLayerCloseData = {
  type: TopLayerCloseReason;
  event: Event;
};
