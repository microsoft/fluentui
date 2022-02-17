import * as React from 'react';
import { FocusZone, FocusTrapZone, mergeStyles, IFocusTrapZone } from '@fluentui/react';
import { useGlobal, useProps } from './shared';

const rootClass = mergeStyles({
  button: {
    height: 30,
    width: 60,
    display: 'block',
  },
});

/** Imperatively focusing the FTZ */
export const ImperativeFocus = () => {
  const props = useProps();
  const focusTrapZoneRef = React.useRef<IFocusTrapZone>(null);

  useGlobal('imperativeFocus', () => focusTrapZoneRef.current?.focus());

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass}>
        <FocusTrapZone disableFirstFocus componentRef={focusTrapZoneRef} {...props}>
          <button>first</button>
          <FocusZone>
            <button>mid</button>
            <button>last</button>
          </FocusZone>
        </FocusTrapZone>
        <button>after</button>
      </div>
    )
  );
};
