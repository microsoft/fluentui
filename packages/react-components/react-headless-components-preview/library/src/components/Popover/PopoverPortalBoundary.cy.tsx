import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { mount } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';

const externalNodes = new Set<HTMLElement>();

describe('Popover logical Portal boundaries', () => {
  beforeEach(() => cy.get('body').realClick({ position: 'bottomRight' }));
  afterEach(() => {
    externalNodes.forEach(node => node.remove());
    externalNodes.clear();
  });

  (['uncontrolled', 'accept', 'reject'] as const).forEach(mode => {
    (['trigger', 'surface'] as const).forEach(branch => {
      (['leave', 'remove'] as const).forEach(ending => {
        it(`keeps ${branch}-owned Portal hover after Tab-out (${mode}, ${ending})`, () => {
          cy.document().then(doc => {
            const mountNode = doc.createElement('div');
            const after = doc.createElement('button');
            after.textContent = 'After Portal';
            mountNode.style.position = 'fixed';
            mountNode.style.insetBlockStart = '50%';
            mountNode.style.insetInlineStart = '50%';
            doc.body.append(mountNode, after);
            externalNodes.add(mountNode);
            externalNodes.add(after);
            const change = cy.spy().as('change');
            const Example = () => {
              const [open, setOpen] = React.useState(false);
              const [visible, setVisible] = React.useState(true);
              const portal = visible && (
                <Portal mountNode={mountNode}>
                  <button data-testid="portal-control">Portalled content</button>
                </Portal>
              );
              return (
                <Popover
                  openOnHover
                  mouseLeaveDelay={100}
                  open={mode === 'uncontrolled' ? undefined : open}
                  onOpenChange={(event, data) => {
                    change(event, data);
                    if (mode === 'accept' || data.open) {
                      setOpen(data.open);
                    }
                  }}
                >
                  <PopoverTrigger disableButtonEnhancement>
                    <div tabIndex={0} data-testid="trigger">
                      Trigger
                      {branch === 'trigger' && portal}
                    </div>
                  </PopoverTrigger>
                  <PopoverSurface as="div" data-testid="surface">
                    <button>Inside</button>
                    <button data-testid="remove" onClick={() => setVisible(false)}>
                      Remove Portal
                    </button>
                    {branch === 'surface' && portal}
                  </PopoverSurface>
                </Popover>
              );
            };
            mount(<Example />);
            cy.then(() => doc.body.append(mountNode, after));
            cy.get('[data-testid=trigger]').realHover({ position: 'left' });
            cy.get('[data-testid=surface]').should('be.visible');
            cy.get('[data-testid=portal-control]').focus().realHover();
            cy.get('[data-testid=portal-control]').should(control => {
              expect(control[0].matches(':hover')).to.equal(true);
            });
            cy.get('[data-testid=trigger]').should(trigger => {
              expect(trigger[0].matches(':hover')).to.equal(false);
            });
            cy.get('[data-testid=surface]').should(surface => {
              expect(surface[0].matches(':hover')).to.equal(false);
            });
            cy.get('@change').invoke('resetHistory');
            cy.realPress('Tab');
            cy.wrap(after).should('have.focus');
            cy.get('[data-testid=surface]').should('be.visible');
            cy.get('[data-testid=portal-control]').should(control => {
              expect(control[0].matches(':hover')).to.equal(true);
            });
            cy.get('@change').should('not.have.been.called');
            if (ending === 'remove') {
              cy.get('[data-testid=portal-control]').focus();
              cy.get('[data-testid=remove]').invoke('click');
              cy.get('[data-testid=portal-control]').should('not.exist');
              cy.wrap(after).focus();
            } else {
              cy.get('body').realHover({ position: 'bottomRight' });
            }
            cy.get('@change').should('have.been.calledOnce');
            cy.get('@change')
              .its('firstCall.args.1')
              .should('include', {
                type: ending === 'remove' ? 'focusin' : 'mouseleave',
                open: false,
              });
            cy.get('[data-testid=surface]').should(mode === 'reject' ? 'be.visible' : 'not.exist');
            cy.wrap(after).should('have.focus');
          });
        });
      });
    });

    (['open', 'closed'] as const).forEach(shadowMode => {
      it(`observes the first exit when opening from a trigger Portal (${shadowMode}, ${mode})`, () => {
        cy.document().then(doc => {
          const host = doc.createElement('div');
          const root = host.attachShadow({ mode: shadowMode });
          const mountNode = doc.createElement('div');
          const sibling = doc.createElement('button');
          sibling.textContent = 'Unowned sibling';
          root.append(mountNode, sibling);
          doc.body.append(host);
          externalNodes.add(host);
          const change = cy.spy().as('change');
          const Example = () => {
            const [open, setOpen] = React.useState(false);
            return (
              <Popover
                open={mode === 'uncontrolled' ? undefined : open}
                onOpenChange={(event, data) => {
                  change(event, data);
                  if (mode === 'accept' || data.open) {
                    setOpen(data.open);
                  }
                }}
              >
                <PopoverTrigger disableButtonEnhancement>
                  <div tabIndex={0}>
                    Trigger
                    <Portal mountNode={mountNode}>
                      <button>Portalled trigger control</button>
                    </Portal>
                  </div>
                </PopoverTrigger>
                <PopoverSurface as="div" data-testid="surface">
                  <button>Inside</button>
                </PopoverSurface>
              </Popover>
            );
          };
          mount(<Example />);
          cy.wrap(mountNode).find('button').focus().realPress('Enter');
          cy.get('[data-testid=surface]').should('be.visible');
          cy.wrap(root).should(() => {
            expect(root.activeElement).to.equal(mountNode.querySelector('button'));
          });
          cy.get('@change').invoke('resetHistory');
          cy.realPress('Tab');
          cy.wrap(root).should(() => expect(root.activeElement).to.equal(sibling));
          cy.get('@change').should('have.been.calledOnce');
          cy.get('@change').its('firstCall.args.1').should('include', { type: 'focusin', open: false });
          cy.get('[data-testid=surface]').should(mode === 'reject' ? 'be.visible' : 'not.exist');
          if (mode === 'reject') {
            cy.wrap(mountNode).find('button').focus().realPress('Tab');
            cy.wrap(root).should(() => expect(root.activeElement).to.equal(sibling));
            cy.get('@change').should('have.been.calledTwice');
          }
        });
      });
    });
  });
});
