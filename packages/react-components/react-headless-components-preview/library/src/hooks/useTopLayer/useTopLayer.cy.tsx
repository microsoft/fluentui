import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { useTopLayer } from './useTopLayer';
import type { TopLayerCloseReason, TopLayerMode } from './TopLayer.types';
import { Provider } from '../../components/Provider';

const mount = (element: React.ReactElement) => mountBase(<Provider>{element}</Provider>);

const exitStyles = `
  @keyframes layerExit {
    from { display: block; opacity: 1; }
    to { display: none; opacity: 0; }
  }
  #layer {
    transition: overlay 10s allow-discrete;
  }
  #layer:not([data-open]) {
    animation: layerExit 10s linear;
  }
`;

type LayerProps = {
  id: string;
  open: boolean;
  mode?: TopLayerMode;
  role?: string;
  onClose?: (reason: TopLayerCloseReason) => void;
  onOpen?: () => void;
  unmountOnClose?: boolean;
  children?: React.ReactNode;
};

/** Minimal consumer of useTopLayer. */
const Layer = ({ id, open, mode = 'auto', role, onClose, onOpen, unmountOnClose, children }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
  const { shouldRender, popover, phase } = useTopLayer(ref, {
    open,
    mode,
    role,
    onClose: ({ type }) => onClose?.(type),
    onOpen: onOpen ? () => onOpen() : undefined,
    unmountOnClose,
  });

  if (!shouldRender) {
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
      data-phase={phase}
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

describe('useTopLayer', () => {
  it('promotes the element into the top layer and reports light dismiss', () => {
    mount(<Example mode="auto" />);

    cy.get('#open').realClick();
    cy.get('#layer').should('match', ':popover-open').and('have.attr', 'data-open');

    // Light dismiss only reacts to trusted pointer events.
    cy.get('#outside').realClick();
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'light-dismiss');
  });

  it('reports Escape on an auto layer', () => {
    mount(<Example mode="auto" />);

    cy.get('#open').realClick();
    cy.get('#inside').focus();
    cy.realPress('Escape');
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'escape');
    cy.get('#open').should('be.focused');
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
    cy.get('#open').should('be.focused');
  });

  it('wraps Tab inside a modal dialog', () => {
    mount(<Example mode="modal" role="dialog" />);

    cy.get('#open').realClick();
    cy.get('#inside').should('be.focused');
    cy.realPress('Tab');
    cy.get('#last').should('be.focused');
    cy.realPress('Tab');
    cy.get('#inside').should('be.focused');
    cy.realPress(['Shift', 'Tab']);
    cy.get('#last').should('be.focused');
  });

  it('wraps Tab when a radio group is the last tab stop', () => {
    mount(
      <Example mode="modal" role="dialog">
        <input type="radio" name="choice" id="radio-1" defaultChecked aria-label="One" />
        <input type="radio" name="choice" id="radio-2" aria-label="Two" />
      </Example>,
    );

    cy.get('#open').realClick();
    cy.get('#radio-1').focus();
    cy.realPress('Tab');
    cy.get('#inside').should('be.focused');
    cy.realPress(['Shift', 'Tab']);
    cy.get('#radio-1').should('be.focused');
  });

  it('moves focus to the first item of a menu', () => {
    mount(<Example mode="auto" role="menu" />);

    cy.get('#open').realClick();
    cy.get('#inside').should('be.focused');
  });

  it('does not move focus into a group', () => {
    mount(<Example mode="auto" role="group" />);

    cy.get('#open').realClick();
    cy.get('#layer').should('match', ':popover-open');
    cy.get('#open').should('be.focused');
  });

  it('restores focus to the trigger after a programmatic close', () => {
    mount(<Example mode="manual" />);

    cy.get('#open').realClick();
    cy.get('#inside').focus().realClick();
    cy.get('#layer').should('not.exist');
    cy.get('#open').should('be.focused');
  });

  it('keeps the element mounted and inert until the exit animation finishes', () => {
    mount(
      <>
        <style>{exitStyles}</style>
        <Example mode="manual" />
      </>,
    );

    cy.get('#open').realClick();
    cy.get('#inside').realClick();
    cy.get('#layer').should(([layer]) => {
      expect(layer).not.to.have.attr('data-open');
      expect(layer).to.have.attr('data-phase', 'exiting');
      expect(layer).to.have.attr('inert');
      expect(layer).to.have.attr('aria-hidden', 'true');
    });
    cy.get('#open').should('be.focused');
    cy.get<HTMLElement>('#layer').then(([layer]) => {
      layer.getAnimations({ subtree: true }).forEach(animation => animation.finish());
    });
    cy.get('#layer').should('not.exist');
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

  it('closes only a popover nested in a modal dialog on Escape', () => {
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

  it('does not pull focus back to the trigger after a light dismiss', () => {
    mount(<Example mode="auto" />);

    cy.get('#open').realClick();
    cy.get('#inside').focus();
    cy.get('body').realClick({ position: 'bottomRight' });
    cy.get('#layer').should('not.exist');
    cy.get('#reason').should('have.text', 'light-dismiss');
    cy.get('#open').should('not.be.focused');
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
    cy.get('#layer').should('match', ':popover-open').and('not.have.attr', 'inert');
    cy.get('#state').should('have.text', 'open');
    cy.get('#invoker').realClick();
    cy.get('#layer').should('not.match', ':popover-open');
    cy.get('#state').should('have.text', 'closed');

    // Reopen after the element went inert on exit.
    cy.get('#invoker').realClick();
    cy.get('#layer').should('match', ':popover-open').and('not.have.attr', 'inert');
    cy.get('#state').should('have.text', 'open');
  });
});
