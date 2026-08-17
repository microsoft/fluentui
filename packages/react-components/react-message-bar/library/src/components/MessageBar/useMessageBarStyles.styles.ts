import { clsx } from 'clsx';
import type { MessageBarState } from './MessageBar.types';

import styles from './MessageBar.module.css';

/**
 * MessageBar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `icon` / `bottomReflowSpacer` keys are gone along with the `fui-MessageBar*` BEM statics
 * (D16.1), and the type has narrowed from `SlotClassNames<MessageBarSlots>` to
 * `{ root: string }` so that any read of a per-slot key is a compile error on the exact line
 * that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + messageBarClassNames.root` is invalid CSS. Use
 * `fuiSelector(messageBarClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const messageBarClassNames: { root: string } = {
  root: 'group/fui-message-bar',
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

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])`, and the `/` in `group/fui-message-bar` survives that
  // escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom
  // (DECISIONS.md D15.1). Before D16 the `fui-MessageBar` static held that position;
  // `styles.root` holds it now. `styles.square` cannot: it is conditional on `shape`.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `messageBarClassNames` — and is the only handle by which another module, in this
  // package or any other, can style an element from this MessageBar's state, because
  // `styles.root` is hashed and unaddressable from outside this file. MessageBarBody /
  // MessageBarTitle / MessageBarActions are separate components nested inside this root, so
  // `@variant group-…/fui-message-bar { … }` in one of THEIR modules is exactly the
  // cross-component read this exists for: `data-intent` and `data-layout` are already
  // stamped here and are otherwise invisible to them (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in MessageBar.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The `info` intent has no class here because both of its Griffel slices are `{}`
  // ("already in base reset styles"); the module emits no rule for it.
  state.root.className = clsx(
    styles.root,
    messageBarClassNames.root,
    shape === 'square' && styles.square,
    state.root.className,
  );

  // Sub-slots carry no marker, so D15.1 is not in play: the hashed module class simply leads
  // and the consumer className stays last (DECISIONS.md D16.1 — no public class-name handle
  // on component internals).
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  if (state.bottomReflowSpacer) {
    // No consumer className is merged here — reproduced verbatim from the Griffel hook,
    // which also omitted it.
    state.bottomReflowSpacer.className = clsx(styles['bottom-reflow-spacer']);
  }

  return state;
};
