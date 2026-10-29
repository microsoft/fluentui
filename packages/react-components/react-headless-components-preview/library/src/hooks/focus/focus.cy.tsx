import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../../components/Provider';
import { Breadcrumb, BreadcrumbButton, BreadcrumbItem } from '../../components/Breadcrumb';
import { Card } from '../../components/Card';

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
