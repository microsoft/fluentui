'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still delegates to another package's client
 * styles hook, so `enforce-use-client` sees a hook call and never reports the directive as
 * unnecessary. Converted leaf hooks — `clsx` plus a CSS-Modules import — call nothing and
 * carry no directive at all.
 *
 * Any comment that has to sit ABOVE a surviving directive would push `'use client'` off line 1
 * of the emitted lib/lib-commonjs output, which is why this note sits below it.
 */

import { clsx } from 'clsx';
import type { TagPickerOptionState } from './TagPickerOption.types';
import { useOptionStyles_unstable } from '@fluentui/react-combobox';

import styles from './TagPickerOption.module.css';

/**
 * Public identity class for TagPickerOption.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `media` and `secondaryContent` keys were removed together with
 * the `fui-TagPickerOption__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Note this root ALSO carries `optionClassNames.root` (`group/fui-option`), because a
 * TagPickerOption IS an Option — the delegation to `useOptionStyles_unstable` below stamps it
 * on this same element. `group/fui-tag-picker-option` narrows to this subtype, and
 * `useTagPicker.ts`'s `el.classList.contains(optionClassNames.root)` keeps matching unchanged
 * (a token-taking DOM API needs no escaping).
 *
 * The value is a class TOKEN, not a selector — `'.' + tagPickerOptionClassNames.root` is
 * invalid CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerOptionClassNames.root)` from `@fluentui/react-utilities`.
 */
export const tagPickerOptionClassNames: { root: string } = {
  root: 'group/fui-tag-picker-option',
};

/**
 * Apply styling to the TagPickerOption slots based on the state
 */
export const useTagPickerOptionStyles_unstable = (state: TagPickerOptionState): TagPickerOptionState => {
  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The delegation below
  // prepends Option's own unconditional class ahead of all of this, so index 0 is doubly safe;
  // leading with `styles.root` keeps that a property of this file rather than of another
  // package's hook.
  //
  // `styles.root` is the `makeResetStyles` body, which lives in `@layer fui.base` and therefore
  // loses to Option's l1 rules — reproducing Griffel's `r`-before-`d` bucket order.
  // `.with-secondary-content` is in `fui.components.l2` because its `display: grid` HAS to beat
  // Option's `display: flex`, the way the later mergeClasses argument did. See
  // TagPickerOption.module.css.
  //
  // No `data-*` mirror is minted: every state these rules read is a plain boolean branch on this
  // same element, and Option's own hook already relies on the native `aria-disabled` /
  // `data-activedescendant-focusvisible` that sit here (DECISIONS.md D15.6).
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        'group/fui-tag-picker-option',
        state.secondaryContent && styles['with-secondary-content'],
        state.root.className,
      ),
    },
  };

  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal). The
  // object handed to Option is a NEUTRALISED VIEW of this state, and TagPickerOptionState carries
  // none of the keys that view overrode, so those keys are destructured OFF the return before the
  // merge — threading them would publish Option's view (`active: false`, `checkIcon: undefined`)
  // onto the object TagPickerOption actually renders. `components` goes the same way: Option's map
  // does not know about this component's `media` / `secondaryContent` slots.
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: optionComponents,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    active: optionActive,
    disabled: optionDisabled,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    focusVisible: optionFocusVisible,
    checkIcon: optionCheckIcon,
    selected: optionSelected,
    ...composedOption
  } = useOptionStyles_unstable({
    ...state,
    active: false,
    disabled: false,
    focusVisible: false,
    checkIcon: undefined,
    selected: false,
  });

  // The Option merge lands HERE, immediately after the call, now that Option returns NEW slot
  // objects: deferring it to the return would overwrite the `media` / `secondaryContent`
  // compositions below with Option's pass-through copies and silently drop them.
  state = { ...state, ...composedOption };

  if (state.media) {
    state = { ...state, media: { ...state.media, className: clsx(styles.media, state.media.className) } };
  }

  if (state.secondaryContent) {
    state = {
      ...state,
      secondaryContent: {
        ...state.secondaryContent,
        className: clsx(styles['secondary-content'], state.secondaryContent.className),
      },
    };
  }

  return state;
};
