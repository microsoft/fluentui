import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarGroupSlots, MessageBarGroupState } from './MessageBarGroup.types';

export const messageBarGroupClassNames: SlotClassNames<MessageBarGroupSlots> = {
  root: 'fui-MessageBarGroup',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  base: {
    animationFillMode: 'forwards',
    animationDuration: tokens.durationNormal,
  },

  enter: {
    animationName: {
      from: {
        opacity: 0,
        transform: 'translateY(-100%)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  exit: {
    animationName: {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
  },
});

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(messageBarGroupClassNames.root, state.root.className);
  state.enterStyles = mergeClasses(styles.base, styles.enter);
  state.exitStyles = mergeClasses(styles.base, styles.exit);
  return state;
};
