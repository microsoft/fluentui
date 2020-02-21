import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { mergeStyles } from '@uifabric/styling';
import { KeyCodes, createArray, getRTLSafeKeyCode } from '@uifabric/utilities';

const ITEMS = createArray(10, index => ({
  key: index.toString(),
  name: 'Item-' + index,
  url: 'http://placehold.it/100x' + (100 + index!)
}));

const listStyles = mergeStyles({
  borderColor: 'transparent',
  borderBottomColor: 'lightgray',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxSizing: 'border-box',
  padding: '5px 10px',

  selectors: {
    ':focus': {
      border: '1px solid black'
    }
  }
});
const listItemStyles = mergeStyles({
  margin: '0 10px'
});

export const FocusZoneListExample: React.FunctionComponent = () => {
  return (
    <FocusZone direction={FocusZoneDirection.vertical} isCircularNavigation={true} isInnerZoneKeystroke={_isInnerZoneKeystroke} role="grid">
      {ITEMS.map((item, index) => (
        <FocusZone data-is-focusable={true} direction={FocusZoneDirection.horizontal} className={listStyles}>
          <span className={listItemStyles}>{item.name}</span>
          <a href={item.url} className={listItemStyles}>
            {item.url}
          </a>
          <input type="text" value={`ReadOnly ${item.name}`} readOnly className={listItemStyles} />
          <input type="text" value={item.name} className={listItemStyles} />
        </FocusZone>
      ))}
    </FocusZone>
  );
};

function _isInnerZoneKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
  return ev.which === getRTLSafeKeyCode(KeyCodes.right);
}
