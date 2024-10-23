import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerBody } from './DrawerBody';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

function assertScrollPosition(element: HTMLElement, position: number) {
  expect(element.scrollTop).to.equal(position);
}

describe('DrawerBody', () => {
  it('should render drawer body and be scrollable', () => {
    const Example = () => (
      <DrawerBody id="drawer-body" style={{ height: '200px' }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, animi? Quos, eum pariatur. Labore magni vel
        doloremque reiciendis, consequatur porro explicabo similique harum illo, ad hic, earum nobis accusantium quasi?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eligendi impedit culpa ea ipsum voluptate
        inventore labore, delectus nam veniam dolor debitis dolorem blanditiis in, natus deleniti illo. Asperiores,
        porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati aperiam recusandae. Pariatur
        dolorem cumque odit delectus voluptates ea ipsam culpa voluptate? Praesentium beatae corrupti accusamus.
        Suscipit voluptas natus illo?
      </DrawerBody>
    );

    mountFluent(<Example />);

    cy.get('#drawer-body').should('exist');
    cy.get('#drawer-body')
      .scrollTo('bottom')
      .should($e => assertScrollPosition($e[0], $e[0].scrollHeight - $e[0].clientHeight));

    cy.get('#drawer-body')
      .scrollTo('top')
      .should($e => assertScrollPosition($e[0], 0));
  });
});
