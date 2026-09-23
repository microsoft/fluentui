import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { Provider } from '@fluentui/react-headless-components-preview/provider';

import { TeachingPopover } from './index';
import type { TeachingPopoverProps } from './index';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface';
import { TeachingPopoverBody } from '../TeachingPopoverBody';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<Provider>{element}</Provider>);
};

const triggerSelector = '[aria-expanded]';
// TeachingPopover defaults to `trapFocus: true`, so the surface is rendered with role="dialog".
const surfaceSelector = '[role="dialog"]';

describe('TeachingPopover', () => {
  (['uncontrolled', 'controlled'] as const).forEach(scenario => {
    const UncontrolledExample = () => (
      <TeachingPopover>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverBody>
            <TeachingPopoverTitle>Title</TeachingPopoverTitle>
            <div>This is a teaching popover</div>
          </TeachingPopoverBody>
        </TeachingPopoverSurface>
      </TeachingPopover>
    );

    const ControlledExample = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <TeachingPopover open={open} onOpenChange={(e, data) => setOpen(data.open)}>
          <TeachingPopoverTrigger>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <TeachingPopoverBody>
              <TeachingPopoverTitle>Title</TeachingPopoverTitle>
              <div>This is a teaching popover</div>
            </TeachingPopoverBody>
          </TeachingPopoverSurface>
        </TeachingPopover>
      );
    };

    describe(scenario, () => {
      const Example = scenario === 'controlled' ? ControlledExample : UncontrolledExample;

      beforeEach(() => {
        mount(<Example />);
        cy.get('body').click('bottomRight');
      });

      it('should open when clicked', () => {
        cy.get(triggerSelector).click().get(surfaceSelector).should('be.visible');
      });

      (['{enter}', 'Space'] as const).forEach(key => {
        it(`should open with ${key}`, () => {
          cy.get(triggerSelector).focus().realPress(key);
          cy.get(surfaceSelector).should('be.visible');
        });
      });

      it('should dismiss on click outside', () => {
        cy.get(triggerSelector).click().get('body').click('bottomRight').get(surfaceSelector).should('not.exist');
      });

      it('should dismiss on Escape keydown', () => {
        cy.get(triggerSelector).click().realPress('Escape');
        cy.get(surfaceSelector).should('not.exist');
      });
    });
  });

  describe('focus trap default', () => {
    it('should trap focus by default', () => {
      mount(
        <TeachingPopover>
          <TeachingPopoverTrigger>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <button>One</button>
            <button>Two</button>
          </TeachingPopoverSurface>
        </TeachingPopover>,
      );

      cy.get(triggerSelector).focus().realPress('Enter');

      cy.contains('One').should('have.focus').realPress('Tab');
      cy.contains('Two').should('have.focus').realPress('Tab');
      cy.contains('One').should('have.focus');
    });
  });

  describe('updating content', () => {
    const Example = () => {
      const [visible, setVisible] = React.useState(false);
      const changeContent = () => setVisible(true);
      const onOpenChange: TeachingPopoverProps['onOpenChange'] = (e, data) => {
        if (data.open === false) {
          setVisible(false);
        }
      };

      return (
        <TeachingPopover onOpenChange={onOpenChange}>
          <TeachingPopoverTrigger>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            {visible ? (
              <div>The second panel</div>
            ) : (
              <div>
                <button onClick={changeContent}>Action</button>
              </div>
            )}
          </TeachingPopoverSurface>
        </TeachingPopover>
      );
    };

    it('should not close when inner content changes', () => {
      mount(<Example />);
      cy.get(triggerSelector)
        .click()
        .get(surfaceSelector)
        .within(() => {
          cy.contains('Action').click();
        })
        .get(surfaceSelector)
        .should('exist')
        .contains('The second panel');
    });
  });
});
