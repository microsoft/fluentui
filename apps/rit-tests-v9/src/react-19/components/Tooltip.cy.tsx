import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuTrigger,
  MenuPopover,
  webLightTheme,
  Tooltip,
  FluentProvider,
  tooltipClassNames,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(
    <React.StrictMode>
      <FluentProvider theme={webLightTheme}>{element}</FluentProvider>
    </React.StrictMode>,
  );
};

// https://github.com/microsoft/fluentui/issues/34296
describe('Tooltip visibility with strict mode', () => {
  it('should show Tooltip inside a Menu when opened by keyboard', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Edit content</MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <Tooltip content="Cut to clipboard" relationship="description">
              <MenuItem>Menu Item</MenuItem>
            </Tooltip>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    cy.realPress('Tab');
    cy.get('button').focus().realPress('Enter');
    cy.get('[role="menuitem"]').should('be.focused');
    cy.get(`.${tooltipClassNames.content}`).should('be.visible');
  });
});
