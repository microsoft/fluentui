import * as React from 'react';
import { FocusZone, FocusTrapZone, mergeStyles } from '@fluentui/react';
import type { IFocusTrapZone, IFocusTrapZoneProps } from '@fluentui/react';
import { useGlobal, useProps } from '../../../e2e/utils';
import type { FTZTestGlobals } from './types';

const rootClass = mergeStyles({
  button: {
    height: 30,
    width: 60,
    display: 'block',
  },
  '*:focus': { outline: '2px dashed red' },
});

/** Imperatively focusing the FTZ */
export const ImperativeFocus = () => {
  const props = useProps<IFocusTrapZoneProps>();
  const focusTrapZoneRef = React.useRef<IFocusTrapZone>(null);

  useGlobal<FTZTestGlobals>('imperativeFocus', () => focusTrapZoneRef.current?.focus());

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
