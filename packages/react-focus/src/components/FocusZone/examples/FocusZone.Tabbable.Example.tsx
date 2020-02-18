import * as React from 'react';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react-focus';
import { mergeStyles, IStyle } from '@uifabric/styling';

const flexStyles: IStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'nowrap',
  height: 'auto',
  width: 'auto',
  selectors: {
    '> *': {
      flexShrink: 1,
      textOverflow: 'ellipsis'
    }
  }
};
const outerWrapStyles = mergeStyles({
  ...flexStyles,
  alignItems: 'flex-start',
  flexDirection: 'column',
  selectors: {
    ...flexStyles.selectors,
    '> *:not(:first-child)': {
      marginTop: 20
    }
  }
});
const innerWrapStyles = mergeStyles({
  ...flexStyles,
  alignItems: 'center',
  flexDirection: 'row',
  selectors: {
    ...flexStyles.selectors,
    '> *:not(:first-child)': {
      marginLeft: 20
    }
  }
});
const textFieldStyles = mergeStyles({ width: 200 });

export const FocusZoneTabbableExample: React.FunctionComponent = () => {
  return (
    <div className={outerWrapStyles}>
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.all} isCircularNavigation={true}>
        <div className={innerWrapStyles}>
          <span>Circular Tabbable FocusZone: </span>
          <button>Button 1</button>
          <button>Button 2</button>
          <input type="text" placeholder="FocusZone TextField" className={textFieldStyles} aria-label="FocusZone TextField" />
          <button>Button 3</button>
        </div>
      </FocusZone>
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.inputOnly} isCircularNavigation={false}>
        <div className={innerWrapStyles}>
          <span>Input Only FocusZone: </span>
          <button>Button 1</button>
          <button>Button 2</button>
          <input type="text" placeholder="FocusZone TextField" className={textFieldStyles} aria-label="FocusZone TextField" />
          <button>Button 3</button>
        </div>
      </FocusZone>
    </div>
  );
};
