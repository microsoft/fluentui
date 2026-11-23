import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';
import { Button as StyledButton } from '@fluentui/react-button';
import { Combobox as StyledCombobox, Option as StyledOption } from '@fluentui/react-combobox';
import {
  Dialog as StyledDialog,
  DialogBody as StyledDialogBody,
  DialogSurface as StyledDialogSurface,
  DialogTitle as StyledDialogTitle,
  DialogTrigger as StyledDialogTrigger,
} from '@fluentui/react-dialog';
import {
  Menu as StyledMenu,
  MenuItem as StyledMenuItem,
  MenuList as StyledMenuList,
  MenuPopover as StyledMenuPopover,
  MenuTrigger as StyledMenuTrigger,
} from '@fluentui/react-menu';

import { Provider as HeadlessProvider } from '../components/Provider';
import {
  Dialog as HeadlessDialog,
  DialogBody as HeadlessDialogBody,
  DialogSurface as HeadlessDialogSurface,
  DialogTitle as HeadlessDialogTitle,
  DialogTrigger as HeadlessDialogTrigger,
} from '../components/Dialog';
import {
  Menu as HeadlessMenu,
  MenuItem as HeadlessMenuItem,
  MenuList as HeadlessMenuList,
  MenuPopover as HeadlessMenuPopover,
  MenuTrigger as HeadlessMenuTrigger,
} from '../components/Menu';
import { Tab as HeadlessTab, TabList as HeadlessTabList } from '../components/TabList';

polyfillBodyAndObserve();

const mount = (element: JSXElement) =>
  mountBase(
    <FluentProvider theme={teamsLightTheme}>
      <HeadlessProvider>{element}</HeadlessProvider>
    </FluentProvider>,
  );

type PopupPlacement = 'portal' | 'inline' | 'dialog-mount-node';

const HeadlessDialogWithStyledCombobox = ({ placement }: { placement: PopupPlacement }) => {
  const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);

  return (
    <HeadlessDialog>
      <HeadlessDialogTrigger>
        <button id="open-headless-dialog">Open dialog</button>
      </HeadlessDialogTrigger>
      <HeadlessDialogSurface>
        <HeadlessDialogBody>
          <HeadlessDialogTitle>Assign issue</HeadlessDialogTitle>
          <button id="outside-combobox">Other dialog action</button>
          <HeadlessDialogTrigger action="close">
            <button id="close-headless-dialog">Close dialog</button>
          </HeadlessDialogTrigger>
          <div ref={setMountNode} />
          <StyledCombobox
            aria-label="Assignee"
            id="assignee-combobox"
            inlinePopup={placement === 'inline'}
            mountNode={placement === 'dialog-mount-node' ? mountNode : undefined}
          >
            <StyledOption value="ada">Ada Lovelace</StyledOption>
            <StyledOption value="grace">Grace Hopper</StyledOption>
          </StyledCombobox>
        </HeadlessDialogBody>
      </HeadlessDialogSurface>
    </HeadlessDialog>
  );
};

describe('headless and styled v9 interop', () => {
  (['inline', 'dialog-mount-node'] as const).forEach(placement => {
    it(`selects a styled Combobox option inside a headless modal Dialog (${placement})`, () => {
      mount(<HeadlessDialogWithStyledCombobox placement={placement} />);

      cy.get('#open-headless-dialog').realClick();
      cy.get('#assignee-combobox').realClick();
      cy.get('[role="option"]').contains('Ada Lovelace').realClick();

      cy.get('#assignee-combobox').should('have.value', 'Ada Lovelace').and('have.focus');
    });
  });

  it('documents that a body-portaled styled Combobox closes its headless modal Dialog on option click', () => {
    mount(<HeadlessDialogWithStyledCombobox placement="portal" />);

    cy.get('#open-headless-dialog').realClick();
    cy.get('#assignee-combobox').realClick();
    cy.get('[role="option"]').contains('Ada Lovelace').realClick();

    cy.get('dialog[data-open]').should('not.exist');
    cy.get('#open-headless-dialog').should('have.focus');
  });

  it('dismisses the styled Combobox before closing its headless modal Dialog', () => {
    mount(<HeadlessDialogWithStyledCombobox placement="portal" />);

    cy.get('#open-headless-dialog').realClick();
    cy.get('#assignee-combobox').realClick();
    cy.get('[role="listbox"]').should('be.visible');

    cy.get('#assignee-combobox').realPress('Escape');
    cy.get('dialog[data-open]').should('exist');
    cy.get('#assignee-combobox').should('have.attr', 'aria-expanded', 'false');
    cy.get('#assignee-combobox').should('have.focus');

    cy.get('#assignee-combobox').realPress('Escape');
    cy.get('dialog[data-open]').should('not.exist');
    cy.get('#open-headless-dialog').should('have.focus');
  });

  it('light-dismisses the styled Combobox without dismissing its headless modal Dialog', () => {
    mount(<HeadlessDialogWithStyledCombobox placement="portal" />);

    cy.get('#open-headless-dialog').realClick();
    cy.get('#assignee-combobox').realClick();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('#outside-combobox').realClick();

    cy.get('#assignee-combobox').should('have.attr', 'aria-expanded', 'false');
    cy.get('dialog[data-open]').should('exist');
  });

  it('unmounts and resets the styled Combobox popup when its headless modal Dialog closes', () => {
    mount(<HeadlessDialogWithStyledCombobox placement="portal" />);

    cy.get('#open-headless-dialog').realClick();
    cy.get('#assignee-combobox').realClick();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('#close-headless-dialog').realClick();

    cy.get('dialog[data-open]').should('not.exist');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('#open-headless-dialog').should('have.focus').realClick();
    cy.get('dialog[data-open]').should('exist');
    cy.get('#assignee-combobox').should('have.attr', 'aria-expanded', 'false');
  });

  it('documents that a body-portaled styled Menu cannot focus items in a headless modal Dialog', () => {
    mount(
      <HeadlessDialog>
        <HeadlessDialogTrigger>
          <button id="open-headless-menu-dialog">Open dialog</button>
        </HeadlessDialogTrigger>
        <HeadlessDialogSurface>
          <HeadlessDialogBody>
            <HeadlessDialogTitle>Edit issue</HeadlessDialogTitle>
            <StyledMenu>
              <StyledMenuTrigger disableButtonEnhancement>
                <StyledButton id="styled-menu-trigger">More actions</StyledButton>
              </StyledMenuTrigger>
              <StyledMenuPopover>
                <StyledMenuList>
                  <StyledMenuItem>Save draft</StyledMenuItem>
                  <StyledMenuItem>Close issue</StyledMenuItem>
                </StyledMenuList>
              </StyledMenuPopover>
            </StyledMenu>
          </HeadlessDialogBody>
        </HeadlessDialogSurface>
      </HeadlessDialog>,
    );

    cy.get('#open-headless-menu-dialog').realClick();
    cy.get('#styled-menu-trigger').realClick();
    cy.get('[role="menu"]').should('be.visible');
    cy.get('[role="menuitem"]').first().should('not.be.focused');
    cy.get('dialog[data-open]').should('exist');
  });

  it('keeps focusgroup tab navigation and Tabster focus containment working together', () => {
    mount(
      <StyledDialog>
        <StyledDialogTrigger disableButtonEnhancement>
          <StyledButton id="open-styled-dialog">Open settings</StyledButton>
        </StyledDialogTrigger>
        <StyledDialogSurface>
          <StyledDialogBody>
            <StyledDialogTitle>Settings</StyledDialogTitle>
            <button id="before-tabs">Before tabs</button>
            <HeadlessTabList aria-label="Settings" defaultSelectedValue="general">
              <HeadlessTab value="general">General</HeadlessTab>
              <HeadlessTab value="security">Security</HeadlessTab>
              <HeadlessTab value="notifications">Notifications</HeadlessTab>
            </HeadlessTabList>
            <button id="after-tabs">After tabs</button>
          </StyledDialogBody>
        </StyledDialogSurface>
      </StyledDialog>,
    );

    cy.get('#open-styled-dialog').realClick();
    cy.get('#before-tabs').focus().realPress('Tab');
    cy.get('[role="tab"]').eq(0).should('have.focus');

    cy.focused().realPress('ArrowRight');
    cy.get('[role="tab"]').eq(1).should('have.focus');
    cy.focused().realPress('Enter');
    cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');

    cy.focused().realPress('Tab');
    cy.get('#after-tabs').should('have.focus');
    cy.focused().realPress(['Shift', 'Tab']);
    cy.get('[role="tab"]').eq(1).should('have.focus');

    cy.focused().realPress('Escape');
    cy.get('#open-styled-dialog').should('have.focus');
  });

  it('dismisses a native headless Menu without dismissing its styled modal Dialog', () => {
    const onAction = cy.stub().as('headlessMenuAction');
    mount(
      <StyledDialog>
        <StyledDialogTrigger disableButtonEnhancement>
          <StyledButton id="open-styled-menu-dialog">Open settings</StyledButton>
        </StyledDialogTrigger>
        <StyledDialogSurface>
          <StyledDialogBody>
            <StyledDialogTitle>Settings</StyledDialogTitle>
            <HeadlessMenu>
              <HeadlessMenuTrigger>
                <button id="headless-menu-trigger">More actions</button>
              </HeadlessMenuTrigger>
              <HeadlessMenuPopover>
                <HeadlessMenuList>
                  <HeadlessMenuItem onClick={onAction}>Reset settings</HeadlessMenuItem>
                  <HeadlessMenuItem>Close settings</HeadlessMenuItem>
                </HeadlessMenuList>
              </HeadlessMenuPopover>
            </HeadlessMenu>
          </StyledDialogBody>
        </StyledDialogSurface>
      </StyledDialog>,
    );

    cy.get('#open-styled-menu-dialog').realClick();
    cy.get('#headless-menu-trigger').realClick();
    cy.get('[role="menu"]').should('be.visible');
    cy.get('[role="menuitem"]').first().should('have.focus');
    cy.focused().realPress('ArrowDown');
    cy.get('[role="menuitem"]').eq(1).should('have.focus');

    cy.focused().realPress('Escape');
    cy.get('[role="menu"]').should('not.be.visible');
    cy.get('div[role="dialog"]').should('exist');
    cy.get('#headless-menu-trigger').should('have.focus');

    cy.get('#headless-menu-trigger').realClick();
    cy.get('[role="menuitem"]').realClick();
    cy.get('@headlessMenuAction').should('have.been.calledOnce');
    cy.get('div[role="dialog"]').should('exist');

    cy.get('#headless-menu-trigger').realPress('Escape');
    cy.get('div[role="dialog"]').should('not.exist');
    cy.get('#open-styled-menu-dialog').should('have.focus');
  });
});
