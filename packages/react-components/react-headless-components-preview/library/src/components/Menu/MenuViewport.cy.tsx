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
          expect(bounds.bottom).to.be.at.most(top + surface.clientHeight + 1);
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
      get('viewport-child-19').realPress('Escape');
      cy.wrap(null).should(() => {
        expect(activeRoot.activeElement).to.equal(root.querySelector('#viewport-invoker'));
        expect(root.querySelector('#viewport-child')!.matches(':popover-open')).to.equal(false);
        expect(root.querySelector('#viewport-parent')!.matches(':popover-open')).to.equal(true);
      });
    });
  }
});
