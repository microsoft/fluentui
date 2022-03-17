import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react';
import type { IFocusTrapZoneProps } from '@fluentui/react';
import { useProps } from '../../../e2e/utils';
import { rootClass } from './shared';

/**
 * Tab and shift-tab when the FTZ contains 0 tabbable items
 */
export const NoTabbableItems = () => {
  const props = useProps<IFocusTrapZoneProps>();

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
