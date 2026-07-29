import { clsx } from 'clsx';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

import styles from './TeachingPopoverFooter.module.css';

/**
 * TeachingPopoverFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverFooter` root static and the `__primary` / `__secondary` slot statics are
 * gone (D16.1), and the type has narrowed from `SlotClassNames<TeachingPopoverFooterSlots>` to
 * `{ root: string }`.
 *
 * The two button slots keep their styling — it now travels as hashed module classes composed
 * onto the slot objects this hook already holds (D16.3's M2), which is why removing their
 * public class handles costs nothing.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverFooterClassNames.root` is invalid CSS. Use
 * `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverFooterClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-footer',
};

/** Applies style classnames to slots */
export const useTeachingPopoverFooterStyles_unstable = (
  state: TeachingPopoverFooterState,
): TeachingPopoverFooterState => {
  const { appearance, footerLayout } = state;
  const isHorizontal = footerLayout === 'horizontal';

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TeachingPopoverFooter.module.css
  // — the root's own rules at l1, everything applied to the two `Button` slots at l2 — not by
  // the order of these arguments.
  state.root.className = clsx(
    styles.root,
    'group/fui-teaching-popover-footer',
    isHorizontal ? styles.horizontal : styles.vertical,
    state.root.className,
  );

  // No marker on either button slot: D15.1 puts exactly one marker on the component's
  // OUTERMOST slot, and each `<Button>` already stamps its own `group/fui-button`. These
  // classes are the D16.3 M2 mechanism — this hook renders the buttons and holds their slot
  // objects, so it decorates them directly instead of needing a public class handle.
  if (state.secondary) {
    state.secondary.className = clsx(
      isHorizontal ? styles['button-horizontal'] : styles['button-vertical'],
      appearance === 'brand' ? styles['brand-secondary'] : undefined,
      state.secondary.className,
    );
  }

  state.primary.className = clsx(
    isHorizontal ? styles['button-horizontal'] : styles['button-vertical'],
    appearance === 'brand' ? styles['brand-primary'] : undefined,
    state.primary.className,
  );

  return state;
};
