import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from './BreadcrumbButton';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbState } from './Breadcrumb.types';
import { breadcrumbClassNames, useBreadcrumbStyles } from './useBreadcrumbStyles';

import styles from './Breadcrumb.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/breadcrumb', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/breadcrumb');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useBreadcrumb: (...args: Parameters<typeof actual.useBreadcrumb>) => deepFreezeState(actual.useBreadcrumb(...args)),
  };
});

const sizes = ['small', 'medium', 'large'] as const;

// The styles hooks widen the root with their data attributes internally but return the
// component's declared state type, so a stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  it('stamps its marker pair, slash-free first', () => {
    const { getByTestId } = render(<Breadcrumb data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-breadcrumb');
    expect(root).toHaveClass('group/fui-breadcrumb');
    expect(root.classList[0]).toBe('fui-breadcrumb');
    expect(breadcrumbClassNames.root).toBe('fui-breadcrumb group/fui-breadcrumb');
  });

  it('decorates the list slot and honours list={null}', () => {
    const { getByTestId } = render(
      <>
        <Breadcrumb data-testid="root">
          <BreadcrumbItem>Home</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb data-testid="suppressed" list={null}>
          <BreadcrumbItem>Home</BreadcrumbItem>
        </Breadcrumb>
      </>,
    );

    const list = getByTestId('root').querySelector('ol');

    expect(list).not.toBeNull();
    expect(list!.getAttribute('role')).toBe('list');
    expect(list).toHaveClass(styles.list);
    expect(list!.querySelector('li')).not.toBeNull();

    const suppressed = getByTestId('suppressed');

    expect(suppressed.querySelector('ol')).toBeNull();
    expect(suppressed.querySelector('li')).toBeNull();
  });

  it('stamps its own resolved size, defaulting to medium', () => {
    const { getByTestId } = render(
      <>
        <Breadcrumb data-testid="default" />
        {sizes.map(size => (
          <Breadcrumb key={size} data-testid={size} size={size} />
        ))}
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');

    for (const size of sizes) {
      expect(getByTestId(size).getAttribute('data-size')).toBe(size);
    }
  });

  it('publishes its size to the children through the breadcrumb context', () => {
    const { getByTestId } = render(
      <>
        <Breadcrumb>
          <BreadcrumbDivider data-testid="divider-default" />
          <BreadcrumbButton data-testid="button-default">Go</BreadcrumbButton>
        </Breadcrumb>
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbDivider data-testid={`divider-${size}`} />
            <BreadcrumbButton data-testid={`button-${size}`}>Go</BreadcrumbButton>
          </Breadcrumb>
        ))}
      </>,
    );

    expect(getByTestId('divider-default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('button-default').getAttribute('data-size')).toBe('medium');

    for (const size of sizes) {
      expect(getByTestId(`divider-${size}`).getAttribute('data-size')).toBe(size);
      expect(getByTestId(`button-${size}`).getAttribute('data-size')).toBe(size);
    }
  });

  it('gives a nested breadcrumb its own size', () => {
    const { getByTestId } = render(
      <Breadcrumb size="large">
        <BreadcrumbDivider data-testid="outer" />
        <Breadcrumb size="small">
          <BreadcrumbDivider data-testid="inner" />
        </Breadcrumb>
      </Breadcrumb>,
    );

    expect(getByTestId('outer').getAttribute('data-size')).toBe('large');
    expect(getByTestId('inner').getAttribute('data-size')).toBe('small');
  });

  it('leaves the headless accessibility contract intact', () => {
    const { getByTestId } = render(
      <Breadcrumb data-testid="root">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );

    const root = getByTestId('root');

    expect(root.tagName).toBe('NAV');
    expect(root.getAttribute('aria-label')).toBe('breadcrumb');
    expect(root.querySelector('ol')!.getAttribute('role')).toBe('list');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLElement>();
    const { getByTestId } = render(
      <Breadcrumb ref={ref} data-testid="root" id="bc" aria-label="trail" className="consumer" style={{ margin: 2 }} />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('bc');
    expect(root.getAttribute('aria-label')).toBe('trail');
    expect(root).toHaveClass('consumer');
    expect(root.style.margin).toBe('2px');
  });

  it('keeps the consumer class on the list slot', () => {
    const { getByTestId } = render(<Breadcrumb data-testid="root" list={{ className: 'consumer-list' }} />);

    const list = getByTestId('root').querySelector('ol')!;

    expect(list).toHaveClass('consumer-list');
    expect(list).toHaveClass(styles.list);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'nav', list: 'ol' },
      list: { className: 'consumer-list' },
      root: { className: 'consumer' },
      size: 'large',
    } as unknown as BreadcrumbState;

    const styled = useBreadcrumbStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.list!.className).toBe('consumer-list');
    expect(stampsOf(styled.root)['data-size']).toBe('large');
    expect(styled.list!.className).toContain('consumer-list');
  });

  it('renders no list slot when the consumer suppresses it', () => {
    const state = {
      components: { root: 'nav', list: 'ol' },
      root: {},
      size: 'medium',
    } as unknown as BreadcrumbState;

    expect(useBreadcrumbStyles(state).list).toBeUndefined();
  });
});
