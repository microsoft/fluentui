import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { LabelState } from './Label.types';
import { labelShorthandProps } from './useLabel';
import { ToggleButton } from '@fluentui/react-button';
import { InfoIcon } from '@fluentui/react-icons-mdl2';

/**
 * Render the final JSX of Label
 */
export const renderLabel = (state: LabelState) => {
  const { slots, slotProps } = getSlots(state, labelShorthandProps);

  return (
    <>
      <slots.root {...slotProps.root}>
        {state.children}
        {state.info?.children && <ToggleButton iconOnly icon={<InfoIcon />} size="small" transparent subtle />}
      </slots.root>
    </>
  );
};
