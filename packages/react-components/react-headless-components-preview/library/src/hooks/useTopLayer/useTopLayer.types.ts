import type * as React from 'react';
import type { TopLayerMode, TopLayerOpenChangeData, TopLayerPhase } from './TopLayer.types';

export type UseTopLayerOptions = {
  /**
   * Whether the element is in the top layer. Always controlled.
   */
  open: boolean;
  /**
   * How the element enters the top layer. `modal` requires a `<dialog>` element.
   */
  mode: TopLayerMode;
  /**
   * Called when the browser opens or closes the element, or on an Escape the hook handles; never for changes made
   * through `open`. Set `open` here. A browser close is final: the element stays hidden even if `open` stays true. A
   * browser open that leaves `open` false is undone.
   */
  onOpenChange?: (open: boolean, data: TopLayerOpenChangeData) => void;
  /**
   * Where focus goes when the element is shown: an element to focus, `false` to keep focus where it is, or `null` /
   * `undefined` for the browser default (`[autofocus]`, and the dialog itself for `showModal()`).
   */
  initialFocus?: React.RefObject<HTMLElement | null> | ((element: HTMLElement) => HTMLElement | null | false);
  /**
   * Where focus goes on close:
   * - `true`: the element focused before opening, if focus was inside and is still inside or on `<body>`. Covers the
   *   cases the browser does not restore (`manual`, `hint`, light dismiss).
   * - a ref: the same, but to that element, e.g. the trigger.
   * - `'always'`: the element focused before opening, wherever focus is.
   * - `false`: never.
   * @default true
   */
  returnFocus?: boolean | 'always' | React.RefObject<HTMLElement | null>;
  /**
   * Called after the element is shown.
   */
  onShow?: (element: HTMLElement) => void;
  /**
   * Unmount after the element closes and exit animations end.
   * @default true
   */
  unmountOnClose?: boolean;
  /**
   * `modal` only. Keep the dialog open on Escape and report it through `onOpenChange`, so the consumer can veto the
   * close.
   * @default false
   */
  preventEscapeClose?: boolean;
};

export type UseTopLayerReturn = {
  /**
   * Whether to render the element. Stays true until the exit finishes.
   */
  shouldRender: boolean;
  phase: TopLayerPhase;
  /**
   * Value for the element's `popover` attribute: the mode, or `undefined` for `modal`.
   */
  popover: Exclude<TopLayerMode, 'modal'> | undefined;
  /**
   * Merge into the element's `onKeyDown`. Reports Escape where the browser does not close the element itself
   * (`manual`, unsupported `hint`, `modal` with `preventEscapeClose`), unless it belongs to a layer nested inside.
   * React bubbling covers content portaled out of the element.
   */
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};
