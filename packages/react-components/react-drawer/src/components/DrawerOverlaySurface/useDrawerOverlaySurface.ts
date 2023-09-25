import * as React from 'react';
import {
  useDialogSurface_unstable,
  useDialogSurfaceContextValues_unstable,
  useDialogContext_unstable,
} from '@fluentui/react-dialog';

import type { DrawerOverlaySurfaceProps, DrawerOverlaySurfaceState } from './DrawerOverlaySurface.types';

/**
 * Create the state required to render DrawerOverlaySurface.
 *
 * The returned state can be modified with hooks such as useDrawerOverlaySurfaceStyles_unstable,
 * before being passed to renderDrawerOverlaySurface_unstable.
 *
 * @param props - props from this instance of DrawerOverlaySurface
 * @param ref - reference to root HTMLDivElement of DrawerOverlaySurface
 */
export const useDrawerOverlaySurface_unstable = (
  props: DrawerOverlaySurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerOverlaySurfaceState => {
  const dialogSurfaceState = useDialogSurface_unstable(props, ref);
  const dialogSurfaceContextValues = useDialogSurfaceContextValues_unstable(dialogSurfaceState);
  const isNestedDrawer = useDialogContext_unstable(ctx => ctx.isNestedDialog);

  return {
    ...dialogSurfaceState,
    dialogSurfaceContextValues,
    isNestedDrawer,
  };
};
