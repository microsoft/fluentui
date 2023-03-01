import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagState, TagSlots } from './Tag.types';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState) => {
  const { slots, slotProps } = getSlots<TagSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <span className="content">
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
      </span>
      <div className="dismiss">
        <button>x</button>
      </div>
    </slots.root>
  );
};
