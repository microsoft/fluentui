import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { mount } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';

type RootMode = 'light' | 'open' | 'closed';
const externalNodes = new Set<HTMLElement>();

const withExternalRoot = (mode: RootMode, run: (root: HTMLElement | ShadowRoot, after: HTMLButtonElement) => void) => {
  cy.document().then(doc => {
    const host = doc.createElement('div');
    const after = doc.createElement('button');
    after.textContent = 'Outside';
    doc.body.append(host, after);
    externalNodes.add(host);
    externalNodes.add(after);
    run(mode === 'light' ? host : host.attachShadow({ mode }), after);
  });
};

describe('settled Popover focus ownership', () => {
  beforeEach(() => {
    // Activate the AUT before testing autofocus on the first mount.
    cy.get('body').realClick({ position: 'topLeft' });
  });
  afterEach(() => {
    externalNodes.forEach(element => element.remove());
    externalNodes.clear();
  });
  (['light', 'open', 'closed'] as const).forEach(mode => {
    ([false, true] as const).forEach(dynamic => {
      it(`keeps ${dynamic ? 'dynamically mounted' : 'initial'} Fluent Portal autofocus owned (${mode})`, () => {
        withExternalRoot(mode, (root, after) => {
          const mountNode = root.ownerDocument.createElement('div');
          root.append(mountNode);
          const closeTrace: unknown[] = [];
          const change = cy
            .spy((event: Event, data: { open: boolean; type: string }) => {
              closeTrace.push({
                ...data,
                target: (event.target as HTMLElement | null)?.outerHTML,
                active: after.ownerDocument.activeElement?.outerHTML,
              });
            })
            .as('change');
          const Example = () => {
            const [show, setShow] = React.useState(!dynamic);
            return (
              <Popover defaultOpen onOpenChange={change}>
                <PopoverSurface as="div" data-testid="surface">
                  <button data-testid="inside" onClick={() => setShow(true)}>
                    Add portal
                  </button>
                  {show && (
                    <Portal mountNode={mountNode}>
                      <button autoFocus>Portal control</button>
                    </Portal>
                  )}
                </PopoverSurface>
              </Popover>
            );
          };
          mount(<Example />);
          if (dynamic) {
            cy.get('[data-testid=inside]').focus().realPress('Enter');
          }
          cy.document().should(doc => {
            expect(doc.querySelector('[data-testid=surface]'), JSON.stringify(closeTrace)).not.to.be.null;
          });
          cy.get('[data-testid=surface]').should('be.visible');
          cy.then(() => {
            const button = mountNode.querySelector('button')!;
            expect(button, JSON.stringify(closeTrace)).not.to.be.null;
            expect(mode === 'light' ? button.ownerDocument.activeElement : (root as ShadowRoot).activeElement).to.equal(
              button,
            );
          });
          cy.get('@change').should('not.have.been.called');
          cy.realPress('Tab');
          cy.wrap(after).should('have.focus');
          cy.get('[data-testid=surface]').should('not.exist');
          cy.get('@change').should('have.been.calledOnce');
        });
      });
    });
  });

  (['open', 'closed'] as const).forEach(mode => {
    it(`keeps a trigger-owned Fluent Portal inside the boundary (${mode})`, () => {
      withExternalRoot(mode, (root, after) => {
        const mountNode = root.ownerDocument.createElement('div');
        root.append(mountNode);
        mount(
          <Popover defaultOpen onOpenChange={cy.spy().as('change')}>
            <PopoverTrigger disableButtonEnhancement>
              <div tabIndex={0}>
                Trigger
                <Portal mountNode={mountNode}>
                  <button>Trigger portal</button>
                </Portal>
              </div>
            </PopoverTrigger>
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
            </PopoverSurface>
          </Popover>,
        );
        cy.get('[data-testid=inside]').focus();
        cy.then(() => cy.wrap(mountNode.querySelector('button')!).focus());
        cy.get('[data-testid=surface]').should('be.visible');
        cy.get('@change').should('not.have.been.called');
        cy.wrap(after).focus();
        cy.get('[data-testid=surface]').should('not.exist');
        cy.wrap(after).should('have.focus');
        cy.get('@change').should('have.been.calledOnce');
      });
    });

    it(`observes Tab from an owned portal to an unowned sibling in the same root (${mode})`, () => {
      withExternalRoot(mode, root => {
        const mountNode = root.ownerDocument.createElement('div');
        const sibling = root.ownerDocument.createElement('button');
        sibling.textContent = 'Unowned sibling';
        root.append(mountNode, sibling);
        mount(
          <Popover defaultOpen onOpenChange={cy.spy().as('change')}>
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
              <Portal mountNode={mountNode}>
                <button>Portal control</button>
              </Portal>
            </PopoverSurface>
          </Popover>,
        );
        cy.get('[data-testid=inside]').focus();
        cy.then(() => cy.wrap(mountNode.querySelector('button')!).focus().realPress('Tab'));
        cy.get('[data-testid=surface]').should('not.exist');
        cy.then(() => expect((root as ShadowRoot).activeElement).to.equal(sibling));
        cy.get('@change').should('have.been.calledOnce');
      });
    });
  });

  it('uses the live destination when an ancestor capture handler redirects an older inside event', () => {
    const outside = React.createRef<HTMLButtonElement>();
    mount(
      <>
        <div
          onFocusCapture={event => {
            if (event.target.getAttribute('data-testid') === 'inside') {
              outside.current?.focus();
            }
          }}
        >
          <Popover defaultOpen onOpenChange={cy.spy().as('change')}>
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
            </PopoverSurface>
          </Popover>
        </div>
        <button ref={outside} data-testid="after">
          Outside
        </button>
      </>,
    );
    cy.get('[data-testid=inside]').then($inside => $inside[0].focus());
    cy.get('[data-testid=surface]').should('not.exist');
    cy.get('[data-testid=after]').should('have.focus');
    cy.get('@change').should('have.been.calledOnce');
    cy.get('@change').its('firstCall.args.0.target').should('have.attr', 'data-testid', 'after');
  });

  (['uncontrolled', 'accept', 'reject'] as const).forEach(mode => {
    it(`does not undo native hide during a concurrent content update (${mode})`, () => {
      const change = cy.spy().as('change');
      const Example = () => {
        const [open, setOpen] = React.useState(true);
        const [revealed, setRevealed] = React.useState(false);
        return (
          <Popover
            defaultOpen={mode === 'uncontrolled' ? true : undefined}
            open={mode === 'uncontrolled' ? undefined : open}
            onOpenChange={(event, data) => {
              change(event, data);
              if (mode === 'accept') {
                setOpen(data.open);
              }
            }}
          >
            <PopoverTrigger>
              <button>Trigger</button>
            </PopoverTrigger>
            <PopoverSurface
              data-testid="surface"
              onClickCapture={event => {
                event.currentTarget.hidePopover();
              }}
            >
              <button data-testid="reveal" onClick={() => setRevealed(true)}>
                Reveal more
              </button>
              {revealed && <p>Expanded content</p>}
            </PopoverSurface>
          </Popover>
        );
      };
      mount(<Example />);
      cy.get('[data-testid=reveal]').realClick();
      cy.get('[data-testid=surface]').should(mode === 'reject' ? 'be.visible' : 'not.exist');
      cy.get('@change').should('have.been.calledOnce');
      cy.get('@change').its('firstCall.args.1').should('include', { open: false, type: 'toggle' });
    });
  });

  (['open', 'closed'] as const).forEach(mode => {
    it(`recognizes an outside iframe through an external ${mode} shadow host`, () => {
      withExternalRoot(mode, (root, after) => {
        const frame = root.ownerDocument.createElement('iframe');
        frame.title = 'Outside frame';
        frame.srcdoc = '<button id="control">Frame control</button>';
        root.append(frame);
        mount(
          <Popover defaultOpen onOpenChange={cy.spy().as('change')}>
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
            </PopoverSurface>
          </Popover>,
        );
        cy.then(() => after.ownerDocument.body.append((root as ShadowRoot).host, after));
        cy.wrap(frame).should(() => {
          expect(frame.contentDocument?.querySelector('#control')).not.to.be.null;
        });
        cy.get('[data-testid=inside]').focus().realPress('Tab');
        cy.wrap(frame).should(() => {
          expect(
            frame.contentDocument?.activeElement?.id,
            JSON.stringify({
              active: after.ownerDocument.activeElement?.outerHTML,
              shadowActive: (root as ShadowRoot).activeElement?.outerHTML,
              order: Array.from(after.ownerDocument.body.children).map(element => element.tagName + '#' + element.id),
            }),
          ).to.equal('control');
        });
        cy.get('[data-testid=surface]').should('not.exist');
        cy.get('@change').should('have.been.calledOnce');
      });
    });
  });

  (['uncontrolled', 'reject'] as const).forEach(mode => {
    it(`detects inside-to-outside iframe transitions without a second parent blur (${mode})`, () => {
      const change = cy.spy().as('change');
      mount(
        <>
          <Popover
            defaultOpen={mode === 'uncontrolled' ? true : undefined}
            open={mode === 'reject' ? true : undefined}
            onOpenChange={change}
          >
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
              <iframe data-testid="inside-frame" title="Inside frame" srcDoc='<button id="control">Inside</button>' />
            </PopoverSurface>
          </Popover>
          <iframe data-testid="outside-frame" title="Outside frame" srcDoc='<button id="control">Outside</button>' />
          <button data-testid="after">After</button>
        </>,
      );
      cy.get<HTMLIFrameElement>('iframe').should(frames => {
        frames.each((_index, frame) => {
          expect(frame.contentDocument?.querySelector('#control')).not.to.be.null;
        });
      });
      cy.get('[data-testid=inside]').focus().realPress('Tab');
      cy.get<HTMLIFrameElement>('[data-testid=inside-frame]').should(frames => {
        expect(frames[0].contentDocument?.activeElement?.id).to.equal('control');
      });
      cy.get('@change').should('not.have.been.called');
      cy.realPress('Tab');
      cy.get<HTMLIFrameElement>('[data-testid=outside-frame]').should(frames => {
        expect(frames[0].contentDocument?.activeElement?.id).to.equal('control');
      });
      cy.get('[data-testid=surface]').should(mode === 'reject' ? 'be.visible' : 'not.exist');
      cy.get('@change').should('have.been.calledOnce');
      if (mode === 'reject') {
        cy.realPress(['Shift', 'Tab']);
        cy.get<HTMLIFrameElement>('[data-testid=inside-frame]').should(frames => {
          expect(frames[0].contentDocument?.activeElement?.id).to.equal('control');
        });
        cy.realPress('Tab');
        cy.get('@change').should('have.been.calledTwice');
      }
    });
  });
});
