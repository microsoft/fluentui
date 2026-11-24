'use client';
import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { OverlayDrawerState } from './OverlayDrawer.types';
import type * as React from 'react';
import type { OverlayDrawerSurfaceSlots } from './OverlayDrawerSurface/OverlayDrawerSurface.types';
import { useDrawerBaseClassNames, useDrawerDefaultClassName } from '../../shared/useDrawerBaseStyles.styles.css';
import styles from './OverlayDrawer.module.css';

export const overlayDrawerClassNames: SlotClassNames<Omit<OverlayDrawerSurfaceSlots, 'backdropMotion'>> = {
  root: 'fui-OverlayDrawer',
  backdrop: 'fui-OverlayDrawer__backdrop',
};

export const useOverlayDrawerStyles_unstable = (state: OverlayDrawerState): OverlayDrawerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    overlayDrawerClassNames.root,
    useDrawerDefaultClassName(),
    useDrawerBaseClassNames(state),
    styles.root,
    styles[state.position],
    state.hasMountNodeElement && styles.absolute,
    state.root.className,
  );
  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;
  if (backdrop) {
    // eslint-disable-next-line react-hooks/immutability
    backdrop.className = clsx(
      overlayDrawerClassNames.backdrop,
      state.hasMountNodeElement && styles.absolute,
      backdrop.className,
    );
  }
  return state;
};
