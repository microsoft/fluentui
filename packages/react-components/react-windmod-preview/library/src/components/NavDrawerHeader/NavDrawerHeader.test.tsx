import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';

import { isConformant } from '../../testing/isConformant';
import { NavDrawerHeader } from './NavDrawerHeader';
import { navDrawerHeaderClassNames, useNavDrawerHeaderStyles } from './useNavDrawerHeaderStyles';

import styles from './NavDrawerHeader.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavDrawerHeader: (...args: Parameters<typeof actual.useNavDrawerHeader>) =>
      deepFreezeState(actual.useNavDrawerHeader(...args)),
  };
});

// `fuicm-root` is the same jest ident for this module and DrawerHeader's, so the class this layer
// adds is counted rather than merely found — see the note in Nav.test.tsx.
const classCount = (element: HTMLElement, name: string): number =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(entry => entry === name).length;

const renderHeader = (props: React.ComponentProps<typeof NavDrawerHeader> = {}, scrollState?: string) => {
  const header = <NavDrawerHeader {...props}>Nav drawer header</NavDrawerHeader>;
  const result = render(
    scrollState ? (
      <DrawerProvider value={{ scrollState, setScrollState: jest.fn() } as never}>{header}</DrawerProvider>
    ) : (
      header
    ),
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('header')! };
};

describe('NavDrawerHeader', () => {
  isConformant({
    Component: NavDrawerHeader,
    displayName: 'NavDrawerHeader',
    requiredProps: { children: 'Nav drawer header' },
  });

  it('stamps the marker pair, slash-free class first', () => {
    const { root } = renderHeader();

    expect(root).toHaveClass('fui-nav-drawer-header');
    expect(root).toHaveClass('group/fui-nav-drawer-header');
    expect(root.classList[0]).toBe('fui-nav-drawer-header');
    expect(navDrawerHeaderClassNames.root).toBe('fui-nav-drawer-header group/fui-nav-drawer-header');
  });

  it('keeps the composed DrawerHeader’s marker pair and module class beneath its own', () => {
    const { root } = renderHeader();

    expect(root).toHaveClass('fui-drawer-header');
    expect(root).toHaveClass('group/fui-drawer-header');
    expect(classCount(root, styles.root)).toBe(2);
    expect(root.className).not.toContain('undefined');
  });

  it('carries the root module class on a header element, and no icon slot exists to compose', () => {
    const { root } = renderHeader();

    expect(root.tagName).toBe('HEADER');
    expect(useNavDrawerHeaderStyles({ root: {}, components: {} } as never)).not.toHaveProperty('icon');
  });

  it('leaves data-scroll-state to the headless layer, stamped once, as a value', () => {
    expect(renderHeader().root.getAttribute('data-scroll-state')).toBe('none');
    expect(renderHeader({}, 'middle').root.getAttribute('data-scroll-state')).toBe('middle');
    expect(
      renderHeader()
        .root.getAttributeNames()
        .filter(entry => entry === 'data-scroll-state'),
    ).toHaveLength(1);
  });

  it('keeps a consumer className exactly once, last, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderHeader({ ref, className: 'consumer', 'aria-label': 'header', style: { opacity: 0.5 } });
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(ref.current).toBe(root);
    expect(names.filter(entry => entry === 'consumer')).toHaveLength(1);
    expect(names[names.length - 1]).toBe('consumer');
    expect(root.getAttribute('aria-label')).toBe('header');
    expect(root.style.opacity).toBe('0.5');
  });

  it('renders the same DOM shape for absent and null children', () => {
    for (const children of [undefined, null]) {
      const { container } = render(<NavDrawerHeader>{children}</NavDrawerHeader>);

      expect(container.querySelector('header')!.childElementCount).toBe(0);
    }
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useNavDrawerHeaderStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});
