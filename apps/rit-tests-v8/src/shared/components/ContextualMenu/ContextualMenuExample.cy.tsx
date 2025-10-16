import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { ContextualMenuExample } from './ContextualMenuExample';

const menuTriggerSelector = '[type="button"]';
const menuSelector = '[role="menu"]';

describe('ContextualMenu', () => {
  it('renders ContextualMenu when trigger button is clicked', () => {
    mount(<ContextualMenuExample />);

    cy.get(menuTriggerSelector).click().get(menuSelector).should('be.visible');
  });
});
