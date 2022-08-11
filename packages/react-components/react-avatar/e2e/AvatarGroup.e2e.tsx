import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { AvatarGroupOverflow, AvatarGroupItem } from '@fluentui/react-avatar';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const overflowTriggerSelector = '[type="button"]';

describe('AvatarGroup', () => {
  describe('AvatarGroupOverflow', () => {
    beforeEach(() => {
      mount(
        <AvatarGroupOverflow content={{ id: 'content-id' }}>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupOverflow>,
      );
    });

    it('opens popover and focuses on the content', () => {
      cy.get(overflowTriggerSelector).realClick();
      cy.get('#content-id').should('have.focus');
    });
  });
});
