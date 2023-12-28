import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

export function useTeachingPopoverContextValues_unstable(state: TeachingPopoverState): TeachingPopoverContextValues {
  const { currentPage, setCurrentPage, totalPages, setTotalPages, appearance } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const teachingPopover = { currentPage, setCurrentPage, totalPages, setTotalPages, appearance };

  return { teachingPopover };
}
