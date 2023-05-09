/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagState, TagSlots, TagContextValues } from './Tag.types';
import { TagContext } from './TagContext';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState, contextValues: TagContextValues) => {
  const { slots, slotProps } = getSlotsNext<TagSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <TagContext.Provider value={contextValues.tag}>
        {slotProps.root.children}
        {slots.dismissButton && <slots.dismissButton {...slotProps.dismissButton} />}
      </TagContext.Provider>
    </slots.root>
  );
};
