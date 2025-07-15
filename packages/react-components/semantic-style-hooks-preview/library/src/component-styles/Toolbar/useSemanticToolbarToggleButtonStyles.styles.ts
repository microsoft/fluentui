import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { type ToolbarToggleButtonState } from '@fluentui/react-toolbar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useBaseStyles = makeStyles({
  /* use subtle ToggleButton selected styles for Toolbar Radio selected state */
  selected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2Selected,
  },

  iconSelected: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useSemanticToolbarToggleButtonStyles = (_state: unknown): ToolbarToggleButtonState => {
  'use no memo';

  const state = _state as ToolbarToggleButtonState;

  useToggleButtonStyles_unstable(state);
  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(
    state.root.className,
    state.checked && toggleButtonStyles.selected,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      state.checked && toggleButtonStyles.iconSelected,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
