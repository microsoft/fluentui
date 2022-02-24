import * as React from 'react';
import { FocusTrapZone, mergeStyles } from '@fluentui/react';
import { useProps } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60 },
  '*:focus': { outline: '2px dashed red' },
});

/**
 * Tab and shift-tab when the FTZ contains 0 tabbable items
 */
export const NoTabbableItems = () => {
  const props = useProps();

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass}>
        <button>before</button>
        <FocusTrapZone forceFocusInsideTrap {...props}>
          <button tabIndex={-1}>first</button>
          <button tabIndex={-1}>mid</button>
          <button tabIndex={-1}>last</button>
        </FocusTrapZone>
        <button>after</button>
      </div>
    )
  );
};
