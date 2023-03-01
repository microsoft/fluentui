import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagButtonState, TagButtonSlots } from './TagButton.types';

/**
 * Render the final JSX of TagButton
 */
export const renderTagButton_unstable = (state: TagButtonState) => {
  const { slots, slotProps } = getSlots<TagButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <button className="content">
        <div className="persona">
          <img
            height="32"
            width="32"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/office-ui-fabric-react-assets/persona-male.png"
          />
        </div>
        <div className="icon">i</div>
        <div className="primary">Primary Text</div>
        <div className="secondary">Secondary Text</div>
      </button>
      <div className="dismiss">
        <button>x</button>
      </div>
    </slots.root>
  );
};
