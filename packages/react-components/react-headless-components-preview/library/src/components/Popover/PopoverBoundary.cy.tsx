import * as React from 'react';
import { createPortal } from 'react-dom';
import { Portal } from '@fluentui/react-portal';
import { mount } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { useTestPopoverOpen } from '../../testing/PopoverTestFixtures';
describe('Popover hover and ancestor-document boundaries', () => {
  beforeEach(() => cy.get('body').realClick({ position: 'bottomRight' }));

  (
    [
      ['trigger', 'uncontrolled'],
      ['surface', 'uncontrolled'],
      ['surface', 'reject'],
    ] as const
  ).forEach(([hoverTarget, mode]) => {
    it(`preserves ${hoverTarget} hover after Tab-out (${mode})`, () => {
      const change = cy.spy().as('change');
      const Example = () => {
        const openProps = useTestPopoverOpen(mode, false, change);
        return (
          <>
            <Popover {...openProps} openOnHover mouseLeaveDelay={100}>
              <PopoverTrigger>
                <button data-testid="trigger">Hover trigger</button>
              </PopoverTrigger>
              <PopoverSurface as="div" data-testid="surface">
                <button data-testid="inside">Inside</button>
              </PopoverSurface>
            </Popover>
            <button data-testid="after">After</button>
          </>
        );
      };
      mount(<Example />);
      cy.get('[data-testid=trigger]').realHover();
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('[data-testid=inside]').focus();
      cy.get(`[data-testid=${hoverTarget}]`)
        .realHover({ position: 'left' })
        .should(element => {
          expect(element[0].matches(':hover')).to.equal(true);
        });
      cy.get('@change').invoke('resetHistory');
      cy.realPress('Tab');
      cy.get('[data-testid=after]').should('have.focus');
      cy.get(`[data-testid=${hoverTarget}]`).should(element => {
        expect(element[0].matches(':hover')).to.equal(true);
      });
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('@change').should('not.have.been.called');
      cy.get('body').realHover({ position: 'bottomRight' });
      cy.get('@change').should('have.been.calledOnce');
      cy.get('@change').its('firstCall.args.1').should('include', { type: 'mouseleave', open: false });
      cy.get('[data-testid=surface]').should(mode === 'reject' ? 'be.visible' : 'not.exist');
      cy.get('[data-testid=after]').should('have.focus');
    });
  });

  (['uncontrolled', 'reject'] as const).forEach(mode => {
    it(`samples owned opaque frames portalled into an ancestor document (${mode})`, () => {
      const change = cy.spy().as('change');
      const loaded = cy.spy().as('loaded');
      const frameUrl = 'data:text/html,<button>Opaque control</button>';
      const Example = () => {
        const [doc, setDocument] = React.useState<Document | null>(null);
        const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);
        const openProps = useTestPopoverOpen(mode, true, change);
        return (
          <>
            <iframe
              title="Popover host"
              data-testid="host"
              srcDoc="<main></main>"
              onLoad={event => setDocument(event.currentTarget.contentDocument)}
            />
            <div ref={setMountNode} />
            {doc &&
              mountNode &&
              createPortal(
                <Popover {...openProps}>
                  <PopoverSurface as="div" data-testid="surface">
                    <button data-testid="inside">Inside host</button>
                    <Portal mountNode={mountNode}>
                      <button data-testid="entry">Portal entry</button>
                      <iframe data-testid="owned" title="Owned opaque frame" src={frameUrl} onLoad={loaded} />
                    </Portal>
                  </PopoverSurface>
                </Popover>,
                doc.body,
              )}
            <iframe data-testid="outside" title="Outside opaque frame" src={frameUrl} onLoad={loaded} />
          </>
        );
      };
      mount(<Example />);
      cy.get('@loaded').should('have.been.calledTwice');
      cy.get<HTMLIFrameElement>('[data-testid=host]').then(frames => {
        const doc = frames[0].contentDocument!;
        cy.wrap(doc.querySelector<HTMLButtonElement>('[data-testid=inside]')!).focus();
        cy.get('[data-testid=entry]').focus().realPress('Tab');
        cy.get('[data-testid=owned]').should('have.focus');
        cy.get('@change').should('not.have.been.called');
        cy.realPress('Tab');
        cy.get('[data-testid=outside]').should('have.focus');
        cy.get('@change').should('have.been.calledOnce');
        cy.get('@change').its('firstCall.args.1').should('include', { type: 'fuiframefocus', open: false });
        if (mode === 'reject') {
          cy.realPress(['Shift', 'Tab']);
          cy.get('[data-testid=owned]').should('have.focus');
          cy.get<HTMLIFrameElement>('[data-testid=owned]').then(ownedFrames => {
            return new Cypress.Promise<void>(resolve => {
              ownedFrames[0].addEventListener('fuiframefocus', () => resolve(), { once: true });
            });
          });
          cy.realPress('Tab');
          cy.get('[data-testid=outside]').should('have.focus');
          cy.get('@change').should('have.been.calledTwice');
        }
      });
    });
  });

  (['uncontrolled', 'reject'] as const).forEach(mode => {
    it(`observes real Tab from an iframe-hosted surface into its parent (${mode})`, () => {
      const change = cy.spy().as('change');
      const Example = () => {
        const [doc, setDocument] = React.useState<Document | null>(null);
        const openProps = useTestPopoverOpen(mode, true, change);
        return (
          <>
            <iframe
              title="Popover host"
              data-testid="host"
              srcDoc="<main></main>"
              onLoad={event => setDocument(event.currentTarget.contentDocument)}
            />
            {doc &&
              createPortal(
                <Popover {...openProps}>
                  <PopoverSurface as="div" data-testid="surface">
                    <button data-testid="inside">Inside</button>
                  </PopoverSurface>
                </Popover>,
                doc.body,
              )}
            <button data-testid="after">After frame</button>
            <button data-testid="last">Last</button>
          </>
        );
      };
      mount(<Example />);
      cy.get<HTMLIFrameElement>('[data-testid=host]').should(frames => {
        expect(frames[0].contentDocument?.querySelector('[data-testid=inside]')).to.exist;
      });
      cy.get<HTMLIFrameElement>('[data-testid=host]').then(frames => {
        const doc = frames[0].contentDocument!;
        cy.spy(frames[0].ownerDocument.defaultView!, 'setInterval').as('parentInterval');
        cy.spy(doc.defaultView!, 'setInterval').as('childInterval');
        cy.wrap(doc.querySelector<HTMLButtonElement>('[data-testid=inside]')!).focus().realPress('Tab');
        cy.get('[data-testid=after]').should('have.focus');
        cy.get('@change').should('have.been.calledOnce');
        cy.wrap(doc).should(() => {
          expect(doc.querySelector('[data-testid=surface]')?.matches(':popover-open') ?? false).to.equal(
            mode === 'reject',
          );
        });
        cy.get('@parentInterval').should('not.have.been.called');
        cy.get('@childInterval').should('not.have.been.called');
        if (mode === 'reject') {
          cy.get('[data-testid=last]').focus();
          cy.get('@change').should('have.been.calledOnce');
          cy.wrap(doc.querySelector<HTMLButtonElement>('[data-testid=inside]')!).focus().realPress('Tab');
          cy.get('[data-testid=after]').should('have.focus');
          cy.get('@change').should('have.been.calledTwice');
        }
      });
    });
  });
});
