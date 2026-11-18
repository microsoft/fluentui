import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from './';

describe('Menu viewport reconciliation', () => {
  it('reveals a focused row when its scrollport shrinks', () => {
    cy.viewport(800, 600);
    mount(
      <Menu open>
        <MenuTrigger>
          <button>Actions</button>
        </MenuTrigger>
        <MenuPopover id="clipped-menu" style={{ height: '100px', padding: 0, border: 0, overflow: 'auto' }}>
          <MenuList>
            <div style={{ height: '70px' }} />
            <MenuItem id="clipped-item" style={{ display: 'block', height: '20px' }}>
              Action
            </MenuItem>
            <div style={{ height: '400px' }} />
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get('#clipped-menu').then(([surface]) => {
      surface.style.setProperty('position-area', 'none');
      surface.style.setProperty('position-anchor', 'auto');
      surface.style.inset = 'auto';
      surface.style.top = '20px';
      surface.style.left = '20px';
      surface.querySelector<HTMLElement>('#clipped-item')!.focus({ preventScroll: true });
      surface.style.height = '50px';
    });
    cy.window().trigger('resize');
    cy.get('#clipped-menu').should(([surface]) => {
      const bounds = surface.getBoundingClientRect();
      const item = surface.querySelector<HTMLElement>('#clipped-item')!;
      const itemBounds = item.getBoundingClientRect();
      expect(bounds.bottom).to.be.lessThan(600);
      expect(itemBounds.top).to.be.at.least(bounds.top - 1);
      expect(itemBounds.bottom).to.be.at.most(bounds.bottom + 1);
      expect(surface.scrollTop).to.equal(40);
      expect(surface.ownerDocument.activeElement).to.equal(item);
    });
  });

  it('reconciles higher invokers across a triggerless positioned menu', () => {
    const scrollingSurface = { width: '200px', height: '200px', padding: 0, border: 0, overflow: 'auto' };
    const Example = () => {
      const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);
      const [positionedOpen, setPositionedOpen] = React.useState(false);
      return (
        <Menu>
          <MenuTrigger>
            <button id="triggerless-root-trigger">Actions</button>
          </MenuTrigger>
          <MenuPopover id="triggerless-outer" style={scrollingSurface}>
            <MenuList>
              <div style={{ height: '160px' }} />
              <Menu>
                <MenuTrigger>
                  <MenuItem id="triggerless-outer-invoker" style={{ display: 'block', height: '20px' }}>
                    More actions
                  </MenuItem>
                </MenuTrigger>
                <MenuPopover style={scrollingSurface}>
                  <MenuList>
                    <button id="open-positioned" ref={setTarget} onClick={() => setPositionedOpen(true)}>
                      Open positioned menu
                    </button>
                    <Menu open={positionedOpen} positioning={{ target }}>
                      <MenuPopover style={scrollingSurface}>
                        <MenuList>
                          <Menu>
                            <MenuTrigger>
                              <MenuItem id="triggerless-inner-invoker">Additional actions</MenuItem>
                            </MenuTrigger>
                            <MenuPopover>
                              <MenuList>
                                <MenuItem id="triggerless-focused">Last action</MenuItem>
                              </MenuList>
                            </MenuPopover>
                          </Menu>
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </MenuList>
                </MenuPopover>
              </Menu>
              <div style={{ height: '400px' }} />
            </MenuList>
          </MenuPopover>
        </Menu>
      );
    };
    cy.viewport(1000, 800);
    mount(<Example />);
    cy.get('#triggerless-root-trigger').focus().realPress('Enter');
    cy.get('#triggerless-outer-invoker').focus().realPress('Enter');
    cy.get('#open-positioned').click();
    cy.get('#triggerless-inner-invoker').focus().realPress('Enter');
    cy.get('#triggerless-focused').focus();
    cy.get('#triggerless-outer').then(([surface]) => {
      surface.scrollTop = 0;
      surface.style.height = '100px';
    });
    const checkInvoker = () =>
      cy.get('#triggerless-outer').should(([surface]) => {
        const bounds = surface.getBoundingClientRect();
        const item = surface.ownerDocument.querySelector<HTMLElement>('#triggerless-outer-invoker')!;
        const itemBounds = item.getBoundingClientRect();
        expect(itemBounds.top).to.be.at.least(bounds.top - 1);
        expect(itemBounds.bottom).to.be.at.most(bounds.bottom + 1);
        expect(surface.scrollTop).to.be.greaterThan(0);
        expect(surface.ownerDocument.activeElement?.id).to.equal('triggerless-focused');
      });
    checkInvoker();
    cy.get('#triggerless-outer').then(([surface]) => {
      surface.scrollTop = 0;
    });
    checkInvoker();
  });

  it('does not scroll the menu for focus inside an independent shadow-root popover', () => {
    let root: ShadowRoot;
    mount(
      <Menu open>
        <MenuTrigger>
          <button>Actions</button>
        </MenuTrigger>
        <MenuPopover id="shadow-menu" style={{ height: '200px', padding: 0, border: 0, overflow: 'auto' }}>
          <MenuList>
            <div style={{ height: '160px' }} />
            <div id="nested-shadow-host" style={{ height: '20px' }} />
            <div style={{ height: '400px' }} />
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get('#nested-shadow-host').then(([host]) => {
      root = host.attachShadow({ mode: 'open' });
      const popup = host.ownerDocument.createElement('div');
      popup.setAttribute('popover', 'manual');
      const button = host.ownerDocument.createElement('button');
      button.textContent = 'Independent action';
      popup.appendChild(button);
      root.appendChild(popup);
      popup.showPopover();
      button.focus({ preventScroll: true });
    });
    cy.get('#shadow-menu').then(([surface]) => {
      surface.style.height = '100px';
    });
    cy.window().then(
      ownerWindow =>
        new Cypress.Promise<void>(resolve => {
          ownerWindow.requestAnimationFrame(() => ownerWindow.requestAnimationFrame(() => resolve()));
        }),
    );
    cy.get('#shadow-menu').should(([surface]) => {
      expect(surface.clientHeight).to.equal(100);
      expect(surface.scrollTop).to.equal(0);
      expect(root.activeElement?.textContent).to.equal('Independent action');
    });
  });

  for (const mode of ['document', 'open', 'closed'] as const) {
    it(`keeps nested invokers and focused items visible after resize in a ${mode} root`, () => {
      let root: HTMLElement | ShadowRoot;
      let activeRoot: Document | ShadowRoot;
      const Example = () => {
        const [replacement, setReplacement] = React.useState(false);
        const [target, setTarget] = React.useState<HTMLElement | ShadowRoot | null>(null);
        const hostRef = React.useRef<HTMLDivElement>(null);
        const rootRef = React.useRef<HTMLElement | ShadowRoot | null>(null);
        useIsomorphicLayoutEffect(() => {
          const host = hostRef.current!;
          rootRef.current ??= mode === 'document' ? host : host.attachShadow({ mode });
          root = rootRef.current;
          activeRoot = mode === 'document' ? host.ownerDocument : (root as ShadowRoot);
          setTarget(root);
        }, []);
        return (
          <>
            <div ref={hostRef} id="viewport-host" />
            <button id="replace-invoker" onClick={() => setReplacement(value => !value)}>
              Replace invoker
            </button>
            {target &&
              createPortal(
                <Menu>
                  <MenuTrigger>
                    <button id="viewport-trigger">Actions</button>
                  </MenuTrigger>
                  <MenuPopover id="viewport-parent" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                    <MenuList>
                      {Array.from({ length: 20 }, (_, index) => (
                        <MenuItem key={index}>Action {index + 1}</MenuItem>
                      ))}
                      <Menu>
                        <MenuTrigger>
                          <MenuItem key={String(replacement)} id="viewport-invoker" hasSubmenu>
                            More actions
                          </MenuItem>
                        </MenuTrigger>
                        <MenuPopover id="viewport-child" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                          <MenuList>
                            {Array.from({ length: 20 }, (_, index) => (
                              <MenuItem key={index} id={`viewport-child-${index}`}>
                                Nested action {index + 1}
                              </MenuItem>
                            ))}
                            <Menu>
                              <MenuTrigger>
                                <MenuItem id="viewport-inner-invoker" hasSubmenu>
                                  Additional actions
                                </MenuItem>
                              </MenuTrigger>
                              <MenuPopover id="viewport-inner" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                                <MenuList>
                                  <MenuItem id="viewport-inner-item">Innermost action</MenuItem>
                                </MenuList>
                              </MenuPopover>
                            </Menu>
                          </MenuList>
                        </MenuPopover>
                      </Menu>
                    </MenuList>
                  </MenuPopover>
                </Menu>,
                target,
              )}
          </>
        );
      };
      const get = (id: string) => cy.then(() => cy.wrap(root.querySelector<HTMLElement>(`#${id}`)!));
      const visibleWithin = (surfaceId: string, itemId: string) =>
        cy.wrap(null).should(() => {
          const surface = root.querySelector<HTMLElement>(`#${surfaceId}`)!;
          const item = root.querySelector<HTMLElement>(`#${itemId}`)!;
          const top = surface.getBoundingClientRect().top + surface.clientTop;
          const bounds = item.getBoundingClientRect();
          expect(surface.matches(':popover-open')).to.equal(true);
          expect(bounds.top).to.be.at.least(top - 1);
          expect(
            bounds.bottom,
            `${surfaceId}/${itemId}: scrollTop=${surface.scrollTop}, active=${activeRoot.activeElement?.id}`,
          ).to.be.at.most(top + surface.clientHeight + 1);
        });

      cy.viewport(800, 700);
      mount(<Example />);
      cy.get('#viewport-host').should(() => {
        expect(root.querySelector('#viewport-trigger')).not.to.be.null;
      });
      get('viewport-trigger').focus().realPress('Enter');
      get('viewport-invoker').focus().realPress('Enter');
      get('viewport-child-19').focus();
      visibleWithin('viewport-child', 'viewport-child-19');
      cy.then(() => {
        const parent = root.querySelector<HTMLElement>('#viewport-parent')!;
        parent.scrollTop = 0;
        // A programmatic click replaces the trigger without moving focus out of the child.
        root.ownerDocument.querySelector<HTMLButtonElement>('#replace-invoker')!.click();
      });
      cy.viewport(800, 400);
      visibleWithin('viewport-parent', 'viewport-invoker');
      visibleWithin('viewport-child', 'viewport-child-19');
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-child-19'));
      });
      get('viewport-inner-invoker').focus();
      visibleWithin('viewport-child', 'viewport-inner-invoker');
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-inner-invoker'));
      });
      get('viewport-inner-invoker').realPress('Enter');
      cy.wrap(null).should(() => {
        expect(root.querySelector('#viewport-inner')!.matches(':popover-open')).to.equal(true);
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-inner-item'));
      });
      visibleWithin('viewport-parent', 'viewport-invoker');
      cy.then(() => {
        root.querySelector<HTMLElement>('#viewport-parent')!.style.maxHeight = '40px';
      });
      visibleWithin('viewport-parent', 'viewport-invoker');
      cy.then(() => {
        root.querySelector<HTMLElement>('#viewport-parent')!.scrollTop = 0;
      });
      visibleWithin('viewport-parent', 'viewport-invoker');
      visibleWithin('viewport-child', 'viewport-inner-invoker');
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-inner-item'));
      });
      get('viewport-inner-item').realPress('Escape');
      get('viewport-child-19').focus().realPress('Escape');
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-invoker'));
        expect(root.querySelector('#viewport-child')!.matches(':popover-open')).to.equal(false);
        expect(root.querySelector('#viewport-parent')!.matches(':popover-open')).to.equal(true);
      });
    });
  }

  for (const scale of [0.5, 2]) {
    it(`preserves focused item visibility without unnecessary scrolling at scale ${scale}`, () => {
      mount(
        <Menu>
          <MenuTrigger>
            <button>Actions</button>
          </MenuTrigger>
          <MenuPopover
            id="scaled-menu"
            style={{
              width: '200px',
              height: '200px',
              padding: 0,
              border: 0,
              overflow: 'auto',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <MenuList>
              <div style={{ height: '160px' }} />
              <MenuItem id="scaled-item" style={{ display: 'block', height: '20px' }}>
                Action
              </MenuItem>
              <div style={{ height: '400px' }} />
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get('button').focus().realPress('Enter');
      cy.get('#scaled-item').focus();
      cy.get('#scaled-menu').should('have.prop', 'scrollTop', 0);
      cy.get('#scaled-menu').then(([surface]) => {
        surface.style.height = '100px';
      });
      cy.get('#scaled-menu').should(([surface]) => {
        const bounds = surface.getBoundingClientRect();
        const item = surface.querySelector<HTMLElement>('#scaled-item')!;
        const itemBounds = item.getBoundingClientRect();
        expect(surface.scrollTop).to.equal(80);
        expect(itemBounds.top).to.be.at.least(bounds.top - 1);
        expect(itemBounds.bottom).to.be.at.most(bounds.bottom + 1);
        expect(surface.ownerDocument.activeElement).to.equal(item);
      });
    });
  }

  for (const writingMode of ['vertical-rl', 'vertical-lr'] as const) {
    it(`reveals focused items after horizontal shrink in ${writingMode}`, () => {
      mount(
        <Menu>
          <MenuTrigger>
            <button>Actions</button>
          </MenuTrigger>
          <MenuPopover id="vertical-menu" style={{ writingMode, width: '200px', height: '80px', overflow: 'auto' }}>
            <MenuList>
              {Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={index} id={`vertical-item-${index}`} style={{ width: '40px', height: '40px' }}>
                  Action {index + 1}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get('button').focus().realPress('Enter');
      cy.get('#vertical-item-11').focus();
      cy.get('#vertical-menu').then(([surface]) => {
        surface.scrollLeft = 0;
        surface.style.width = '100px';
      });
      cy.get('#vertical-menu').should(([surface]) => {
        const bounds = surface.getBoundingClientRect();
        const left = bounds.left + surface.clientLeft;
        const item = surface.querySelector<HTMLElement>('#vertical-item-11')!;
        const itemBounds = item.getBoundingClientRect();
        expect(itemBounds.left).to.be.at.least(left - 1);
        expect(itemBounds.right).to.be.at.most(left + surface.clientWidth + 1);
        expect(surface.ownerDocument.activeElement).to.equal(item);
        expect(surface.scrollLeft).to.not.equal(0);
      });
    });
  }
});
