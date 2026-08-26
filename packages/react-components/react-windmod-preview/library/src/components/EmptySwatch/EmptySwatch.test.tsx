import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SwatchPicker as HeadlessSwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';

import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { EmptySwatch } from './EmptySwatch';
import type { EmptySwatchState } from './EmptySwatch.types';
import { emptySwatchClassNames, useEmptySwatchStyles } from './useEmptySwatchStyles';

import styles from './EmptySwatch.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/swatch-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/swatch-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useEmptySwatch: (...args: Parameters<typeof actual.useEmptySwatch>) =>
      deepFreezeState(actual.useEmptySwatch(...args)),
  };
});

const sizes = ['extra-small', 'small', 'medium', 'large'] as const;
const shapes = ['rounded', 'square', 'circular'] as const;

const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
  });

  it('stamps its marker pair and module class, slash-free first', () => {
    const { getByTestId } = render(<EmptySwatch data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-empty-swatch');
    expect(root).toHaveClass('group/fui-empty-swatch');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-empty-swatch');
    expect(emptySwatchClassNames.root).toBe('fui-empty-swatch group/fui-empty-swatch');
  });

  it('stamps its own resolved size and shape, defaulting to medium and square', () => {
    const { getByTestId } = render(
      <>
        <EmptySwatch data-testid="default" />
        {sizes.map(size => (
          <EmptySwatch key={size} data-testid={`size-${size}`} size={size} />
        ))}
        {shapes.map(shape => (
          <EmptySwatch key={shape} data-testid={`shape-${shape}`} shape={shape} />
        ))}
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('default').getAttribute('data-shape')).toBe('square');

    for (const size of sizes) {
      expect(getByTestId(`size-${size}`).getAttribute('data-size')).toBe(size);
    }

    for (const shape of shapes) {
      expect(getByTestId(`shape-${shape}`).getAttribute('data-shape')).toBe(shape);
    }
  });

  it('lets its own size and shape beat the picker', () => {
    const { getByTestId } = render(
      <SwatchPicker size="large" shape="circular">
        <EmptySwatch data-testid="inherit" />
        <EmptySwatch data-testid="override" size="small" shape="rounded" />
      </SwatchPicker>,
    );

    expect(getByTestId('inherit').getAttribute('data-size')).toBe('large');
    expect(getByTestId('inherit').getAttribute('data-shape')).toBe('circular');
    expect(getByTestId('override').getAttribute('data-size')).toBe('small');
    expect(getByTestId('override').getAttribute('data-shape')).toBe('rounded');
  });

  it('falls back to medium and square inside a headless picker, which publishes neither', () => {
    // Standalone, the context's own default value already supplies both; the `?? 'medium'` and
    // `?? 'square'` guards are reachable only here, where a provider IS present but publishes
    // undefined for all three look props.
    const { getByTestId } = render(
      <HeadlessSwatchPicker>
        <EmptySwatch data-testid="root" />
      </HeadlessSwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('root').getAttribute('data-shape')).toBe('square');
  });

  it('keeps the headless button contract', () => {
    const { getByTestId } = render(<EmptySwatch data-testid="root" />);

    const root = getByTestId('root');

    expect(root.tagName).toBe('BUTTON');
    expect(root.getAttribute('role')).toBe('radio');
    expect(root.getAttribute('aria-checked')).toBe('false');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EmptySwatch
        ref={ref}
        data-testid="root"
        id="es"
        aria-label="empty"
        className="consumer"
        style={{ margin: 2 }}
        onClick={onClick}
      />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('es');
    expect(root.getAttribute('aria-label')).toBe('empty');
    expect(root).toHaveClass('consumer');
    expect(root.style.margin).toBe('2px');

    fireEvent.click(root);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button' },
      root: { className: 'consumer' },
      size: 'extra-small',
      shape: 'circular',
    } as unknown as EmptySwatchState;

    const styled = useEmptySwatchStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(stampsOf(styled.root)['data-size']).toBe('extra-small');
    expect(stampsOf(styled.root)['data-shape']).toBe('circular');
    expect(styled.root.className).toContain('consumer');
  });
});
