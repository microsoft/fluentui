import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import {
  FluentProvider,
  teamsLightTheme,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Dialog,
  DialogSurface,
  DialogTrigger,
  DialogBody,
} from '@fluentui/react-components';

const mount = (element: JSX.Element) => {
  mountBase(
    <React.StrictMode>
      <FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>
    </React.StrictMode>,
  );
};

describe('Portal based components', () => {
  it('should render a Popover', () => {
    mount(
      <Popover>
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>,
    );

    cy.get('button').click().get('.fui-PopoverSurface').should('exist');
  });

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

  it('should render a Dialog', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );

    cy.get('button').click().get('.fui-DialogSurface').should('exist');
  });
});
