import { TeachingBubbleTriggerProps, TeachingBubbleTriggerState } from './TeachingBubbleTrigger.types';
import { usePopoverTrigger_unstable } from '@fluentui/react-popover';

/**
 * Create the state required to render TeachingBubbleTrigger.
 *
 * The returned state can be modified with hooks such as useTeachingBubbleTriggerStyles,
 * before being passed to renderTeachingBubbleTrigger_unstable.
 *
 * @param props - props from this instance of TeachingBubbleTrigger
 */
export const useTeachingBubbleTrigger_unstable = (props: TeachingBubbleTriggerProps): TeachingBubbleTriggerState => {
  const state = usePopoverTrigger_unstable(props);

  return state;
};
