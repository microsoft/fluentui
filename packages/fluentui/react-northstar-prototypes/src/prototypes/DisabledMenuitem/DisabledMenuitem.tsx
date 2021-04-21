import * as React from 'react';
import { Provider, teamsTheme, Menu } from '@fluentui/react-northstar';

const items = [
  {
    key: 'item1',
    content: 'Item #1',
  },
  {
    key: 'item2',
    content: 'Disabled item',
    disabled: true,
  },
  {
    key: 'item3',
    content: 'Item #3',
  },
];

const DisabledMenuitem: React.FunctionComponent = () => {

  return (
                  <Provider theme={teamsTheme}>
            <h1>Disabled Menuitem Prototype</h1>
<Menu defaultActiveIndex={0} items={items} />
                        </Provider>
  );
}; // End DisabledMenuitem

export default DisabledMenuitem;
