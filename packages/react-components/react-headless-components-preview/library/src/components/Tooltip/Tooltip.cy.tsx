import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Tooltip } from './Tooltip';
import type { TooltipProps } from './Tooltip.types';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

const tooltipSelector = '[role="tooltip"]';

const Example = (props: Partial<TooltipProps>) => (
  <Tooltip content="Tooltip content" relationship="description" {...props}>
    <button>Trigger</button>
  </Tooltip>
);

describe('Tooltip', () => {
  describe('visibility', () => {
    it('should be hidden by default', () => {
      mount(<Example />);
      cy.get(tooltipSelector).should('not.be.visible');
    });

    it('should show after pointer enters trigger', () => {
      mount(<Example />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
    });

    it('should hide after pointer leaves trigger', () => {
      mount(<Example />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
      cy.get('button').trigger('pointerout', { force: true });
      cy.get(tooltipSelector).should('not.be.visible');
    });

    it('should remain visible when pointer moves to tooltip content', () => {
      cy.clock();
      mount(<Example showDelay={0} hideDelay={300} />);
      cy.get('button').trigger('pointerover');
      cy.tick(10);
      cy.get('button').trigger('pointerout', { force: true });
      cy.get(tooltipSelector).trigger('pointerover');
      cy.tick(500); // Well past hideDelay; timer was cancelled
      cy.get(tooltipSelector).should('be.visible');
    });

    it('should hide after pointer leaves tooltip content', () => {
      mount(<Example />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
      cy.get(tooltipSelector).trigger('pointerout');
      cy.get(tooltipSelector).should('not.be.visible');
    });
  });

  describe('keyboard and focus', () => {
    it('should show on trigger focus', () => {
      mount(<Example />);
      cy.get('button').focus();
      cy.get(tooltipSelector).should('be.visible');
    });

    it('should hide immediately on trigger blur', () => {
      mount(<Example />);
      cy.get('button').focus();
      cy.get(tooltipSelector).should('be.visible');
      cy.get('button').blur();
      cy.get(tooltipSelector).should('not.be.visible');
    });

    it('should hide when browser dismisses the popover', () => {
      mount(<Example />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
      cy.get(tooltipSelector).then($tooltip => {
        ($tooltip[0] as HTMLElement).hidePopover();
      });
      cy.get(tooltipSelector).should('not.be.visible');
    });
  });

  describe('show and hide delays', () => {
    it('should not show before showDelay has elapsed', () => {
      cy.clock();
      mount(<Example showDelay={400} />);
      cy.get('button').trigger('pointerover');
      cy.tick(200);
      cy.get(tooltipSelector).should('not.be.visible');
      cy.tick(200);
      cy.get(tooltipSelector).should('be.visible');
    });

    it('should not hide before hideDelay has elapsed', () => {
      cy.clock();
      mount(<Example showDelay={0} hideDelay={400} />);
      cy.get('button').trigger('pointerover');
      cy.tick(10);
      cy.get('button').trigger('pointerout', { force: true });
      cy.tick(200);
      cy.get(tooltipSelector).should('be.visible');
      cy.tick(200);
      cy.get(tooltipSelector).should('not.be.visible');
    });

    it('should cancel the hide timer when pointer re-enters trigger', () => {
      cy.clock();
      mount(<Example showDelay={0} hideDelay={300} />);
      cy.get('button').trigger('pointerover');
      cy.tick(10);
      cy.get('button').trigger('pointerout', { force: true });
      cy.tick(150); // Partway through hideDelay
      cy.get('button').trigger('pointerover', { force: true }); // Re-enter — cancels hide timer
      cy.tick(500);
      cy.get(tooltipSelector).should('be.visible');
    });
  });

  describe('controlled', () => {
    const ControlledExample = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <>
          <Tooltip
            content="Controlled tooltip"
            relationship="description"
            visible={visible}
            onVisibleChange={(_, data) => setVisible(data.visible)}
          >
            <button id="trigger">Trigger</button>
          </Tooltip>
          <button id="toggle" onClick={() => setVisible(v => !v)}>
            Toggle
          </button>
        </>
      );
    };

    it('should show when visible is set to true', () => {
      mount(<ControlledExample />);
      cy.get('#toggle').click();
      cy.get(tooltipSelector).should('be.visible');
    });

    it('should hide when visible is set to false', () => {
      mount(<ControlledExample />);
      cy.get('#toggle').click();
      cy.get(tooltipSelector).should('be.visible');
      cy.get('#toggle').click({ force: true });
      cy.get(tooltipSelector).should('not.be.visible');
    });

    it('should call onVisibleChange with visible=true when shown', () => {
      const onVisibleChange = cy.stub().as('onVisibleChange');
      mount(<Example onVisibleChange={onVisibleChange} />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
      cy.get('@onVisibleChange').should(
        'have.been.calledWith',
        Cypress.sinon.match.any,
        Cypress.sinon.match({ visible: true }),
      );
    });

    it('should call onVisibleChange with visible=false when hidden', () => {
      const onVisibleChange = cy.stub().as('onVisibleChange');
      mount(<Example onVisibleChange={onVisibleChange} />);
      cy.get('button').trigger('pointerover');
      cy.get(tooltipSelector).should('be.visible');
      cy.get('button').trigger('pointerout', { force: true });
      cy.get(tooltipSelector).should('not.be.visible');
      cy.get('@onVisibleChange').should(
        'have.been.calledWith',
        Cypress.sinon.match.any,
        Cypress.sinon.match({ visible: false }),
      );
    });
  });

  describe('aria relationship', () => {
    it('should set aria-label when relationship="label" with string content', () => {
      mount(
        <Tooltip content="Label text" relationship="label">
          <button>Trigger</button>
        </Tooltip>,
      );
      cy.get('button').should('have.attr', 'aria-label', 'Label text');
      // Not rendered since aria-label is sufficient
      cy.get(tooltipSelector).should('not.exist');
    });

    it('should set aria-labelledby when relationship="label" with non-string content', () => {
      mount(
        <Tooltip content={<span>Complex label</span>} relationship="label">
          <button>Trigger</button>
        </Tooltip>,
      );
      cy.get('button')
        .invoke('attr', 'aria-labelledby')
        .then(id => {
          cy.get(`#${id}`).should('exist');
        });
    });

    it('should set aria-describedby when relationship="description"', () => {
      mount(
        <Tooltip content="Description text" relationship="description">
          <button>Trigger</button>
        </Tooltip>,
      );
      cy.get('button')
        .invoke('attr', 'aria-describedby')
        .then(id => {
          cy.get(`#${id}`).should('exist');
        });
    });

    it('should always render tooltip for aria-describedby even when hidden', () => {
      mount(
        <Tooltip content="Always here" relationship="description">
          <button>Trigger</button>
        </Tooltip>,
      );
      cy.get(tooltipSelector).should('exist');
    });
  });
});
