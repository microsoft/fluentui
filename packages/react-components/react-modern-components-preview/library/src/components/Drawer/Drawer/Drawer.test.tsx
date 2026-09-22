import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';
import { isConformant } from '../../../testing/isConformant';
import { Drawer } from './Drawer';
import { DrawerBody } from '../DrawerBody/DrawerBody';
import { DrawerFooter } from '../DrawerFooter/DrawerFooter';
import { DrawerHeader } from '../DrawerHeader/DrawerHeader';
import { DrawerHeaderNavigation } from '../DrawerHeaderNavigation/DrawerHeaderNavigation';
import { DrawerHeaderTitle } from '../DrawerHeaderTitle/DrawerHeaderTitle';
import { InlineDrawer } from '../InlineDrawer/InlineDrawer';
import { OverlayDrawer } from '../OverlayDrawer/OverlayDrawer';

describe('Drawer', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
    };
  });

  isConformant({
    Component: Drawer,
    displayName: 'Drawer',
    requiredProps: { open: true, 'aria-label': 'Drawer', children: 'Drawer content' },
  });

  it('renders a styled overlay drawer by default', () => {
    const { getByRole } = render(
      <Drawer open aria-label="Drawer" className="consumer-class">
        Drawer content
      </Drawer>,
    );

    expect(getByRole('dialog')).toHaveClass('fui-Drawer', 'fui-OverlayDrawer', 'consumer-class');
    expect(getByRole('dialog')).toHaveAttribute('data-position', 'start');
    expect(getByRole('dialog')).toHaveAttribute('data-size', 'small');
  });

  it('renders a styled inline drawer with visual props', () => {
    const { getByText } = render(
      <Drawer type="inline" open position="end" size="large" separator className="consumer-class">
        Drawer content
      </Drawer>,
    );
    const drawer = getByText('Drawer content');

    expect(drawer).toHaveClass('fui-Drawer', 'fui-InlineDrawer', 'consumer-class');
    expect(drawer).toHaveAttribute('data-position', 'end');
    expect(drawer).toHaveAttribute('data-size', 'large');
    expect(drawer).toHaveAttribute('data-separator');
  });
});

describe('OverlayDrawer', () => {
  isConformant({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    requiredProps: { open: true, 'aria-label': 'Drawer', children: 'Drawer content' },
    componentPath: require.resolve('../OverlayDrawer/OverlayDrawer'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('applies the default and explicit visual sizes', () => {
    const { getByRole, rerender } = render(
      <OverlayDrawer open aria-label="Drawer">
        Drawer content
      </OverlayDrawer>,
    );

    expect(getByRole('dialog')).toHaveClass('fui-OverlayDrawer');
    expect(getByRole('dialog')).toHaveAttribute('data-size', 'small');

    rerender(
      <OverlayDrawer open aria-label="Drawer" size="full">
        Drawer content
      </OverlayDrawer>,
    );
    expect(getByRole('dialog')).toHaveAttribute('data-size', 'full');
  });

  it('renders custom surface motion', () => {
    const { getByTestId } = render(
      <OverlayDrawer
        open
        aria-label="Drawer"
        surfaceMotion={{
          children: (_, motionProps) => <div data-testid="overlay-motion">{motionProps.children}</div>,
        }}
      >
        Drawer content
      </OverlayDrawer>,
    );

    expect(getByTestId('overlay-motion')).toHaveTextContent('Drawer content');
  });
});

describe('InlineDrawer', () => {
  isConformant({
    Component: InlineDrawer,
    displayName: 'InlineDrawer',
    requiredProps: { open: true, children: 'Drawer content' },
    componentPath: require.resolve('../InlineDrawer/InlineDrawer'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('preserves headless state attributes and adds visual state attributes', () => {
    const { getByText } = render(
      <InlineDrawer open position="bottom" size="medium" separator>
        Drawer content
      </InlineDrawer>,
    );
    const drawer = getByText('Drawer content');

    expect(drawer).toHaveClass('fui-InlineDrawer');
    expect(drawer).toHaveAttribute('data-open');
    expect(drawer).toHaveAttribute('data-position', 'bottom');
    expect(drawer).toHaveAttribute('data-size', 'medium');
    expect(drawer).toHaveAttribute('data-separator');
  });

  it('renders custom surface motion', () => {
    const { getByTestId } = render(
      <InlineDrawer
        open
        surfaceMotion={{
          children: (_, motionProps) => <div data-testid="inline-motion">{motionProps.children}</div>,
        }}
      >
        Drawer content
      </InlineDrawer>,
    );

    expect(getByTestId('inline-motion')).toHaveTextContent('Drawer content');
  });
});

describe('Drawer compound components', () => {
  isConformant({
    Component: DrawerBody,
    displayName: 'DrawerBody',
    componentPath: require.resolve('../DrawerBody/DrawerBody'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DrawerHeader,
    displayName: 'DrawerHeader',
    componentPath: require.resolve('../DrawerHeader/DrawerHeader'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DrawerHeaderTitle,
    displayName: 'DrawerHeaderTitle',
    requiredProps: { children: 'Drawer title' },
    componentPath: require.resolve('../DrawerHeaderTitle/DrawerHeaderTitle'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DrawerHeaderNavigation,
    displayName: 'DrawerHeaderNavigation',
    requiredProps: { 'aria-label': 'Drawer navigation' },
    componentPath: require.resolve('../DrawerHeaderNavigation/DrawerHeaderNavigation'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DrawerFooter,
    displayName: 'DrawerFooter',
    componentPath: require.resolve('../DrawerFooter/DrawerFooter'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders stable class names for every family member and title slot', () => {
    const { getByRole, getByText } = render(
      <InlineDrawer open>
        <DrawerHeader>
          <DrawerHeaderNavigation aria-label="Drawer navigation" />
          <DrawerHeaderTitle action={<button type="button">Close</button>}>Drawer title</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>Drawer body</DrawerBody>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </InlineDrawer>,
    );

    expect(getByRole('navigation')).toHaveClass('fui-DrawerHeaderNavigation');
    expect(getByRole('heading')).toHaveClass('fui-DrawerHeaderTitle__heading', 'fui-DialogTitle');
    expect(getByRole('button').parentElement).toHaveClass('fui-DrawerHeaderTitle__action', 'fui-DialogTitle__action');
    expect(getByText('Drawer body')).toHaveClass('fui-DrawerBody');
    expect(getByText('Drawer footer')).toHaveClass('fui-DrawerFooter');
  });

  it('maps drawer scroll context to header and footer styling attributes', () => {
    const { getByText } = render(
      <DrawerProvider value={{ scrollState: 'middle', setScrollState: jest.fn() }}>
        <DrawerHeader>Drawer header</DrawerHeader>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </DrawerProvider>,
    );

    expect(getByText('Drawer header')).toHaveAttribute('data-scroll-state', 'middle');
    expect(getByText('Drawer footer')).toHaveAttribute('data-scroll-state', 'middle');
  });
});
