import { makeStyles, mergeClasses } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  // This classname is not applied, but it's left here to prevent a linting error.
  root: 'fui-InfoButton',
  content: 'fui-InfoButton__content',
  trigger: 'fui-InfoButton__trigger',
};

/**
 * Styles for the trigger slot
 */
const useTriggerStyles = makeStyles({
  selected: {
    color: tokens.colorNeutralForeground2BrandPressed,

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },

    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },
});

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { popoverOpen } = state;
  const triggerStyles = useTriggerStyles();

  state.content.className = mergeClasses(infoButtonClassNames.content, state.content.className);
  state.trigger.className = mergeClasses(
    infoButtonClassNames.trigger,
    popoverOpen && triggerStyles.selected,
    state.trigger.className,
  );

  return state;
};
