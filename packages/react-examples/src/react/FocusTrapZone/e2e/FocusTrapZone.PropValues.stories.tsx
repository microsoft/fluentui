import * as React from 'react';
import { FocusTrapZone, IFocusTrapZoneProps, mergeStyles } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

const rootClass = mergeStyles({
  button: { height: 30, width: 60, display: 'block' },
});

/** Focus behavior based on default and explicit prop values */
export const PropValues = () => {
  const [buttonClicked, setButtonClicked] = React.useState('');
  const onClick = (ev: React.MouseEvent<HTMLElement>) =>
    setButtonClicked((ev.target as HTMLButtonElement).textContent || '');

  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();

  (window as FTZTestWindow).setProps = setProps;

  return (
    // don't render until props have been set
    props && (
      <div className={rootClass} onClick={onClick}>
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
