import { makeStyles, mergeClasses } from '@griffel/react';
import { useInputStyles_unstable } from '@fluentui/react-input';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { iconSizes } from '../../utils/internalTokens';
import type { ComboboxInputSlots, ComboboxInputState } from './ComboboxInput.types';

export const comboboxInputClassNames: SlotClassNames<ComboboxInputSlots> = {
  root: 'fui-ComboboxInput',
  input: 'fui-ComboboxInput__input',
  expandIcon: 'fui-ComboboxInput__expandIcon',
};

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    fontSize: tokens.fontSizeBase500,

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },

  // icon size variants
  small: {
    fontSize: iconSizes.small,
  },
  medium: {
    fontSize: iconSizes.medium,
  },
  large: {
    fontSize: iconSizes.large,
  },
});

/**
 * Apply styling to the ComboboxInput slots based on the state
 */
export const useComboboxInputStyles_unstable = (state: ComboboxInputState): ComboboxInputState => {
  const styledState = useInputStyles_unstable(state);

  const iconStyles = useIconStyles();

  if (state.expandIcon) {
    styledState.expandIcon.className = mergeClasses(
      comboboxInputClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.expandIcon.className,
    );
  }

  return styledState;
};
