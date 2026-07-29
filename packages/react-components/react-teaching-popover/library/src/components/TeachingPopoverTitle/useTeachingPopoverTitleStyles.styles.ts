import { clsx } from 'clsx';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

import styles from './TeachingPopoverTitle.module.css';

/**
 * TeachingPopoverTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverTitle` root static and the `__dismissButton` slot static are gone
 * (D16.1), and the type has narrowed from `SlotClassNames<TeachingPopoverTitleSlots>` to
 * `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverTitleClassNames.root` is invalid CSS. Use
 * `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverTitleClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-title',
};

/** Applies style classnames to slots */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  const { appearance } = state;
  const isBrand = appearance === 'brand';

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // `appearance` is a LOOK prop and stays a JS-side gate selecting a module class (D3); no
  // `data-appearance` is stamped, because this hook composes both slot classNames itself and
  // nothing has to read the value from a selector (D15.6, resolved).
  state.root.className = clsx(
    styles.root,
    'group/fui-teaching-popover-title',
    isBrand && styles.brand,
    state.root.className,
  );

  // No marker on the dismiss button: D15.1 puts exactly one marker on the component's
  // OUTERMOST slot. Its classes are this module's own hashed locals.
  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      styles['dismiss-button'],
      isBrand ? styles['dismiss-brand'] : undefined,
      state.dismissButton.className,
    );
  }

  return state;
};
