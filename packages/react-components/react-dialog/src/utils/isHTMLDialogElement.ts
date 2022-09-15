import * as React from 'react';

export function isHTMLDialogElement(element?: HTMLElement | null): element is HTMLDialogElement {
  return Boolean(element && 'open' in element && 'show' in element && 'showModal' in element && 'close' in element);
}

/**
 * adds additional types which are missing from current version of react
 * @internal
 */
export type HTMLDialogElementProps = JSX.IntrinsicElements['dialog'] & {
  /**
   * The close event is fired on a <dialog> when it has been closed.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The cancel event fires on a <dialog> when
   * the user instructs the browser that they wish to dismiss the current open dialog.
   * For example, the browser might fire this event when the user presses the Esc
   * key.
   */
  onCancel?: (event: React.SyntheticEvent) => void;
};
