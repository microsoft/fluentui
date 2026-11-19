import * as React from 'react';
import { render } from '@testing-library/react';
import { ChevronLeftRegular } from '@fluentui/react-icons/headless/svg/chevron-left';
import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right';

import { isConformant } from '../../testing/isConformant';
import { stampsOf } from '../../testing/stampsOf';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import type { BreadcrumbDividerState } from './BreadcrumbDivider.types';
import { FluentProvider } from '../FluentProvider';
import { breadcrumbDividerClassNames, useBreadcrumbDividerStyles } from './useBreadcrumbDividerStyles';

import styles from './BreadcrumbDivider.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/breadcrumb', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/breadcrumb');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useBreadcrumbDivider: (...args: Parameters<typeof actual.useBreadcrumbDivider>) =>
      deepFreezeState(actual.useBreadcrumbDivider(...args)),
  };
});

const sizes = ['small', 'medium', 'large'] as const;

const pathOf = (element: HTMLElement): string | null => element.querySelector('svg path')?.getAttribute('d') ?? null;

const glyphPath = (glyph: React.ReactElement): string | null => {
  const { container } = render(glyph);

  return container.querySelector('path')?.getAttribute('d') ?? null;
};

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<BreadcrumbDivider data-testid="root" />);

    const root = getByTestId('root');

    expect(root.tagName).toBe('LI');
    expect(root).toHaveClass('fui-breadcrumb-divider');
    expect(root).toHaveClass('group/fui-breadcrumb-divider');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-breadcrumb-divider');
    expect(breadcrumbDividerClassNames.root).toBe('fui-breadcrumb-divider group/fui-breadcrumb-divider');
    expect(root.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders exactly one chevron and discards consumer children', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbDivider data-testid="bare" />
        <BreadcrumbDivider data-testid="text">X</BreadcrumbDivider>
        <BreadcrumbDivider data-testid="element">
          <b>B</b>
        </BreadcrumbDivider>
      </>,
    );

    const chevron = glyphPath(<ChevronRightRegular />);

    for (const id of ['bare', 'text', 'element']) {
      const root = getByTestId(id);

      expect(root.querySelectorAll('svg')).toHaveLength(1);
      expect(pathOf(root)).toBe(chevron);
      expect(root.textContent).toBe('');
      expect(root.querySelector('b')).toBeNull();
    }
  });

  it('chooses the chevron from the provider direction', () => {
    const right = glyphPath(<ChevronRightRegular />);
    const left = glyphPath(<ChevronLeftRegular />);

    expect(right).not.toBe(left);

    const { getByTestId } = render(
      <>
        <BreadcrumbDivider data-testid="no-provider" />
        <FluentProvider dir="ltr">
          <BreadcrumbDivider data-testid="ltr" />
        </FluentProvider>
        <FluentProvider dir="rtl">
          <BreadcrumbDivider data-testid="rtl" />
        </FluentProvider>
      </>,
    );

    expect(pathOf(getByTestId('no-provider'))).toBe(right);
    expect(pathOf(getByTestId('ltr'))).toBe(right);
    expect(pathOf(getByTestId('rtl'))).toBe(left);
  });

  it('takes its size from the breadcrumb context, defaulting to medium', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbDivider data-testid="loose" />
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbDivider data-testid={size} />
          </Breadcrumb>
        ))}
      </>,
    );

    expect(getByTestId('loose').getAttribute('data-size')).toBe('medium');

    for (const size of sizes) {
      expect(getByTestId(size).getAttribute('data-size')).toBe(size);
    }
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByTestId } = render(
      <BreadcrumbDivider ref={ref} data-testid="root" id="divider" className="consumer" style={{ margin: 2 }} />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('divider');
    expect(root).toHaveClass('consumer');
    expect(root.style.margin).toBe('2px');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'li' },
      root: { className: 'consumer' },
      size: 'large',
    } as unknown as BreadcrumbDividerState;

    const styled = useBreadcrumbDividerStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(stampsOf(styled.root)['data-size']).toBe('large');
    expect(styled.root.className).toContain('consumer');
  });

  it('falls back to medium when no breadcrumb supplied a size', () => {
    const state = {
      components: { root: 'li' },
      root: {},
    } as unknown as BreadcrumbDividerState;

    expect(stampsOf(useBreadcrumbDividerStyles(state).root)['data-size']).toBe('medium');
  });
});
