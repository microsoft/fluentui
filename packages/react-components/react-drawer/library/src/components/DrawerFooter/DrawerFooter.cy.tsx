import * as React from 'react';
import { mount } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { Drawer } from '../Drawer/Drawer';
import { DrawerBody } from '../DrawerBody/DrawerBody';
import { DrawerFooter } from './DrawerFooter';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerFooter', () => {
  it('should render drawer footer with correct tag name and content', () => {
    mountFluent(<DrawerFooter id="drawer-footer">Content</DrawerFooter>);

    cy.get('#drawer-footer').should('exist');
    cy.get('#drawer-footer').should('match', 'footer');
    cy.get('#drawer-footer').should('have.html', 'Content');
  });

  it('should render top separator when using with DrawerBody', () => {
    mountFluent(
      <Drawer open>
        <DrawerBody id="drawer-body">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, animi? Quos, eum pariatur. Labore magni
          vel doloremque reiciendis, consequatur porro explicabo similique harum illo, ad hic, earum nobis accusantium
          quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eligendi impedit culpa ea ipsum
          voluptate inventore labore, delectus nam veniam dolor debitis dolorem blanditiis in, natus deleniti illo.
          Asperiores, porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati aperiam
          recusandae. Pariatur dolorem cumque odit delectus voluptates ea ipsam culpa voluptate? Praesentium beatae
          corrupti accusamus. Suscipit voluptas natus illo?
        </DrawerBody>
        <DrawerFooter id="drawer-footer">Content</DrawerFooter>
      </Drawer>,
    );

    cy.viewport(600, 300);
    cy.get('#drawer-body').should('exist');

    cy.get('#drawer-body').scrollTo('center');
    cy.get('#drawer-footer').within($el => {
      cy.window().then(win => {
        const before = win.getComputedStyle($el[0], '::before');
        const opacity = before.getPropertyValue('opacity');

        expect(opacity).to.equal('1');
      });
    });
  });
});
