import type { ToolbarContextValue, ToolbarContextValues, ToolbarState } from './Toolbar.types';

export function useToolbarContextValues_unstable(state: ToolbarState): ToolbarContextValues {
  const { size, handleToggleButton, vertical, checkedValues, handleRadio } = state;
  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const toolbar: ToolbarContextValue = {
    size,
    vertical,
    handleToggleButton,
    handleRadio,
    checkedValues,
  };

  return { toolbar };
}
