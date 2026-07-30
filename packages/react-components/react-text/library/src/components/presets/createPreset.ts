'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { renderText_unstable, useText_unstable, useTextStyles_unstable } from '../Text';
import type { TextProps, TextPresetProps } from '../Text';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export function createPreset(options: {
  displayName: string;
  useStyles: () => Record<'root', string>;
}): React.FunctionComponent<TextPresetProps> {
  const { useStyles, displayName } = options;
  const Wrapper: ForwardRefComponent<TextPresetProps> = React.forwardRef((props, ref) => {
    const styles = useStyles();
    let state = useText_unstable(props as TextProps, ref);

    state = useTextStyles_unstable(state);

    /*
     * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
     *
     * Was: mergeClasses(className, state.root.className, styles.root, props.className),
     * where `className` was the preset's BEM static (`fui-Body1`, …).
     *
     * Three changes, all required by the cascade-native contract that replaces
     * mergeClasses (DECISIONS.md D7 revision) and by the statics sweep (D16):
     *
     * 1. The preset class moved AHEAD of `state.root.className` because class ORDER no
     *    longer decides anything — the preset's rules sit in `fui.components.l2` and beat
     *    Text's own `fui.components.l1` rules by layer, not by position (see
     *    ./presets.module.css). What class order still has to satisfy is the
     *    consumer-className-last contract, which this ordering keeps.
     *
     * 2. The trailing `props.className` is GONE, and that is a fix rather than a loss:
     *    `useText_unstable` already spreads `props` into the root slot, so the consumer's
     *    className is the last thing inside `state.root.className`. Passing it a second
     *    time was invisible under mergeClasses (it appends atomics after every non-atomic
     *    string anyway) but would now render the consumer class twice with library classes
     *    between the two — exactly what `classname-overrides-win` fails on, since it
     *    anchors on the FIRST occurrence.
     *
     * 3. The preset's BEM static is gone, and with it the `className` option this factory
     *    used to take (DECISIONS.md D16.1 / D16.7). `styles.root` — the preset's own hashed
     *    `fuicm-…` class, which is unconditional — takes over as the leading token, so the
     *    `group/fui-text` marker that `useTextStyles_unstable` stamped a moment ago is still
     *    never `classList[0]` (D16.2). Presets deliberately mint NO marker of their own:
     *    they are a shorthand for `<Text font size weight>` and D16.7 accepts the loss of
     *    preset-level public identity rather than add 17 tokens to Tailwind's flat global
     *    group namespace.
     *
     * The state mutation itself is preserved (DECISIONS.md D14 defers the pure-builder
     * rewrite to a single Phase 3 sweep).
     */
    state.root.className = clsx(styles.root, state.root.className);

    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
