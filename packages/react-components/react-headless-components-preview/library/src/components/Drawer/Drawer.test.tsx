import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Drawer } from './Drawer';
import { InlineDrawer } from './InlineDrawer';
import { OverlayDrawer } from './OverlayDrawer';
import { DrawerBody } from './DrawerBody';
import { DrawerFooter } from './DrawerFooter';
import { DrawerHeader } from './DrawerHeader';
import { DrawerHeaderNavigation } from './DrawerHeaderNavigation';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';

describe('Drawer', () => {
  isConformant({
    Component: Drawer,
    displayName: 'Drawer',
    requiredProps: {
      children: 'Drawer content',
      open: true,
    },
  });

  it('renders an overlay drawer by default with headless Dialog semantics', () => {
    const result = render(<Drawer open>Default Drawer</Drawer>);
    const drawer = result.getByRole('dialog');

    expect(drawer).toBeInTheDocument();
    expect(drawer.tagName).toBe('DIALOG');
    expect(drawer).toHaveTextContent('Default Drawer');
    expect(drawer).toHaveAttribute('data-position', 'start');
  });

  it('renders an inline drawer when type is inline', () => {
    const result = render(
      <Drawer type="inline" open position="end">
        Inline Drawer
      </Drawer>,
    );
    const drawer = result.getByText('Inline Drawer');

    expect(drawer.tagName).toBe('DIV');
    expect(drawer).toHaveAttribute('data-open');
    expect(drawer).toHaveAttribute('data-position', 'end');
  });
});

describe('OverlayDrawer', () => {
  it('does not render when closed and unmountOnClose is true', () => {
    const result = render(<OverlayDrawer>Closed Drawer</OverlayDrawer>);

    expect(result.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the drawer mounted when unmountOnClose is false', () => {
    const result = render(<OverlayDrawer unmountOnClose={false}>Mounted Drawer</OverlayDrawer>);
    const drawer = result.getByText('Mounted Drawer').closest('dialog');

    expect(drawer).toBeInTheDocument();
    expect(drawer).not.toHaveAttribute('open');
  });

  it('wires DrawerHeaderTitle to the headless Dialog accessible name', () => {
    const result = render(
      <OverlayDrawer open>
        <DrawerHeader>
          <DrawerHeaderNavigation aria-label="Drawer navigation" />
          <DrawerHeaderTitle action={<button>Close</button>}>Drawer title</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>Drawer body</DrawerBody>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </OverlayDrawer>,
    );

    const drawer = result.getByRole('dialog', { name: 'Drawer title' });
    const title = result.getByRole('heading', { name: 'Drawer title' });

    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('aria-labelledby', title.getAttribute('id'));
    expect(result.getByRole('navigation', { name: 'Drawer navigation' })).toBeInTheDocument();
    expect(result.getByText('Drawer body')).toBeInTheDocument();
    expect(result.getByText('Drawer footer')).toBeInTheDocument();
  });
});

describe('InlineDrawer', () => {
  it('renders children without Dialog semantics', () => {
    const result = render(
      <InlineDrawer open>
        <DrawerBody>Inline body</DrawerBody>
      </InlineDrawer>,
    );

    expect(result.queryByRole('dialog')).not.toBeInTheDocument();
    expect(result.getByText('Inline body')).toBeInTheDocument();
  });

  it('does not set id="" on DrawerHeaderTitle heading when outside of Dialog context', () => {
    const result = render(
      <InlineDrawer open>
        <DrawerHeader>
          <DrawerHeaderTitle>Inline title</DrawerHeaderTitle>
        </DrawerHeader>
      </InlineDrawer>,
    );

    const heading = result.getByRole('heading', { name: 'Inline title' });

    expect(heading).not.toHaveAttribute('id', '');
  });
});
