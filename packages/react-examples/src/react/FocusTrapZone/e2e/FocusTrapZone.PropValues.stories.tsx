import * as React from 'react';
import { FocusTrapZone, mergeStyles } from '@fluentui/react';
import { useProps } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60, display: 'block' },
  '*:focus': { outline: '2px dashed red' },
});

/** Respects default and explicit prop values */
export const PropValues = () => {
  const [buttonClicked, setButtonClicked] = React.useState('');
  const props = useProps();

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass} onClick={ev => setButtonClicked((ev.target as HTMLButtonElement).textContent || '')}>
        <div id="buttonClicked">{buttonClicked}</div>
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
