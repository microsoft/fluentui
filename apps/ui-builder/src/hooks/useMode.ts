import * as React from 'react';
import { DesignerMode } from '../components/types';

export function useMode(): [
  { mode: DesignerMode; isExpanding: boolean; isSelecting: boolean },
  (mode: DesignerMode) => void,
] {
  const [mode, setMode] = React.useState<DesignerMode>('build');
  const isExpanding = mode === 'build';
  const isSelecting = mode === 'build' || mode === 'design';

  return [{ mode, isExpanding, isSelecting }, setMode];
}
