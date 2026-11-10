import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuPopover, MenuList, MenuItem, MenuTrigger } from './';
import { Tooltip } from '../Tooltip';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

describe('Menu', () => {
  describe('scrollable root menu opening', () => {
    const ScrollableMenu = () => (
      <Menu>
        <MenuTrigger>
          <button id="scrollable-trigger">Open scrollable menu</button>
        </MenuTrigger>
        <MenuPopover id="scrollable-surface" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
          <MenuList>
            {Array.from({ length: 20 }, (_, index) => (
              <MenuItem key={index} id={`scrollable-item-${index}`}>
                Action {index + 1}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    );

    for (const key of ['ArrowDown', 'Enter'] as const) {
      it(`keeps the first focused item in view after ${key}`, () => {
        mount(<ScrollableMenu />);
        cy.get('#scrollable-trigger').focus().realPress(key);
        cy.get('#scrollable-item-0').should('be.focused');
        // Native ArrowDown scrolling animates after focus; an immediate assertion can miss it.
        cy.wait(200);
        cy.get('#scrollable-surface').should($surface => {
          const surface = $surface[0];
          const item = surface.querySelector<HTMLElement>('#scrollable-item-0')!;
          const bounds = surface.getBoundingClientRect();
          const itemBounds = item.getBoundingClientRect();

          expect(surface.scrollHeight).to.be.greaterThan(surface.clientHeight);
          expect(surface.scrollTop).to.equal(0);
          expect(itemBounds.top).to.be.at.least(bounds.top + surface.clientTop);
          expect(itemBounds.bottom).to.be.at.most(bounds.top + surface.clientTop + surface.clientHeight);
        });
        cy.get('#scrollable-item-0').should('be.focused');
      });
    }
  });

  describe('close focus restoration', () => {
    type RootKind = 'document' | 'open' | 'closed';
    let root: HTMLElement | ShadowRoot;
    let activeRoot: Document | ShadowRoot;

    const Example = ({ nested }: { nested: boolean }) => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button id="outside">Outside menu</button>
          <button id="close-menu" onClick={() => setOpen(false)}>
            Close menu
          </button>
          <Menu open={open} onOpenChange={(_, data) => setOpen(data.open)}>
            <MenuTrigger>
              <button id="trigger">Open menu</button>
            </MenuTrigger>
            <MenuPopover id="surface">
              <MenuList>
                <MenuItem id="item">Action</MenuItem>
                {nested && (
                  <Menu>
                    <MenuTrigger>
                      <MenuItem id="child-trigger" hasSubmenu>
                        More actions
                      </MenuItem>
                    </MenuTrigger>
                    <MenuPopover id="child-surface">
                      <MenuList>
                        <MenuItem id="child-item">Nested action</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                )}
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      );
    };

    const RootExample = ({ kind, nested }: { kind: RootKind; nested: boolean }) => {
      const hostRef = React.useRef<HTMLDivElement>(null);
      const rootRef = React.useRef<HTMLElement | ShadowRoot | null>(null);
      const [target, setTarget] = React.useState<HTMLElement | ShadowRoot | null>(null);
      useIsomorphicLayoutEffect(() => {
        const host = hostRef.current!;
        rootRef.current ??= kind === 'document' ? host : host.attachShadow({ mode: kind });
        root = rootRef.current;
        activeRoot = kind === 'document' ? host.ownerDocument : (root as ShadowRoot);
        setTarget(root);
      }, [kind]);
      return (
        <>
          <div id="focus-host" ref={hostRef} />
          <button id="document-outside">Outside host</button>
          {target && createPortal(<Example nested={nested} />, target)}
        </>
      );
    };

    const get = (id: string) => cy.then(() => cy.wrap(root.querySelector<HTMLElement>(`#${id}`)!));
    const expectFocus = (id: string) =>
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector(`#${id}`));
      });
    const expectOpen = (id: string, open: boolean) =>
      cy.wrap(null).should(() => {
        const surface = root.querySelector<HTMLElement>(`#${id}`)!;
        expect(surface.matches(':popover-open')).to.equal(open);
        expect(surface.checkVisibility()).to.equal(open);
      });
    const openMenu = (kind: RootKind, nested = false) => {
      mount(<RootExample kind={kind} nested={nested} />);
      cy.get('#focus-host').should(() => {
        expect(root.querySelector('#trigger')).not.to.be.null;
      });
      get('trigger').focus().realPress('Enter');
      expectOpen('surface', true);
      expectFocus('item');
    };
    const controlledClose = () => cy.then(() => root.querySelector<HTMLButtonElement>('#close-menu')!.click());

    for (const kind of ['document', 'open', 'closed'] as const) {
      it(`returns focus on Escape in a ${kind} root`, () => {
        openMenu(kind);
        get('item').realPress('Escape');
        expectOpen('surface', false);
        expectFocus('trigger');
      });

      it(`returns focus on controlled close in a ${kind} root`, () => {
        openMenu(kind);
        controlledClose();
        expectOpen('surface', false);
        expectFocus('trigger');
      });
    }

    it('preserves intentionally focused content in the same shadow root', () => {
      openMenu('open');
      get('outside').focus();
      controlledClose();
      expectOpen('surface', false);
      expectFocus('outside');
    });

    it('preserves intentionally focused content outside the shadow root', () => {
      openMenu('open');
      cy.get('#document-outside').focus();
      controlledClose();
      expectOpen('surface', false);
      cy.get('#document-outside').should('be.focused');
    });

    it('returns to the submenu trigger on Escape without closing its parent', () => {
      openMenu('open', true);
      get('child-trigger').focus().realPress('Enter');
      expectOpen('child-surface', true);
      expectFocus('child-item');
      get('child-item').realPress('Escape');
      expectOpen('child-surface', false);
      expectOpen('surface', true);
      expectFocus('child-trigger');
      get('child-trigger').realPress('Escape');
      expectOpen('surface', false);
      expectFocus('trigger');
    });

    it('returns to the outer trigger when nested selection closes both menus', () => {
      openMenu('open', true);
      get('child-trigger').focus().realPress('Enter');
      expectOpen('child-surface', true);
      get('child-item').click();
      expectOpen('child-surface', false);
      expectOpen('surface', false);
      expectFocus('trigger');
    });
  });

  it('focuses the first enabled item on open and closes on light dismiss', () => {
    mount(
      <Menu>
        <MenuTrigger>
          <button id="trigger">Options</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem id="item-0" disabled>
              Disabled
            </MenuItem>
            <MenuItem id="item-1">New</MenuItem>
            <MenuItem id="item-2">Open</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    cy.get('#trigger').realClick();
    cy.get('#item-1').should('be.focused');
    cy.get('body').realClick({ position: 'bottomRight' });
    cy.get('#item-1').should('not.be.visible');
  });

  describe('with Tooltip wrapping MenuTrigger', () => {
    const TooltipWrappedMenuExample = () => (
      <Menu>
        <Tooltip hideDelay={0} showDelay={0} content="Click to open menu options" relationship="label">
          <MenuTrigger>
            <button id="tooltip-wrapped-trigger">Options</button>
          </MenuTrigger>
        </Tooltip>
        <MenuPopover>
          <MenuList>
            <MenuItem id="menu-item-1">New</MenuItem>
            <MenuItem id="menu-item-2">Open</MenuItem>
            <MenuItem id="menu-item-3">Save</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );

    it('should open menu when tooltip-wrapped trigger is clicked', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get('#menu-item-1').should('not.be.visible');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-3').should('be.visible');
    });

    it('should have tooltip accessible on the trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-label', 'Click to open menu options');
    });

    it('should have proper ARIA haspopup and expanded attributes', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-haspopup', 'menu');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get('#menu-item-1').should('be.visible');
    });

    it('should allow menu item selection and close menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-2').click();
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.focused().realPress('Escape');
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should show tooltip on hover without opening menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Click to open menu options');
      cy.get('#menu-item-1').should('not.be.visible');
    });
  });
});
