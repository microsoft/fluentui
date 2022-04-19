import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SpinButtonState, SpinButtonSlots } from './SpinButton.types';

/**
 * Render the final JSX of SpinButton
 */
export const renderSpinButton_unstable = (state: SpinButtonState) => {
  // Leaving this here for now.
  // This is the approach using react-input's Input component.
  // It has some Typescript problems and feels hacky.
  // const { slots, slotProps } = getSlots<SpinButtonSlots>(state);

  // const { contentAfter, ...otherInputSlotProps } = slotProps.input as SpinButtonSlots['input'];
  // const inputContentAfter = {
  //   ...contentAfter,
  //   children: (
  //     <>
  //       <slots.incrementButton {...slotProps.incrementButton} />
  //       <slots.decrementButton {...slotProps.decrementButton} />
  //     </>
  //   ),
  // };

  // return (
  //   <slots.root {...slotProps.root}>
  //     <slots.input {...otherInputSlotProps} contentAfter={inputContentAfter}/>
  //   </slots.root>
  // );

  const { slots, slotProps } = getSlots<SpinButtonSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.incrementButton {...slotProps.incrementButton} />
      <slots.decrementButton {...slotProps.decrementButton} />
    </slots.root>
  );
};
