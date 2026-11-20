import * as React from 'react';
import { createPortal } from 'react-dom';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

export const ShadowRootFocus = (): React.ReactNode => {
  const [mountNode, setMountNode] = React.useState<Element | null>(null);
  const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
    if (host) {
      const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
      setMountNode(root.firstElementChild ?? root.appendChild(host.ownerDocument.createElement('div')));
    }
  }, []);

  return (
    <div ref={attachRoot}>
      {mountNode &&
        createPortal(
          <>
            <Menu>
              <MenuTrigger>
                <button>Open shadow-root menu</button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>First action</MenuItem>
                  <Menu>
                    <MenuTrigger>
                      <MenuItem hasSubmenu>More actions</MenuItem>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem>Nested action</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </MenuList>
              </MenuPopover>
            </Menu>
            <button>Outside menu</button>
          </>,
          mountNode,
        )}
    </div>
  );
};

ShadowRootFocus.parameters = {
  docs: {
    description: {
      story:
        'This example intentionally uses native, unstyled controls inside an open shadow root. Tab to the menu button, press Enter, then Escape: focus returns to the button. Click More actions to open the submenu; Escape returns to that item without closing its parent.',
    },
  },
};
