import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { useDialogLayerOpenState } from './useDialogLayerOpenState';
import type { TopLayerMode, TopLayerOpenChangeType } from './types';
import { Provider } from '../../components/Provider';

const mount = (element: React.ReactElement) => mountBase(<Provider>{element}</Provider>);

// Before Chromium 120 a modal dialog takes Escape before a popover nested in it (seen in Cypress 13's Electron, Chromium
// 118), so both close.
const chromiumVersion = Number(/Chrome\/(\d+)/.exec(navigator.userAgent)?.[1] ?? Infinity);
const itWithNestedEscape = chromiumVersion >= 120 ? it : it.skip;

type LayerProps = {
  id: string;
  open: boolean;
  mode?: TopLayerMode;
  role?: string;
  onClose?: (reason: TopLayerOpenChangeType) => void;
  onOpen?: () => void;
  unmountOnClose?: boolean;
  children?: React.ReactNode;
};

const Layer = ({ id, open, mode = 'auto', role, onClose, onOpen, unmountOnClose, children }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
  const { popover } = useDialogLayerOpenState(ref, {
    open,
    mode,
    onOpenChange: (nextOpen, { type }) => (nextOpen ? onOpen?.() : onClose?.(type)),
  });
  if (!open && unmountOnClose !== false) {
    return null;
  }

  const Element = mode === 'modal' ? 'dialog' : 'div';
  return (
    <Element
      id={id}
      ref={ref}
      popover={popover}
      role={role}
      aria-label={role ? 'Layer' : undefined}
      data-open={open ? '' : undefined}
    >
      {children}
    </Element>
  );
};

const Example = ({ mode, role, children }: Pick<LayerProps, 'mode' | 'role' | 'children'>) => {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState('');

  return (
    <>
      <button id="open" onClick={() => setOpen(true)}>
        Open
      </button>
      <button id="outside">Outside</button>
      <output id="reason">{reason}</output>
      <Layer
        id="layer"
        mode={mode}
        role={role}
        open={open}
        onClose={next => {
          setReason(next);
          setOpen(false);
        }}
      >
        <button id="inside" onClick={() => setOpen(false)}>
          Close
        </button>
        <button id="last">Last</button>
        {children}
      </Layer>
    </>
  );
};

describe('useDialogLayerOpenState', () => {
  it('promotes the element into the top layer and reports light dismiss', () => {
    mount(<Example mode="auto" />);

    cy.get('#open').realClick();
    cy.get('#layer').should('match', ':popover-open').and('have.attr', 'data-open');

    // Light dismiss only reacts to trusted pointer events.
    cy.get('#outside').realClick();
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'light-dismiss');
  });

  it('reports Escape on an auto layer as light-dismiss', () => {
    mount(<Example mode="auto" />);

    cy.get('#open').realClick();
    cy.get('#inside').focus();
    cy.realPress('Escape');
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'light-dismiss');
  });

  it('does not light-dismiss a manual layer', () => {
    mount(<Example mode="manual" />);

    cy.get('#open').realClick();
    cy.get('#outside').realClick();
    cy.realPress('Escape');
    cy.get('#layer').should('match', ':popover-open');
  });

  it('opens a modal dialog, makes the page inert and reports Escape', () => {
    mount(<Example mode="modal" role="dialog" />);

    cy.get('#open').realClick();
    cy.get('#layer').should('match', 'dialog[open]:modal');
    cy.get('#inside').should('be.focused');

    cy.realPress('Escape');
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'escape');
  });

  it('keeps a nested auto layer from closing its parent', () => {
    const Nested = () => {
      const [outer, setOuter] = React.useState(false);
      const [inner, setInner] = React.useState(false);

      return (
        <>
          <button id="open-outer" onClick={() => setOuter(true)}>
            Open outer
          </button>
          <Layer id="outer" open={outer} onClose={() => setOuter(false)}>
            <button id="open-inner" onClick={() => setInner(true)}>
              Open inner
            </button>
            <Layer id="inner" open={inner} onClose={() => setInner(false)}>
              Inner
            </Layer>
          </Layer>
        </>
      );
    };
    mount(<Nested />);

    // Real clicks give user activation, so each popover gets its own close watcher.
    cy.get('#open-outer').realClick();
    cy.get('#open-inner').realClick();
    cy.get('#outer').should('match', ':popover-open');
    cy.get('#inner').should('match', ':popover-open');

    // Escape closes only the topmost layer.
    cy.realPress('Escape');
    cy.get('#inner').should('not.exist');
    cy.get('#outer').should('match', ':popover-open');
  });

  itWithNestedEscape('closes only a popover nested in a modal dialog on Escape', () => {
    const Nested = () => {
      const [dialog, setDialog] = React.useState(false);
      const [popover, setPopover] = React.useState(false);

      return (
        <>
          <button id="open-dialog" onClick={() => setDialog(true)}>
            Open dialog
          </button>
          <Layer id="dialog" mode="modal" role="dialog" open={dialog} onClose={() => setDialog(false)}>
            <button id="open-popover" onClick={() => setPopover(true)}>
              Open popover
            </button>
            <Layer id="popover" open={popover} onClose={() => setPopover(false)}>
              <button id="popover-button">Inside popover</button>
            </Layer>
          </Layer>
        </>
      );
    };
    mount(<Nested />);

    cy.get('#open-dialog').realClick();
    cy.get('#open-popover').realClick();
    cy.get('#popover').should('match', ':popover-open');

    cy.realPress('Escape');
    cy.get('#popover').should('not.exist');
    cy.get('#dialog').should('match', 'dialog[open]');

    cy.realPress('Escape');
    cy.get('#dialog').should('not.exist');
  });

  it('syncs a native popovertarget open through onOpen', () => {
    const Invoker = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button id="invoker" popoverTarget="layer">
            Toggle
          </button>
          <output id="state">{open ? 'open' : 'closed'}</output>
          <Layer
            id="layer"
            mode="manual"
            open={open}
            unmountOnClose={false}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            <button id="inside">Inside</button>
          </Layer>
        </>
      );
    };
    mount(<Invoker />);

    cy.get('#invoker').realClick();
    cy.get('#layer').should('match', ':popover-open');
    cy.get('#state').should('have.text', 'open');
    cy.get('#invoker').realClick();
    cy.get('#layer').should('not.match', ':popover-open');
    cy.get('#state').should('have.text', 'closed');

    cy.get('#invoker').realClick();
    cy.get('#layer').should('match', ':popover-open');
    cy.get('#state').should('have.text', 'open');
  });

  it('settles when two auto layers both stay open', () => {
    let toggles = 0;
    const count = () => {
      toggles++;
    };
    mount(
      <>
        <Layer id="first" open onClose={() => undefined} />
        <Layer id="second" open onClose={() => undefined} />
      </>,
    );
    cy.get('#first').then($el => $el[0].addEventListener('toggle', count));
    cy.get('#second').then($el => $el[0].addEventListener('toggle', count));

    cy.wait(300).then(() => {
      toggles = 0;
    });
    cy.wait(300).then(() => {
      expect(toggles).to.equal(0);
    });
  });

  it('switches to modal while open, and from modal on the next open, without reporting a close', () => {
    const onClose = cy.stub().as('close');
    const Switching = () => {
      const [mode, setMode] = React.useState<'auto' | 'modal'>('auto');
      const [open, setOpen] = React.useState(true);
      const ref = React.useRef<HTMLDialogElement>(null);
      const { popover } = useDialogLayerOpenState(ref, {
        open,
        mode,
        onOpenChange: (_, { type }) => onClose(type),
      });
      return (
        <>
          <button id="reopen" onClick={() => setOpen(true)}>
            Reopen
          </button>
          <dialog id="layer" ref={ref} popover={popover}>
            <button id="modal" onClick={() => setMode('modal')}>
              Modal
            </button>
            <button id="auto" onClick={() => setMode('auto')}>
              Auto
            </button>
            <button id="close" onClick={() => setOpen(false)}>
              Close
            </button>
          </dialog>
        </>
      );
    };
    mount(<Switching />);

    cy.get('#layer').should('match', ':popover-open');
    cy.get('#modal').realClick();
    cy.get('#layer').should('match', ':modal').and('not.match', ':popover-open');
    cy.get('#auto').realClick();
    cy.get('#layer').should('match', ':modal');
    cy.get('#close').realClick();
    cy.get('#reopen').realClick();
    cy.get('#layer').should('match', ':popover-open').and('not.match', ':modal');
    cy.get('@close').should('not.have.been.called');
  });

  // Dialogs fire `beforetoggle` / `toggle` from Chromium 132; Electron 33 is older.
  const supportsDialogToggle = () => {
    const dialog = document.createElement('dialog');
    let fired = false;
    dialog.addEventListener('beforetoggle', () => {
      fired = true;
    });
    document.body.appendChild(dialog);
    dialog.show();
    dialog.close();
    dialog.remove();
    return fired;
  };

  [true, false].forEach(accept => {
    (supportsDialogToggle() ? it : it.skip)(
      `${accept ? 'syncs' : 'undoes'} a native showModal() open the consumer ${accept ? 'accepts' : 'declines'}`,
      () => {
        const NativeModal = () => {
          const [open, setOpen] = React.useState(false);
          return (
            <>
              <output id="state">{open ? 'open' : 'closed'}</output>
              <Layer
                id="layer"
                mode="modal"
                open={open}
                unmountOnClose={false}
                onOpen={() => accept && setOpen(true)}
                onClose={() => setOpen(false)}
              />
            </>
          );
        };
        mount(<NativeModal />);

        cy.get('#layer').then($dialog => ($dialog[0] as HTMLDialogElement).showModal());
        if (accept) {
          cy.get('#state').should('have.text', 'open');
          cy.get('#layer').should('match', ':modal');
        } else {
          cy.get('#layer').should('not.have.attr', 'open');
          cy.get('#state').should('have.text', 'closed');
        }
      },
    );
  });
});
