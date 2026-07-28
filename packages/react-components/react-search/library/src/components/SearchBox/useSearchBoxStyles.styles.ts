'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * converted styles files normally carry a trailing
 * `// eslint-disable-line @fluentui/react-components/enforce-use-client` — once `makeStyles`
 * is gone they call no React hook and no RSC-unsafe function, so the rule correctly reports
 * the directive as unnecessary and the suppression keeps it anyway (dropping directives is a
 * Phase 3 sweep, not a per-conversion change; CONVERSION_GUIDE.md §3).
 *
 * This file is the exception and needs NO suppression: it still delegates to
 * `useInputStyles_unstable`, so `enforce-use-client` sees a hook call, never reports, and a
 * disable comment here would itself be flagged as unused. Same outcome, one fewer comment.
 */

import { clsx } from 'clsx';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useInputStyles_unstable } from '@fluentui/react-input';

import styles from './SearchBox.module.css';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  dismiss: 'fui-SearchBox__dismiss',
  contentAfter: 'fui-SearchBox__contentAfter',
  contentBefore: 'fui-SearchBox__contentBefore',
  input: 'fui-SearchBox__input',
};

/**
 * Data attribute rendered on the root slot, matched by the shared `@custom-variant` catalog
 * in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-focused` is the ONLY attribute SearchBox adds. `data-size`, `data-disabled`,
 * `data-content-before` and `data-content-after` are already stamped on this same element by
 * `useInputStyles_unstable`, which runs at the end of this hook — SearchBox.module.css reads
 * `data-size` from there rather than duplicating it, because both hooks read the very same
 * `state.size`.
 *
 * The name is the headless preview's (`react-headless-components-preview`'s own SearchBox
 * writes `state.root['data-focused']`), and it is a PRESENCE flag written `|| undefined`:
 * React omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-focused="false"` and still match `[data-focused]`.
 */
type SearchBoxRootDataAttributes = {
  'data-focused'?: true;
};

/**
 * Data attribute rendered on the dismiss slot.
 *
 * SearchBox's own `state.disabled` — deliberately NOT the root's `data-disabled`, which
 * Input's hook derives from `state.input.disabled`. The two agree for every normal render
 * but diverge for `<SearchBox input={{ disabled: true }} />`, where Griffel left the dismiss
 * glyph at its rest colour (its slice branched on `state.disabled` alone).
 */
type SearchBoxDismissDataAttributes = {
  'data-disabled'?: true;
};

/**
 * Apply styling to the SearchBox slots based on the state
 */
export const useSearchBoxStyles_unstable = (state: SearchBoxState): SearchBoxState => {
  const { disabled, focused } = state;

  const root = state.root as SearchBoxState['root'] & SearchBoxRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  root['data-focused'] = focused || undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  //
  // Cascade priority is decided by the `@layer fui.*` order in SearchBox.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for why every rule that lands on an
  // Input-owned element (root / input / contentAfter) is authored in `fui.components.l2`
  // while the SearchBox-owned `dismiss` stays in `fui.base` + `fui.components.l1`.
  //
  // The `!focused &&` guards that used to gate `unfocusedNoContentAfter`, `inputStyles[size]`
  // and `contentAfterStyles.rest` are now `@variant not-focused` blocks keyed off the
  // `data-focused` attribute above, and `styles[size]` lookups are `@variant size-*` blocks
  // keyed off the `data-size` Input's hook stamps.

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(searchBoxClassNames.root, styles.root, state.root.className);

  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(searchBoxClassNames.input, styles.input, state.input.className);

  if (state.dismiss) {
    const dismiss = state.dismiss as NonNullable<SearchBoxState['dismiss']> & SearchBoxDismissDataAttributes;

    // eslint-disable-next-line react-hooks/immutability
    dismiss['data-disabled'] = disabled || undefined;

    // eslint-disable-next-line react-hooks/immutability
    state.dismiss.className = clsx(searchBoxClassNames.dismiss, styles.dismiss, state.dismiss.className);
  }

  if (state.contentBefore) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentBefore.className = clsx(searchBoxClassNames.contentBefore, state.contentBefore.className);
  }

  if (state.contentAfter) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentAfter.className = clsx(
      searchBoxClassNames.contentAfter,
      styles.contentAfter,
      state.contentAfter.className,
    );
  } else if (state.dismiss) {
    // Preserved verbatim from the Griffel hook. `renderSearchBox_unstable` only renders the
    // dismiss INSIDE contentAfter, so this branch (contentAfter explicitly nulled out, e.g.
    // `<SearchBox contentAfter={null} />`) can never reach the DOM — it is kept so the
    // conversion changes nothing about the state object a customStyleHook or a custom render
    // function would observe.
    // eslint-disable-next-line react-hooks/immutability
    state.dismiss.className = clsx(state.dismiss.className, styles.contentAfter);
  }

  useInputStyles_unstable(state);

  return state;
};
