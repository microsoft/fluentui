import { makeStyles, mergeClasses } from '@griffel/react';
import { useSemanticButtonStyles } from '../Button/useSemanticButtonStyles.styles';
import { type ToolbarButtonState } from '@fluentui/react-toolbar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useBaseStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
  verticalIcon: {
    fontSize: semanticTokens.sizeCtrlLgIcon,
    margin: '0',
  },
});

/**
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useSemanticToolbarButtonStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as ToolbarButtonState;

  useSemanticButtonStyles(state);
  const buttonStyles = useBaseStyles();

  state.root.className = mergeClasses(
    state.root.className,
    state.vertical && buttonStyles.vertical,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      state.vertical && buttonStyles.verticalIcon,
      getSlotClassNameProp_unstable(state.icon),
    );
  }
};
