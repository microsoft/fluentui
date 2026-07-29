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
import type { SearchBoxState } from './SearchBox.types';
import { useInputStyles_unstable } from '@fluentui/react-input';

import styles from './SearchBox.module.css';

/**
 * Public identity classes for SearchBox.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-SearchBox`,
 * `fui-SearchBox__*`) are no longer rendered and the per-slot keys are gone; there is no
 * public class-name handle on component internals.
 *
 * Note this root ALSO carries `inputClassNames.root` (`group/fui-input`), because a SearchBox
 * IS an Input — the delegation to `useInputStyles_unstable` below stamps it on this same
 * element. `group/fui-search-box` narrows to this subtype.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + searchBoxClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(searchBoxClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const searchBoxClassNames: { root: string } = {
  root: 'group/fui-search-box',
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

  // Unconditional module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 /
  // D16.2) — with the consumer className last. `styles.root` is unconditional and clsx never
  // drops it, so this hook's own contribution always leads with a hashed, selector-safe token
  // now that the `fui-SearchBox` static is gone. (`useInputStyles_unstable` then PREPENDS
  // Input's own composition to the same element, so the rendered `classList[0]` is Input's
  // leading token — but this hook does not rely on that.) The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this SearchBox's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // SearchBox needs no state mirrors: `data-focused` is stamped on this very element above,
  // and `data-size` / `data-disabled` land on it too when `useInputStyles_unstable` runs at
  // the end of this hook, so `@variant group-focused/fui-search-box`,
  // `group-disabled/fui-search-box` and the size variants all work as-is (D15.6, Tier 0).
  //
  // The name is the COMPONENT's, kebab-cased — `fui-search-box`. It was NOT derived from the
  // (now removed) `fui-SearchBox` root static, which was PascalCase; D15.1 fixes the marker
  // alphabet independently of what the statics used to be.
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
  state.root.className = clsx(styles.root, 'group/fui-search-box', state.root.className);

  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(styles.input, state.input.className);

  if (state.dismiss) {
    const dismiss = state.dismiss as NonNullable<SearchBoxState['dismiss']> & SearchBoxDismissDataAttributes;

    // eslint-disable-next-line react-hooks/immutability
    dismiss['data-disabled'] = disabled || undefined;

    // eslint-disable-next-line react-hooks/immutability
    state.dismiss.className = clsx(styles.dismiss, state.dismiss.className);
  }

  // The `contentBefore` slot deliberately gets NO assignment. Its only library token was the
  // `fui-SearchBox__contentBefore` static; SearchBox has no module class for it (Input's hook
  // is what styles it). Keeping `clsx(state.contentBefore.className)` would be an identity on
  // the consumer's own string and would imply this hook styles a slot it does not
  // (statics-removal design §4d).

  if (state.contentAfter) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentAfter.className = clsx(styles['content-after'], state.contentAfter.className);
  } else if (state.dismiss) {
    // Preserved verbatim from the Griffel hook. `renderSearchBox_unstable` only renders the
    // dismiss INSIDE contentAfter, so this branch (contentAfter explicitly nulled out, e.g.
    // `<SearchBox contentAfter={null} />`) can never reach the DOM — it is kept so the
    // conversion changes nothing about the state object a customStyleHook or a custom render
    // function would observe.
    // eslint-disable-next-line react-hooks/immutability
    state.dismiss.className = clsx(state.dismiss.className, styles['content-after']);
  }

  useInputStyles_unstable(state);

  return state;
};
