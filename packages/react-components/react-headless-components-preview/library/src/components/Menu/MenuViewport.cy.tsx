import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from './';

describe('Menu viewport reconciliation', () => {
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
