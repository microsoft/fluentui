import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PromptInputSlots, PromptInputState } from './PromptInput.types';
import { tokens } from '@fluentui/react-theme';

export const promptInputClassNames: SlotClassNames<PromptInputSlots> = {
  root: 'fui-PromptInput',
  listbox: 'fui-PromptInput__listbox',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  listbox: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: tokens.borderRadiusMedium,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: {
    zIndex: 1,
  },
  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the PromptInput slots based on the state
 */
export const usePromptInputStyles_unstable = (state: PromptInputState): PromptInputState => {
  const styles = useStyles();
  state.root.className = mergeClasses(promptInputClassNames.root, state.root.className);
  if (state.listbox) {
    state.listbox.className = mergeClasses(
      promptInputClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
