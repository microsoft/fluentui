import * as React from 'react';
import { createPortal } from 'react-dom';
import { Portal } from '@fluentui/react-portal';
import { mount } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { TriggerPortalExample, useTestPopoverOpen } from '../../testing/PopoverTestFixtures';

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

    (['whole-popover', 'fluent-portal'] as const).forEach(kind => {
      it(`retains every closed shadow ancestor (${kind}, inner ${mode})`, () => {
        withExternalRoot('closed', (outer, after) => {
          const innerHost = outer.ownerDocument.createElement('div');
          outer.append(innerHost);
          const inner = innerHost.attachShadow({ mode });
          const mountNode = inner.ownerDocument.createElement('div');
          inner.append(mountNode);
          const change = cy.spy().as('change');
          const content = (
            <Popover defaultOpen onOpenChange={change}>
              <PopoverSurface as="div" data-testid="surface">
                <button data-testid="inside">Inside</button>
                {kind === 'fluent-portal' && (
                  <Portal mountNode={mountNode}>
                    <button data-testid="nested-portal">Nested portal</button>
                  </Portal>
                )}
              </PopoverSurface>
            </Popover>
          );
          mount(kind === 'whole-popover' ? createPortal(content, mountNode) : content);
          cy.wrap(inner).should(() => {
            const source = kind === 'whole-popover' ? mountNode : after.ownerDocument;
            expect(source.querySelector('[data-testid=surface]')?.matches(':popover-open')).to.equal(true);
          });
          cy.then(() => {
            const source = kind === 'whole-popover' ? mountNode : after.ownerDocument;
            return cy.wrap(source.querySelector<HTMLButtonElement>('[data-testid=inside]')!).focus();
          });
          if (kind === 'fluent-portal') {
            cy.then(() => cy.wrap(mountNode.querySelector<HTMLButtonElement>('button')!).focus());
          }
          cy.wrap(inner).should(() => {
            const source = kind === 'whole-popover' ? mountNode : after.ownerDocument;
            expect(source.querySelector('[data-testid=surface]')?.matches(':popover-open')).to.equal(true);
          });
          cy.get('@change').should('not.have.been.called');
          cy.wrap(after).focus();
          cy.wrap(inner).should(() => {
            const source = kind === 'whole-popover' ? mountNode : after.ownerDocument;
            expect(source.querySelector('[data-testid=surface]')).to.be.null;
          });
          cy.wrap(after).should('have.focus');
          cy.get('@change').should('have.been.calledOnce');
        });
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
        const openProps = useTestPopoverOpen(mode, true, change);
        const [revealed, setRevealed] = React.useState(false);
        return (
          <Popover {...openProps}>
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

  it('samples opaque cross-origin frames without repeating rejected closes and rearms on sampled reentry', () => {
    const change = cy.spy().as('change');
    const observedInside = cy.spy().as('observedInside');
    const loaded = cy.spy().as('loaded');
    const frameUrl = 'data:text/html,<button>Opaque frame control</button>';
    mount(
      <>
        <Popover open onOpenChange={change}>
          <PopoverSurface as="div" data-testid="surface">
            <button data-testid="inside">Inside</button>
            <iframe data-testid="opaque-inside" title="Opaque inside" src={frameUrl} onLoad={loaded} />
          </PopoverSurface>
        </Popover>
        <iframe data-testid="opaque-outside" title="Opaque outside" src={frameUrl} onLoad={loaded} />
      </>,
    );
    cy.get('@loaded').should('have.been.calledTwice');
    cy.get<HTMLIFrameElement>('iframe').should(frames => {
      frames.each((_index, frame) => {
        expect(frame.contentDocument).to.be.null;
      });
    });
    cy.get<HTMLIFrameElement>('[data-testid=opaque-inside]').then(frames => {
      frames[0].addEventListener('fuiframefocus', observedInside, { once: true });
    });
    cy.get('[data-testid=inside]').focus().realPress('Tab');
    cy.get('[data-testid=opaque-inside]').should('have.focus');
    cy.get('@observedInside').should('have.been.calledOnce');
    cy.get('@change').should('not.have.been.called');
    cy.realPress('Tab');
    cy.get('[data-testid=opaque-outside]').should('have.focus');
    cy.get('@change').should('have.been.calledOnce');
    cy.get('@change').its('firstCall.args.1').should('include', { open: false, type: 'fuiframefocus' });
    cy.get('[data-testid=surface]').should('be.visible');
    cy.get('@observedInside').invoke('resetHistory');
    cy.get<HTMLIFrameElement>('[data-testid=opaque-inside]').then(frames => {
      frames[0].addEventListener('fuiframefocus', observedInside, { once: true });
    });
    cy.realPress(['Shift', 'Tab']);
    cy.get('[data-testid=opaque-inside]').should('have.focus');
    cy.get('@observedInside').should('have.been.calledOnce');
    cy.realPress('Tab');
    cy.get('[data-testid=opaque-outside]').should('have.focus');
    cy.get('@change').should('have.been.calledTwice');
  });
});

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

describe('Popover logical Portal boundaries', () => {
  const portalNodes = new Set<HTMLElement>();
  beforeEach(() => cy.get('body').realClick({ position: 'bottomRight' }));
  afterEach(() => {
    portalNodes.forEach(node => node.remove());
    portalNodes.clear();
  });

  (
    [
      ['trigger', 'leave', 'uncontrolled'],
      ['surface', 'leave', 'accept'],
      ['surface', 'leave', 'reject'],
      ['trigger', 'remove', 'uncontrolled'],
      ['surface', 'remove', 'reject'],
    ] as const
  ).forEach(([branch, ending, mode]) => {
    it(`keeps ${branch}-owned Portal hover after Tab-out (${mode}, ${ending})`, () => {
      cy.document().then(doc => {
        const mountNode = doc.createElement('div');
        const after = doc.createElement('button');
        after.textContent = 'After Portal';
        mountNode.style.position = 'fixed';
        mountNode.style.insetBlockStart = '50%';
        mountNode.style.insetInlineStart = '50%';
        doc.body.append(mountNode, after);
        portalNodes.add(mountNode);
        portalNodes.add(after);
        const change = cy.spy().as('change');
        const Example = () => {
          const openProps = useTestPopoverOpen(mode, false, change);
          const [visible, setVisible] = React.useState(true);
          const portal = visible && (
            <Portal mountNode={mountNode}>
              <button data-testid="portal-control">Portalled content</button>
            </Portal>
          );
          return (
            <Popover {...openProps} openOnHover mouseLeaveDelay={100}>
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

  (
    [
      ['open', 'uncontrolled'],
      ['closed', 'uncontrolled'],
      ['closed', 'reject'],
    ] as const
  ).forEach(([shadowMode, mode]) => {
    it(`observes the first exit when opening from a trigger Portal (${shadowMode}, ${mode})`, () => {
      cy.document().then(doc => {
        const host = doc.createElement('div');
        const root = host.attachShadow({ mode: shadowMode });
        const mountNode = doc.createElement('div');
        const sibling = doc.createElement('button');
        sibling.textContent = 'Unowned sibling';
        root.append(mountNode, sibling);
        doc.body.append(host);
        portalNodes.add(host);
        const change = cy.spy().as('change');
        const Example = () => (
          <TriggerPortalExample {...useTestPopoverOpen(mode, false, change)} mountNode={mountNode} />
        );
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
