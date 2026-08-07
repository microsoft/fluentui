import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useToastController } from '@fluentui/react-toast';

import { Dialog } from '../components/Dialog/Dialog';
import { DialogSurface } from '../components/Dialog/DialogSurface/DialogSurface';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Option } from '../components/Dropdown/Option/Option';
import { Menu } from '../components/Menu/Menu';
import { MenuItem } from '../components/Menu/MenuItem/MenuItem';
import { MenuList } from '../components/Menu/MenuList/MenuList';
import { MenuPopover } from '../components/Menu/MenuPopover/MenuPopover';
import { MenuTrigger } from '../components/Menu/MenuTrigger/MenuTrigger';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Toaster } from '../components/Toast/Toaster/Toaster';
import {
  resetOverlayRuntimeForTests,
  setOverlayRuntimeOverrideForTests,
} from './index';

const waitForOutsideListener = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 5));
  });
};

describe('overlay component fallback runtime', () => {
  beforeEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'fallback');
  });

  afterEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'native');
  });

  it('portals and dismisses Menu', async () => {
    render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Menu item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Menu trigger' }));
    const item = await screen.findByRole('menuitem', { name: 'Menu item' });
    expect(item.closest('[data-overlay-runtime="fallback"]')).not.toBeNull();

    await waitForOutsideListener();
    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('menuitem', { name: 'Menu item' })).not.toBeInTheDocument();
    });
  });

  it('coordinates Tooltip visibility and Escape', async () => {
    render(
      <Tooltip content="Fallback tooltip" relationship="description" showDelay={0}>
        <button>Tooltip trigger</button>
      </Tooltip>,
    );

    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Tooltip trigger' }));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-overlay-runtime', 'fallback');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('portals Dropdown listbox and dismisses outside', async () => {
    render(
      <Dropdown defaultOpen>
        <Option>One</Option>
      </Dropdown>,
    );

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('data-overlay-runtime', 'fallback');

    await waitForOutsideListener();
    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('renders Dialog with a fallback backdrop and closes on Escape', async () => {
    render(
      <Dialog defaultOpen>
        <DialogSurface>
          <button>Dialog action</button>
        </DialogSurface>
      </Dialog>,
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('data-overlay-runtime', 'fallback');
    expect(document.querySelector('[data-overlay-fallback-backdrop]')).not.toBeNull();

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('portals Toaster position containers without the Popover API', async () => {
    const DispatchToast = () => {
      const { dispatchToast } = useToastController();

      React.useEffect(() => {
        const timeout = setTimeout(() => {
          dispatchToast(<div>Fallback toast</div>, { toastId: 'fallback-toast' });
        });

        return () => clearTimeout(timeout);
      }, [dispatchToast]);

      return null;
    };

    render(
      <>
        <Toaster />
        <DispatchToast />
      </>,
    );

    const toast = await screen.findByText('Fallback toast');
    const positionContainer = toast.closest('[data-toaster-position]');
    expect(positionContainer).toHaveAttribute('data-overlay-runtime', 'fallback');
    expect(positionContainer).not.toHaveAttribute('popover');
  });
});
