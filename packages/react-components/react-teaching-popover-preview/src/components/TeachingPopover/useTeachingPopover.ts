import { usePopover_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';
import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';

export const useTeachingPopover_unstable = (props: TeachingPopoverProps): TeachingPopoverState => {
  const popoverState = usePopover_unstable(props);
  const { onFinish, onPageChange } = props;

  // ToDo: Imperative setCurrentPage hook
  const [currentPage, setCurrentPage] = useControllableState({
    initialState: 0,
    defaultState: props.currentPage,
    state: props.currentPage,
  });

  const [totalPages, setTotalPages] = React.useState<number>(1);

  return {
    ...popoverState,
    appearance: props.appearance,
    withArrow: props.withArrow ?? true,
    currentPage,
    // We trap focus because the default view has buttons/carousel.
    trapFocus: props.trapFocus ?? true,
    setCurrentPage,
    totalPages,
    setTotalPages,
    onFinish,
    onPageChange,
  };
};
