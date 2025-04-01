import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { CustomPopover as Popover } from './Popover';
import { Provider } from '../Provider/Provider';

const mount = (element: React.JSX.Element) => {
  mountBase(<Provider>{element}</Provider>);
};

describe('Popover with React 18', () => {
  it('should render a Popover', () => {
    mount(<Popover />);

    cy.get('button').click().get('.fui-PopoverSurface').should('exist');
  });
});
