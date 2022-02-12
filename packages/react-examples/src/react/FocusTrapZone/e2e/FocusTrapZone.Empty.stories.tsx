import * as React from 'react';
import { FocusTrapZone, IFocusTrapZoneProps, mergeStyles } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60 },
});

/**
 * Tab and shift-tab do nothing (keep focus where it is) when the FTZ contains 0 tabbable items
 */
export const Empty = () => {
  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();

  React.useEffect(() => {
    (window as FTZTestWindow).setProps = setProps;
  }, []);

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass}>
        <button id="before">before</button>
        <FocusTrapZone forceFocusInsideTrap {...props}>
          <button id="first" tabIndex={-1}>
            first
          </button>
          <button id="mid" tabIndex={-1}>
            mid
          </button>
          <button id="last" tabIndex={-1}>
            last
          </button>
        </FocusTrapZone>
        <button id="after">after</button>
      </div>
    )
  );
};
