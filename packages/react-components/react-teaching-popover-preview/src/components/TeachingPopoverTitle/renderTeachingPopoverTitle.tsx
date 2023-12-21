/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverTitleSlots } from './TeachingPopoverTitle.types';

/**
 * Render the final JSX of TeachingPopoverTitle
 */
export const renderTeachingPopoverTitle_unstable = (state: TeachingPopoverTitleState) => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverTitleSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      {slots.dismissButton && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
