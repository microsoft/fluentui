import * as React from 'react';
import { FocusTrapZone, IFocusTrapZoneProps, mergeStyles } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60 },
});

/**
 * Tab and shift-tab when the FTZ contains 0 tabbable items
 */
export const NoTabbableItems = () => {
  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();

  (window as FTZTestWindow).setProps = setProps;

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
