'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { renderText_unstable, useText_unstable, useTextStyles_unstable } from '../Text';
import type { TextProps, TextPresetProps } from '../Text';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export function createPreset(options: {
  className: string;
  displayName: string;
  useStyles: () => Record<'root', string>;
}): React.FunctionComponent<TextPresetProps> {
  const { useStyles, className, displayName } = options;
  const Wrapper: ForwardRefComponent<TextPresetProps> = React.forwardRef((props, ref) => {
    const styles = useStyles();
    const state = useText_unstable(props as TextProps, ref);

    useTextStyles_unstable(state);

    /*
     * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
     *
     * Was: mergeClasses(className, state.root.className, styles.root, props.className).
     *
     * Two changes, both required by the cascade-native contract that replaces
     * mergeClasses (DECISIONS.md D7 revision):
     *
     * 1. The preset class moved AHEAD of `state.root.className` because class ORDER no
     *    longer decides anything — the preset's rules sit in `fui.components.l2` and beat
     *    Text's own `fui.components.l1` rules by layer, not by position (see
     *    ./presets.module.css). What class order still has to satisfy is the static-class-
     *    first / consumer-className-last contract, which this ordering keeps.
     *
     * 2. The trailing `props.className` is GONE, and that is a fix rather than a loss:
     *    `useText_unstable` already spreads `props` into the root slot, so the consumer's
     *    className is the last thing inside `state.root.className`. Passing it a second
     *    time was invisible under mergeClasses (it appends atomics after every non-atomic
     *    string anyway) but would now render the consumer class twice with library classes
     *    between the two — exactly what `classname-overrides-win` fails on, since it
     *    anchors on the FIRST occurrence.
     *
     * The state mutation itself is preserved (DECISIONS.md D14 defers the pure-builder
     * rewrite to a single Phase 3 sweep).
     */
    state.root.className = clsx(className, styles.root, state.root.className);

    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
