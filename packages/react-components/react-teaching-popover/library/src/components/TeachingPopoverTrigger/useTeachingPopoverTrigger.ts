import { TeachingPopoverTriggerProps, TeachingPopoverTriggerState } from './TeachingPopoverTrigger.types';
import { usePopoverTrigger_unstable } from '@fluentui/react-popover';

/**
 * Create the state required to render TeachingPopoverTrigger.
 *
 * @param props - props from this instance of TeachingPopoverTrigger
 */
export const useTeachingPopoverTrigger_unstable = (props: TeachingPopoverTriggerProps): TeachingPopoverTriggerState => {
  const state = usePopoverTrigger_unstable(props);

  return state;
};
