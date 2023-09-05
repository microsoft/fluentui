import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const popoverTriggerSelector = '[aria-expanded]';
const popoverContentSelector = '[role="group"]';

describe('Popover', () => {
  const UncontrolledExample = () => (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>This is a popover</PopoverSurface>
    </Popover>
  );

  describe('uncontrolled', () => {
    const Example = UncontrolledExample;

    beforeEach(() => {
      mount(<Example />);
      cy.get('body').click('bottomRight');
    });

    it('should dismiss on click outside', () => {
      cy.get(popoverTriggerSelector)
        .click()
        .get('body')
        .click('bottomRight')
        .get(popoverContentSelector)
        .should('not.exist');
    });
  });
});
