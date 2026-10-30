import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../../components/Provider';
import { Breadcrumb, BreadcrumbButton, BreadcrumbItem } from '../../components/Breadcrumb';
import { Card } from '../../components/Card';
import { Menu, MenuItem, MenuList, MenuPopover, MenuSplitGroup, MenuTrigger } from '../../components/Menu';
import { Tag } from '../../components/Tag';
import { TagGroup } from '../../components/TagGroup';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('Breadcrumb focusMode', () => {
  it('navigates with arrow keys when focusMode is "arrow"', () => {
    mount(
      <Breadcrumb focusMode="arrow" aria-label="Breadcrumb">
        <BreadcrumbItem>
          <BreadcrumbButton>Home</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbButton current>Docs</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    cy.contains('Home').focus().realPress('ArrowRight');
    cy.contains('Docs').should('be.focused').realPress('ArrowRight');
    cy.contains('Home').should('be.focused');
  });
});

describe('Card focusMode', () => {
  const Example = ({ focusMode }: { focusMode: 'no-tab' | 'tab-exit' | 'tab-only' }) => (
    <>
      <button>Before</button>
      <Card focusMode={focusMode} data-testid="card">
        <button>Inner first</button>
        <button>Inner last</button>
      </Card>
      <button>After</button>
    </>
  );

  it('no-tab: Enter enters, Tab is trapped, Escape exits', () => {
    mount(<Example focusMode="no-tab" />);

    cy.contains('Before').focus().realPress('Tab');
    cy.get('[data-testid=card]').should('be.focused').realPress('Tab');
    cy.contains('After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.get('[data-testid=card]').should('be.focused').realPress('Enter');
    cy.contains('Inner first').should('be.focused').realPress('Tab');
    cy.contains('Inner last').should('be.focused').realPress('Tab');
    cy.contains('Inner first').should('be.focused').realPress('Escape');
    cy.get('[data-testid=card]').should('be.focused');
  });

  it('tab-exit: Tab leaves the card after the last inner element', () => {
    mount(<Example focusMode="tab-exit" />);

    cy.get('[data-testid=card]').focus().realPress('Enter');
    cy.contains('Inner first').should('be.focused').realPress('Tab');
    cy.contains('Inner last').should('be.focused').realPress('Tab');
    cy.contains('After').should('be.focused');
  });

  it('tab-only: Tab walks through the inner elements', () => {
    mount(<Example focusMode="tab-only" />);

    cy.get('[data-testid=card]').focus().realPress('Tab');
    cy.contains('Inner first').should('be.focused').realPress('Tab');
    cy.contains('Inner last').should('be.focused').realPress('Tab');
    cy.contains('After').should('be.focused');
  });
});

describe('TagGroup dismiss', () => {
  const Example = () => {
    const [tags, setTags] = React.useState(['one', 'two', 'three']);
    return (
      <TagGroup onDismiss={(_, data) => setTags(current => current.filter(tag => tag !== data.value))}>
        {tags.map(tag => (
          <Tag key={tag} value={tag} dismissible>
            {tag}
          </Tag>
        ))}
      </TagGroup>
    );
  };

  it('moves focus to the next tag, then to the previous one after the last tag', () => {
    mount(<Example />);

    cy.contains('two').closest('button').focus().realPress('Delete');
    cy.contains('three').closest('button').should('be.focused').realPress('Delete');
    cy.contains('one').closest('button').should('be.focused');
  });
});

describe('MenuSplitGroup', () => {
  it('moves focus between the split items with the inline arrow keys', () => {
    mount(
      <Menu open>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Before</MenuItem>
            <MenuSplitGroup>
              <MenuItem>Main</MenuItem>
              <MenuItem>Secondary</MenuItem>
            </MenuSplitGroup>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    cy.contains('[role=menuitem]', 'Main').focus().realPress('ArrowRight');
    cy.contains('[role=menuitem]', 'Secondary').should('be.focused').realPress('ArrowLeft');
    cy.contains('[role=menuitem]', 'Main').should('be.focused');
  });
});
