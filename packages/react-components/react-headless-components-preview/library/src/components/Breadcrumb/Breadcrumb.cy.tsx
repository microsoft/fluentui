import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbButton } from './BreadcrumbButton';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('Breadcrumb', () => {
  it('moves focus between items with arrow keys when focusMode is arrow', () => {
    mount(
      <>
        <Breadcrumb focusMode="arrow">
          <BreadcrumbItem>
            <BreadcrumbButton id="first">First</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbButton id="second">Second</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbButton id="third">Third</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        <button id="after">After</button>
      </>,
    );

    cy.get('#first').focus();
    cy.realPress('ArrowRight');
    cy.get('#second').should('be.focused');

    // Only one tab stop in the breadcrumb.
    cy.realPress('Tab');
    cy.get('#after').should('be.focused');
  });
});
