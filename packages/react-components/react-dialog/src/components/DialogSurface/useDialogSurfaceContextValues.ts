import type { DialogSurfaceContextValues, DialogSurfaceState } from './DialogSurface.types';
import type { DialogSurfaceContextValue } from '../../contexts';

export function useDialogSurfaceContextValues_unstable(state: DialogSurfaceState): DialogSurfaceContextValues {
  const dialogSurface: DialogSurfaceContextValue = true;

  return { dialogSurface };
}
