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
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';

import styles from './MessageBar.module.css';

export const messageBarClassNames: SlotClassNames<MessageBarSlots> = {
  root: 'fui-MessageBar',
  icon: 'fui-MessageBar__icon',
  bottomReflowSpacer: 'fui-MessageBar__bottomReflowSpacer',
};

/**
 * Data attributes rendered on the root slot and matched by `:where([data-…])` selectors in
 * `MessageBar.module.css`.
 *
 * Both names are taken from the in-repo headless preview, which stamps exactly these two
 * on ITS MessageBar root (`react-headless-components-preview/library/src/components/
 * MessageBar/useMessageBar.ts`), and both are in the 25-name vocabulary
 * (reports/headless-precedent.md).
 *
 * `data-intent` sits on the ROOT even though it also selects the icon slot's colour: the
 * icon is the root's child, so one stamp drives every descendant rule (the react-button
 * `data-size` → `.root … & .icon` precedent).
 *
 * `shape` is deliberately NOT an attribute — it is a look prop, so it keeps a module class
 * lookup (`styles.square`) per DECISIONS.md D3.
 *
 * Neither flag is optional: `layout` and `intent` are both `Required<…>` on the state, so
 * neither needs the `flag || undefined` form the presence attributes elsewhere use.
 */
type MessageBarRootDataAttributes = {
  'data-layout': MessageBarState['layout'];
  'data-intent': MessageBarState['intent'];
};

/**
 * Apply styling to the MessageBar slots based on the state
 */
export const useMessageBarStyles_unstable = (state: MessageBarState): MessageBarState => {
  const { intent, layout, shape } = state;

  const root = state.root as MessageBarState['root'] & MessageBarRootDataAttributes;

  root['data-layout'] = layout;
  root['data-intent'] = intent;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this MessageBar's state, because `styles.root` is hashed and unaddressable from
  // outside this file. MessageBarBody / MessageBarTitle / MessageBarActions are separate
  // components nested inside this root, so `@variant group-…/fui-message-bar { … }` in one
  // of THEIR modules is exactly the cross-component read this exists for: `data-intent` and
  // `data-layout` are already stamped here and are otherwise invisible to them
  // (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in MessageBar.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The `info` intent has no class here because both of its Griffel slices are `{}`
  // ("already in base reset styles"); the module emits no rule for it.
  state.root.className = clsx(
    'group/fui-message-bar',
    messageBarClassNames.root,
    styles.root,
    shape === 'square' && styles.square,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(messageBarClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.bottomReflowSpacer) {
    // No consumer className is merged here — reproduced verbatim from the Griffel hook,
    // which also omitted it.
    state.bottomReflowSpacer.className = clsx(messageBarClassNames.bottomReflowSpacer, styles['bottom-reflow-spacer']);
  }

  return state;
};
