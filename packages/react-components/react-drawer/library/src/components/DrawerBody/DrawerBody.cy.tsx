import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerBody } from './DrawerBody';
import type { JSXElement } from '@fluentui/react-utilities';
import { DrawerProvider, useDrawerContextValue } from '../../contexts';

const mountFluent = (element: JSXElement) => {
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

  it('updates scrollState when children change from short to long', () => {
    const shortContent = 'Short content';
    const longContent = Array(50)
      .fill(
        'lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, animi? Quos, eum pariatur. Labore magni vel doloremque reiciendis, consequatur porro explicabo similique harum illo, ad hic, earum nobis accusantium quasi?',
      )
      .join(' ');

    const Example = () => {
      const context = useDrawerContextValue();
      const [showLong, setShowLong] = React.useState(false);

      return (
        <DrawerProvider value={context}>
          <div id="scroll-state">{context.scrollState}</div>

          <DrawerBody id="drawer-body" style={{ height: '200px' }}>
            {showLong ? longContent : shortContent}
          </DrawerBody>

          <button id="toggle-content" onClick={() => setShowLong(s => !s)}>
            Toggle
          </button>
        </DrawerProvider>
      );
    };

    mountFluent(<Example />);

    // Initially short content should result in 'none'
    cy.get('#drawer-body').should('exist');
    cy.get('#scroll-state').should('have.text', 'none');

    // Toggle to long content and assert context scroll state updates to 'top'
    cy.get('#toggle-content').click();
    cy.get('#scroll-state').should('have.text', 'top');

    // Scroll to bottom and assert it becomes 'bottom'
    cy.get('#drawer-body')
      .scrollTo('bottom')
      // wait for any rAF-based updates and then assert the scrollState
      .then(() => cy.get('#scroll-state').should('have.text', 'bottom'));
  });
});
