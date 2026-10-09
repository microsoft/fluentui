import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { OverlayDrawer } from '../OverlayDrawer/OverlayDrawer';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';
import { drawerHeaderTitleClassNames, useDrawerHeaderTitleStyles } from './useDrawerHeaderTitleStyles';

import styles from './DrawerHeaderTitle.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDrawerHeaderTitle: (...args: Parameters<typeof actual.useDrawerHeaderTitle>) =>
      deepFreezeState(actual.useDrawerHeaderTitle(...args)),
  };
});

// The three slots are located structurally and compared only against this module's own imported
// `styles` object, and each render is scoped to its own container — see OverlayDrawer.test.tsx.
const renderTitle = (props: React.ComponentProps<typeof DrawerHeaderTitle> = {}) => {
  const result = render(<DrawerHeaderTitle {...props}>Drawer title</DrawerHeaderTitle>);
  const root = result.container.firstElementChild as HTMLElement;
  const heading = root.firstElementChild as HTMLElement;

  return { ...result, heading, root, action: heading.nextElementSibling };
};

describe('DrawerHeaderTitle', () => {
  isConformant({
    Component: DrawerHeaderTitle,
    displayName: 'DrawerHeaderTitle',
    requiredProps: { children: 'Drawer title' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderTitle();

    expect(root).toHaveClass('fui-drawer-header-title');
    expect(root).toHaveClass('group/fui-drawer-header-title');
    expect(root.classList[0]).toBe('fui-drawer-header-title');
    expect(drawerHeaderTitleClassNames.root).toBe('fui-drawer-header-title group/fui-drawer-header-title');
  });

  it('carries a distinct module class on each of the three slots', () => {
    const { root, heading, action } = renderTitle({ action: <button>Close</button> });

    expect(root).toHaveClass(styles.root);
    expect(heading).toHaveClass(styles.heading);
    expect(action).toHaveClass(styles.action);

    // The action reset is not the heading reset: align-self: start is what pins the action box to
    // the top of the heading's line box, and swapping the two would lose it.
    expect(heading).not.toHaveClass(styles.action);
    expect(action).not.toHaveClass(styles.heading);
  });

  it('renders the heading as an h2 by default and honours an `as` override', () => {
    expect(renderTitle().heading.tagName).toBe('H2');
    expect(renderTitle({ heading: { as: 'h1' } }).heading.tagName).toBe('H1');
  });

  it('applies the without-action grid placement only when there is no action', () => {
    // react-dialog's DialogTitle widens the heading's grid column when it has no action sibling.
    expect(renderTitle().heading).toHaveClass(styles.headingWithoutAction);
    expect(renderTitle({ action: <button>Close</button> }).heading).not.toHaveClass(styles.headingWithoutAction);
  });

  it('renders the action only when supplied', () => {
    expect(renderTitle().root.querySelectorAll('button')).toHaveLength(0);
    expect(renderTitle({ action: <button>Close</button> }).root.querySelectorAll('button')).toHaveLength(1);
  });

  it('takes the heading id from the surrounding drawer and publishes it as the accessible name', () => {
    const result = render(
      <OverlayDrawer open>
        <DrawerHeaderTitle>Drawer title</DrawerHeaderTitle>
      </OverlayDrawer>,
    );
    const surface = result.container.querySelector('dialog')!;
    const heading = result.getByRole('heading', { name: 'Drawer title' });

    expect(heading.getAttribute('id')).toBeTruthy();
    expect(surface.getAttribute('aria-labelledby')).toBe(heading.getAttribute('id'));
  });

  it('does not emit an empty id outside a drawer', () => {
    expect(renderTitle().heading).not.toHaveAttribute('id', '');
  });

  it('keeps a consumer className exactly once on every slot', () => {
    const { root, heading, action } = renderTitle({
      className: 'consumer-root',
      heading: { className: 'consumer-heading' },
      action: { children: <button>Close</button>, className: 'consumer-action' },
    });

    expect(root).toHaveClass('consumer-root', styles.root);
    expect(heading).toHaveClass('consumer-heading', styles.heading);
    expect(action).toHaveClass('consumer-action', styles.action);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given-root' }) as never;
    const heading = Object.freeze({ className: 'given-heading' }) as never;
    const action = Object.freeze({ className: 'given-action' }) as never;
    const state = Object.freeze({ root, heading, action, components: {} }) as never;

    const next = useDrawerHeaderTitleStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.heading).not.toBe(heading);
    expect(next.action).not.toBe(action);
    expect((root as { className: string }).className).toBe('given-root');
    expect((heading as { className: string }).className).toBe('given-heading');
    expect((action as { className: string }).className).toBe('given-action');
  });
});
