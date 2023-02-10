import * as React from 'react';
import { mount } from '@cypress/react';

import { ContextualMenuExample } from './ContextualMenuExample';

const menuTriggerSelector = '[type="button"]';
const menuSelector = '[role="menu"]';

describe('ContextualMenu in React 18', () => {
  it('renders ContextualMenu when trigger button is clicked', () => {
    mount(
      <React.StrictMode>
        <ContextualMenuExample />
      </React.StrictMode>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('be.visible');
  });
});
