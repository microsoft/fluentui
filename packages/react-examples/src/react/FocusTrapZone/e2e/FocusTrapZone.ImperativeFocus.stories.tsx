import * as React from 'react';
import { FocusZone, FocusTrapZone, mergeStyles, IFocusTrapZone, IFocusTrapZoneProps } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

const rootClass = mergeStyles({
  button: {
    height: 30,
    width: 60,
    display: 'block',
  },
});

/** Imperatively focusing the FTZ */
export const ImperativeFocus = () => {
  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();
  const focusTrapZoneRef = React.useRef<IFocusTrapZone>(null);

  (window as FTZTestWindow).setProps = setProps;
  (window as FTZTestWindow).imperativeFocus = () => focusTrapZoneRef.current?.focus();

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
