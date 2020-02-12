import * as React from 'react';

import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { mergeStyles, IStyle } from '@uifabric/styling';

const flexStyles: IStyle = {
  selectors: {
    '> *': {
      flexShrink: 1,
      textOverflow: 'ellipsis'
    },
    '> *:not(:first-child)': {
      marginTop: 20
    }
  }
};
const outerWrapStyles = mergeStyles({ ...flexStyles, alignItems: 'flex-start' });
const innerWrapStyles = mergeStyles({ ...flexStyles });

export const FocusZoneDisabledExample: React.FunctionComponent = () => {
  return (
    <div className={outerWrapStyles}>
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <div className={innerWrapStyles}>
          <span>Enabled FocusZone: </span>
          <button>Button 1</button>
          <button>Button 2</button>
          <input type="text" placeholder="FocusZone TextField" style={{ width: 200 }} aria-label="FocusZone TextField" />
          <button>Button 3</button>
        </div>
      </FocusZone>
      <button>Tabbable Element 1</button>
      <FocusZone disabled={true}>
        <div className={innerWrapStyles}>
          <span>Disabled FocusZone: </span>
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      </FocusZone>
      <input type="text" placeholder="Tabbable Element 2" aria-label="Tabbable Element 2" />
    </div>
  );
};
