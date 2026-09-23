import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';
import type { JSXElement } from '@fluentui/react-utilities';
import { AvatarGroupPopover } from '../AvatarGroupPopover';
import { AvatarGroupItem } from '../AvatarGroupItem';

const mount = (element: JSXElement) => {
  mountBase(<Provider>{element}</Provider>);
};

const overflowTriggerSelector = '[type="button"]';

describe('AvatarGroup', () => {
  describe('AvatarGroupOverflow', () => {
    beforeEach(() => {
      mount(
        <AvatarGroupPopover popoverSurface={{ id: 'surface-id' }}>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupPopover>,
      );
    });

    it('opens popover and focuses on the content', () => {
      cy.get(overflowTriggerSelector).realClick();
      cy.get('#surface-id').should('have.focus');
    });
  });
});
