import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';

import { Provider } from '../Provider/Provider';

const mount = (element: React.ReactElement) => {
  mountBase(<Provider>{element}</Provider>);
};

describe('Menu', () => {
  it('should render a Menu', () => {
    mount(
      <Menu>
        <MenuTrigger>
          <button>Click Me</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    cy.get('button').click().get('.fui-MenuList').should('exist');
  });
});
