'use client';
import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InlineDrawerState, InlineDrawerSlots } from './InlineDrawer.types';
import { useDrawerBaseClassNames, useDrawerDefaultClassName } from '../../shared/useDrawerBaseStyles.styles.css';
import styles from './InlineDrawer.module.css';

export const inlineDrawerClassNames: SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>> = {
  root: 'fui-InlineDrawer',
};

export const useInlineDrawerStyles_unstable = (state: InlineDrawerState): InlineDrawerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    inlineDrawerClassNames.root,
    useDrawerDefaultClassName(),
    useDrawerBaseClassNames(state),
    styles.root,
    styles[state.position],
    state.separator && styles.separator,
    state.animationDirection === 'exit' && styles.exit,
    state.root.className,
  );
  return state;
};
