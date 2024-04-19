import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { AvatarGroupPopover, AvatarGroupItem } from '@fluentui/react-avatar';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
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
