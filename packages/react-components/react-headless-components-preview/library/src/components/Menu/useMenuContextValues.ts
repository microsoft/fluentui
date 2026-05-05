'use client';

import { useMenuContextValues_unstable } from '@fluentui/react-menu';
import type { MenuState, MenuContextValues } from './Menu.types';

export const useMenuContextValues = (state: MenuState): MenuContextValues => {
  // `useMenuContextValues_unstable` accepts the full v9 `MenuState`. The headless
  // `MenuState` is `MenuBaseState` (no `surfaceMotion`/`components` slots), but every
  // field the context-values factory reads is in the base state — so the cast is safe.
  return useMenuContextValues_unstable(state as Parameters<typeof useMenuContextValues_unstable>[0]);
};
