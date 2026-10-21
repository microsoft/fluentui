import * as React from 'react';
import { flushSync } from 'react-dom';
import { Portal } from '@fluentui/react-portal';
import { mount } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';

describe('Popover document and close lifecycle', () => {
  beforeEach(() => cy.get('body').realClick({ position: 'topLeft' }));

  ([false, true] as const).forEach(replace => {
    it(`restores the trigger after native hide ${replace ? 'with' : 'without'} focused-content replacement`, () => {
      const change = cy.spy().as('change');
      const Example = () => {
        const [replaced, setReplaced] = React.useState(false);
        return (
          <Popover defaultOpen onOpenChange={change}>
            <PopoverTrigger>
              <button data-testid="trigger">Trigger</button>
            </PopoverTrigger>
            <PopoverSurface as="div" data-testid="surface" onClickCapture={event => event.currentTarget.hidePopover()}>
              {replaced ? (
                <span>Replacement content</span>
              ) : (
                <button data-testid="finish" onClick={() => replace && setReplaced(true)}>
                  Finish
                </button>
              )}
            </PopoverSurface>
          </Popover>
        );
      };
      mount(<Example />);
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('[data-testid=finish]').focus().realPress('Enter');
      cy.get('[data-testid=surface]').should('not.exist');
      cy.get('[data-testid=trigger]').should('have.focus');
      cy.get('@change').should('have.been.calledOnce');
    });
  });

  it('retains focus observation when a document enters the back-forward cache', () => {
    const change = cy.spy().as('change');
    mount(
      <>
        <Popover defaultOpen onOpenChange={change}>
          <PopoverSurface as="div" data-testid="surface">
            <button data-testid="inside">Inside</button>
          </PopoverSurface>
        </Popover>
        <button data-testid="outside">Outside</button>
      </>,
    );
    cy.get('[data-testid=inside]').focus();
    cy.window().then(win => {
      win.dispatchEvent(new win.PageTransitionEvent('pagehide', { persisted: true }));
      win.dispatchEvent(new win.PageTransitionEvent('pageshow', { persisted: true }));
    });
    cy.get('[data-testid=surface]').should('be.visible');
    cy.get('@change').should('not.have.been.called');
    cy.get('[data-testid=outside]').focus();
    cy.get('[data-testid=surface]').should('not.exist');
    cy.get('[data-testid=outside]').should('have.focus');
    cy.get('@change').should('have.been.calledOnce');
  });

  it('keeps a Fluent-owned portal inside an external same-origin iframe open', () => {
    const change = cy.spy().as('change');
    const Example = () => {
      const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
      return (
        <>
          <Popover defaultOpen onOpenChange={change}>
            <PopoverSurface as="div" data-testid="surface">
              <button data-testid="inside">Inside</button>
              {mountNode && (
                <Portal mountNode={mountNode}>
                  <button data-testid="portal-control">Owned frame control</button>
                </Portal>
              )}
            </PopoverSurface>
          </Popover>
          <iframe
            data-testid="portal-frame"
            title="Portal frame"
            srcDoc='<div id="mount"></div>'
            onLoad={event => setMountNode(event.currentTarget.contentDocument?.getElementById('mount') ?? null)}
          />
          <button data-testid="outside">Outside</button>
        </>
      );
    };
    mount(<Example />);
    cy.get<HTMLIFrameElement>('[data-testid=portal-frame]').should(frames => {
      expect(frames[0].contentDocument?.querySelector('[data-testid=portal-control]')).to.exist;
    });
    cy.get('[data-testid=inside]').focus();
    cy.get<HTMLIFrameElement>('[data-testid=portal-frame]').then(frames => {
      return cy
        .wrap(frames[0].contentDocument!.querySelector<HTMLButtonElement>('[data-testid=portal-control]')!)
        .focus();
    });
    cy.get('[data-testid=surface]').should('be.visible');
    cy.get<HTMLIFrameElement>('[data-testid=portal-frame]').should(frames => {
      expect(frames[0].contentDocument?.activeElement?.getAttribute('data-testid')).to.equal('portal-control');
    });
    cy.get('@change').should('not.have.been.called');
    cy.get('[data-testid=outside]').focus();
    cy.get('[data-testid=surface]').should('not.exist');
    cy.get('[data-testid=outside]').should('have.focus');
    cy.get('@change').should('have.been.calledOnce');
  });

  it('cleans up safely after an observed iframe navigates to an opaque origin', () => {
    const change = cy.spy().as('change');
    mount(
      <>
        <Popover defaultOpen onOpenChange={change}>
          <PopoverSurface as="div" data-testid="surface">
            <button data-testid="inside">Inside</button>
            <iframe data-testid="frame" title="Navigating frame" srcDoc='<button id="control">Control</button>' />
          </PopoverSurface>
        </Popover>
        <button data-testid="outside">Outside</button>
      </>,
    );
    cy.get<HTMLIFrameElement>('[data-testid=frame]').should(frames => {
      expect(frames[0].contentDocument?.querySelector('#control')).to.exist;
    });
    cy.get('[data-testid=inside]').focus();
    cy.get<HTMLIFrameElement>('[data-testid=frame]').then(frames => {
      return cy.wrap(frames[0].contentDocument!.querySelector<HTMLButtonElement>('#control')!).focus();
    });
    cy.get('[data-testid=surface]').should('be.visible');
    cy.get('@change').should('not.have.been.called');
    cy.get<HTMLIFrameElement>('[data-testid=frame]').then(frames => {
      const frame = frames[0];
      return new Cypress.Promise<void>(resolve => {
        frame.addEventListener('load', () => resolve(), { once: true });
        frame.removeAttribute('srcdoc');
        frame.src = 'data:text/html,<button>Opaque control</button>';
      });
    });
    cy.get<HTMLIFrameElement>('[data-testid=frame]').should(frames => {
      expect(frames[0].contentDocument).to.be.null;
    });
    cy.get('[data-testid=outside]').focus();
    cy.get('[data-testid=surface]').should('not.exist');
    cy.get('[data-testid=outside]').should('exist').and('have.focus');
    cy.get('@change').should('have.been.calledOnce');
  });

  it('allocates no frame resources after a close callback synchronously unmounts the Popover', () => {
    const change = cy.spy().as('change');
    let unmountOnClose = false;
    const Example = () => {
      const [visible, setVisible] = React.useState(true);
      return (
        <>
          {visible && (
            <Popover
              open
              onOpenChange={(event, data) => {
                change(event, data);
                if (unmountOnClose && !data.open) {
                  flushSync(() => setVisible(false));
                }
              }}
            >
              <PopoverSurface as="div" data-testid="surface">
                <button data-testid="inside">Inside</button>
              </PopoverSurface>
            </Popover>
          )}
          <iframe
            data-testid="outside-frame"
            title="Outside nested frames"
            srcDoc={
              '<button id="flat">Flat</button><iframe id="nested" srcdoc="<button id=deep>Deep</button>"></iframe>'
            }
          />
        </>
      );
    };
    mount(<Example />);
    cy.get<HTMLIFrameElement>('[data-testid=outside-frame]').should(frames => {
      const child = frames[0].contentDocument;
      expect(child?.querySelector<HTMLIFrameElement>('#nested')?.contentDocument?.querySelector('#deep')).to.exist;
    });
    cy.get<HTMLIFrameElement>('[data-testid=outside-frame]').then(frames => {
      const child = frames[0].contentDocument!;
      const grandchild = child.querySelector<HTMLIFrameElement>('#nested')!.contentDocument!;
      const intervals = [frames[0].ownerDocument.defaultView!, child.defaultView!].map(win => ({
        interval: cy.spy(win, 'setInterval'),
        clearInterval: cy.spy(win, 'clearInterval'),
      }));
      const add = cy.spy(grandchild, 'addEventListener').as('grandchildAdd');
      const remove = cy.spy(grandchild, 'removeEventListener').as('grandchildRemove');
      cy.get('[data-testid=inside]').focus();
      cy.wrap(child.querySelector<HTMLButtonElement>('#flat')!).focus();
      cy.get('@change').should('have.been.calledOnce');
      cy.get('[data-testid=inside]').focus();
      cy.then(() => {
        unmountOnClose = true;
      });
      cy.wrap(grandchild.querySelector<HTMLButtonElement>('#deep')!).focus();
      cy.get('[data-testid=surface]').should('not.exist');
      cy.get('@change').should('have.been.calledTwice');
      cy.then(() => {
        const polls = intervals.flatMap(({ interval, clearInterval }) =>
          interval
            .getCalls()
            .filter(call => call.args[1] === 100)
            .map(call => ({ call, clearInterval })),
        );
        expect(polls).not.to.be.empty;
        polls.forEach(({ call, clearInterval }) => expect(clearInterval).to.have.been.calledWith(call.returnValue));
        const listeners = add.getCalls().filter(call => call.args[0] === 'fuiframefocus');
        expect(listeners).not.to.be.empty;
        listeners.forEach(call => expect(remove).to.have.been.calledWith('fuiframefocus', call.args[1], true));
      });
    });
  });
});
