import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';

import { isConformant } from '../../testing/isConformant';
import { NavDrawerFooter } from './NavDrawerFooter';
import { navDrawerFooterClassNames, useNavDrawerFooterStyles } from './useNavDrawerFooterStyles';

import styles from './NavDrawerFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavDrawerFooter: (...args: Parameters<typeof actual.useNavDrawerFooter>) =>
      deepFreezeState(actual.useNavDrawerFooter(...args)),
  };
});

// `fuicm-root` is the same jest ident for this module and DrawerFooter's, so the class this layer
// adds is counted rather than merely found — see the note in Nav.test.tsx.
const classCount = (element: HTMLElement, name: string): number =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(entry => entry === name).length;

const renderFooter = (props: React.ComponentProps<typeof NavDrawerFooter> = {}, scrollState?: string) => {
  const footer = <NavDrawerFooter {...props}>Nav drawer footer</NavDrawerFooter>;
  const result = render(
    scrollState ? (
      <DrawerProvider value={{ scrollState, setScrollState: jest.fn() } as never}>{footer}</DrawerProvider>
    ) : (
      footer
    ),
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('footer')! };
};

describe('NavDrawerFooter', () => {
  isConformant({
    Component: NavDrawerFooter,
    displayName: 'NavDrawerFooter',
    requiredProps: { children: 'Nav drawer footer' },
  });

  it('stamps the marker pair, slash-free class first', () => {
    const { root } = renderFooter();

    expect(root).toHaveClass('fui-nav-drawer-footer');
    expect(root).toHaveClass('group/fui-nav-drawer-footer');
    expect(root.classList[0]).toBe('fui-nav-drawer-footer');
    expect(navDrawerFooterClassNames.root).toBe('fui-nav-drawer-footer group/fui-nav-drawer-footer');
  });

  it('keeps the composed DrawerFooter’s marker pair and module class beneath its own', () => {
    const { root } = renderFooter();

    expect(root).toHaveClass('fui-drawer-footer');
    expect(root).toHaveClass('group/fui-drawer-footer');
    expect(classCount(root, styles.root)).toBe(2);
    expect(root.className).not.toContain('undefined');
  });

  it('carries the root module class on a footer element, and no icon slot exists to compose', () => {
    const { root } = renderFooter();

    expect(root.tagName).toBe('FOOTER');
    expect(useNavDrawerFooterStyles({ root: {}, components: {} } as never)).not.toHaveProperty('icon');
  });

  it('leaves data-scroll-state to the headless layer, stamped once, as a value', () => {
    expect(renderFooter().root.getAttribute('data-scroll-state')).toBe('none');
    expect(renderFooter({}, 'middle').root.getAttribute('data-scroll-state')).toBe('middle');
    expect(
      renderFooter()
        .root.getAttributeNames()
        .filter(entry => entry === 'data-scroll-state'),
    ).toHaveLength(1);
  });

  it('keeps a consumer className exactly once, last, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderFooter({ ref, className: 'consumer', 'aria-label': 'footer', style: { opacity: 0.5 } });
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(ref.current).toBe(root);
    expect(names.filter(entry => entry === 'consumer')).toHaveLength(1);
    expect(names[names.length - 1]).toBe('consumer');
    expect(root.getAttribute('aria-label')).toBe('footer');
    expect(root.style.opacity).toBe('0.5');
  });

  it('renders the same DOM shape for absent and null children', () => {
    for (const children of [undefined, null]) {
      const { container } = render(<NavDrawerFooter>{children}</NavDrawerFooter>);

      expect(container.querySelector('footer')!.childElementCount).toBe(0);
    }
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useNavDrawerFooterStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});
