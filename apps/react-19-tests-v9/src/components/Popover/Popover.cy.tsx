import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { CustomPopover as Popover } from './Popover';
import { Provider } from '../Provider/Provider';

const mount = (element: JSXElement) => {
  mountBase(<Provider>{element}</Provider>);
};

describe('Popover with React 18', () => {
  it('should render a Popover', () => {
    mount(<Popover />);

    cy.get('button').click().get('.fui-PopoverSurface').should('exist');
  });
});
