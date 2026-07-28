'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarActionsSlots, MessageBarActionsState } from './MessageBarActions.types';

import styles from './MessageBarActions.module.css';

export const messageBarActionsClassNames: SlotClassNames<MessageBarActionsSlots> = {
  root: 'fui-MessageBarActions',
  containerAction: 'fui-MessageBarActions__containerAction',
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

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from these actions' state, because `styles.root` is
  // hashed and unaddressable from outside this file. Read it as
  // `@variant group-has-actions/fui-message-bar-actions { … }` (DECISIONS.md D15). Only the
  // root slot carries a marker; `containerAction` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in MessageBarActions.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    messageBarActionsClassNames.root,
    'group/fui-message-bar-actions',
    styles.root,
    state.root.className,
  );

  if (state.containerAction) {
    state.containerAction.className = clsx(
      messageBarActionsClassNames.containerAction,
      styles['container-action'],
      state.containerAction.className,
    );
  }

  return state;
};
