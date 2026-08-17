'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useSplitButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { CompoundButtonState } from './CompoundButton.types';

import styles from './CompoundButton.module.css';

/**
 * Public identity classes for CompoundButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The per-slot `icon` / `contentContainer` / `secondaryContent`
 * keys were removed in D16.5; there is no public class-name handle on component internals.
 *
 * `'.' + compoundButtonClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const compoundButtonClassNames: { root: string } = {
  root: 'group/fui-compound-button',
};

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;
  const disabledAny = disabled || disabledFocusable;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        // Root styles
        styles.root,
        compoundButtonClassNames.root,
        styles['high-contrast'],
        appearance && styles[appearance],
        styles[size],

        // Disabled styles
        disabledAny && styles.disabled,
        disabledAny && styles['disabled-high-contrast'],

        // Icon-only styles
        iconOnly && styles[`icon-only-${size}`],

        // User provided class name
        state.root.className,
      ),
    },
  };

  state = {
    ...state,
    contentContainer: {
      ...state.contentContainer,
      className: clsx(styles['content-container'], state.contentContainer.className),
    },
  };

  if (state.icon) {
    state = {
      ...state,
      icon: {
        ...state.icon,
        className: clsx(
          styles.icon,
          state.root.children !== undefined && state.root.children !== null && styles[`icon-${iconPosition}`],
          state.icon.className,
        ),
      },
    };
  }

  if (state.secondaryContent) {
    state = {
      ...state,
      secondaryContent: {
        ...state.secondaryContent,
        className: clsx(
          styles['secondary-content'],
          styles[`secondary-content-${size}`],
          state.secondaryContent.className,
        ),
      },
    };
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made CompoundButton win under Griffel.
  // The `fui.components.l2` altitude reproduces that winner now, but the call order still
  // has to stand so the consumer className stays last in the rendered class attribute.
  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal).
  // CompoundButton adds `secondaryContent` / `contentWrapper` slots, so Button's `components`
  // map is NARROWER than this one; it is dropped off the return so this component keeps its own,
  // and every other key Button composed is merged onto this component's wider shape.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { components: buttonComponents, ...composedButton } = useButtonStyles_unstable(state);
  state = { ...state, ...composedButton };

  return state;
};
