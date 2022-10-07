import type { ToolbarContextValue, ToolbarContextValues, ToolbarState } from './Toolbar.types';

export function useToolbarContextValues_unstable(state: ToolbarState): ToolbarContextValues {
  const { size, handleToggleButton, vertical } = state;
  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const toolbar: ToolbarContextValue = {
    size,
    vertical,
    handleToggleButton,
  };

  return { toolbar };
}
