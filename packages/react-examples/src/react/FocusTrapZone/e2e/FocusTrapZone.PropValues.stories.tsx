import * as React from 'react';
import { FocusTrapZone, IFocusTrapZoneProps, mergeStyles } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60, display: 'block' },
});

/** Focus behavior based on default and explicit prop values */
export const PropValues = () => {
  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();

  React.useEffect(() => {
    (window as FTZTestWindow).setProps = setProps;
  }, []);

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass}>
        <button id="before">before</button>
        <FocusTrapZone {...props}>
          <button id="first">first</button>
          <button id="mid">mid</button>
          <button id="last" className="last-class">
            last
          </button>
        </FocusTrapZone>
        <button id="after">after</button>
      </div>
    )
  );
};
