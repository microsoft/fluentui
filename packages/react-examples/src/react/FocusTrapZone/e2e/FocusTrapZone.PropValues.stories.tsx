import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react';
import type { IFocusTrapZoneProps } from '@fluentui/react';
import { useProps } from '../../../e2e/utils';
import { rootClass } from './shared';

/** Respects default and explicit prop values */
export const PropValues = () => {
  const [buttonClicked, setButtonClicked] = React.useState('');
  const props = useProps<IFocusTrapZoneProps>();

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass} onClick={ev => setButtonClicked((ev.target as HTMLButtonElement).textContent || '')}>
        <span id="buttonClicked" style={{ display: 'block' /* avoid inherited div styling */ }}>
          clicked {buttonClicked}
        </span>
        <button>before</button>
        <FocusTrapZone {...props}>
          <button>first</button>
          <button>mid</button>
          <button className="last-class" id="last">
            last
          </button>
        </FocusTrapZone>
        <button>after</button>
      </div>
    )
  );
};
