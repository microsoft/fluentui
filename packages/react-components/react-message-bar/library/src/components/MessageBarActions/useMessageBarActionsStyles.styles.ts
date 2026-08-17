import { clsx } from 'clsx';
import type { MessageBarActionsState } from './MessageBarActions.types';

import styles from './MessageBarActions.module.css';

/**
 * MessageBarActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `messageBarClassNames` in
 * `../MessageBar/useMessageBarStyles.styles.ts` for the full rationale, including why this is
 * not tagged `@deprecated`. The `containerAction` key is gone along with the
 * `fui-MessageBarActions*` BEM statics (D16.1): style that slot through its `className` prop.
 * The value is a class TOKEN — use `fuiSelector(messageBarActionsClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const messageBarActionsClassNames: { root: string } = {
  root: 'group/fui-message-bar-actions',
};

/**
 * Data attributes rendered on the root slot and matched by `:where([data-…])` selectors in
 * `MessageBarActions.module.css`.
 *
 * Both names are taken from the in-repo headless preview, which stamps exactly these two
 * on ITS MessageBarActions root (`react-headless-components-preview/library/src/components/
 * MessageBar/MessageBarActions/useMessageBarActions.ts`), and both are in the 25-name
 * vocabulary (reports/headless-precedent.md).
 *
 * `data-has-actions` is a presence flag written `hasActions || undefined`: React omits an
 * attribute whose value is `undefined`, whereas `false` would render
 * `data-has-actions="false"` and still match `[data-has-actions]` — which would invert the
 * `:not([data-has-actions])` rule that hides an empty actions slot.
 */
type MessageBarActionsRootDataAttributes = {
  'data-layout': MessageBarActionsState['layout'];
  'data-has-actions'?: true;
};

/**
 * Apply styling to the MessageBarActions slots based on the state
 */
export const useMessageBarActionsStyles_unstable = (state: MessageBarActionsState): MessageBarActionsState => {
  const { hasActions, layout } = state;

  const root = state.root as MessageBarActionsState['root'] & MessageBarActionsRootDataAttributes;

  root['data-layout'] = layout;
  root['data-has-actions'] = hasActions || undefined;

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-message-bar-actions` survives that escaping into an invalid selector, throwing
  // a render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-MessageBarActions` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `messageBarActionsClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from these actions' state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-has-actions/fui-message-bar-actions { … }` (DECISIONS.md D15). Only the
  // root slot carries a marker; `containerAction` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in MessageBarActions.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, messageBarActionsClassNames.root, state.root.className);

  // Sub-slots carry no marker, so D15.1 is not in play: the hashed module class simply leads
  // and the consumer className stays last (DECISIONS.md D16.1 — no public class-name handle
  // on component internals).
  if (state.containerAction) {
    state.containerAction.className = clsx(styles['container-action'], state.containerAction.className);
  }

  return state;
};
