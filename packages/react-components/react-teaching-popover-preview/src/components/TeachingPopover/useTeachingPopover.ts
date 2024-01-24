import { usePopover_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';

export const useTeachingPopover_unstable = (props: TeachingPopoverProps): TeachingPopoverState => {
  const popoverState = usePopover_unstable(props);

  return {
    ...popoverState,
    withArrow: props.withArrow ?? true,
    // We trap focus because the default TeachingPopover view has buttons/carousel.
    trapFocus: props.trapFocus ?? true,
  };
};
