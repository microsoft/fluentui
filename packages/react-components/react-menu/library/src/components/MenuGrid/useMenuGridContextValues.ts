import type { MenuGridContextValues, MenuGridState } from './MenuGrid.types';

export function useMenuGridContextValues_unstable(state: MenuGridState): MenuGridContextValues {
  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menuGrid = {};

  return { menuGrid };
}
