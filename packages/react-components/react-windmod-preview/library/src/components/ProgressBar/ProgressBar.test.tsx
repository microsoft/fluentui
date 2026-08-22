import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ProgressBar } from './ProgressBar';
import type { ProgressBarState } from './ProgressBar.types';
import { progressBarClassNames, useProgressBarStyles } from './useProgressBarStyles';

import styles from './ProgressBar.module.css';

const barOf = (root: HTMLElement): Element => {
  const bar = root.firstElementChild;

  if (!bar) {
    throw new Error('ProgressBar rendered no bar slot');
  }

  return bar;
};

describe('ProgressBar', () => {
  isConformant({
    Component: ProgressBar,
    displayName: 'ProgressBar',
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<ProgressBar data-testid="root" />);

    const root = getByTestId('root');

    expect(root.className).toContain(progressBarClassNames.root);
    expect(root).toHaveClass('fui-progress-bar');
    expect(root).toHaveClass('group/fui-progress-bar');
    expect(root.classList[0]).toBe('fui-progress-bar');
  });

  it('stamps no data attribute of its own — every look prop resolves to a class', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="root" color="error" shape="square" thickness="large" value={0.5} />,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-color')).toBe(false);
    expect(root.hasAttribute('data-shape')).toBe(false);
    expect(root.hasAttribute('data-thickness')).toBe(false);
  });

  it('leaves data-indeterminate to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="indeterminate" />
        <ProgressBar data-testid="determinate" value={0.5} />
      </>,
    );

    expect(getByTestId('indeterminate').getAttribute('data-indeterminate')).toBe('');
    expect(getByTestId('determinate').hasAttribute('data-indeterminate')).toBe(false);
  });

  it('adds one shape class and one thickness class at a time', () => {
    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="default" />
        <ProgressBar data-testid="square-large" shape="square" thickness="large" />
      </>,
    );

    expect(getByTestId('default')).toHaveClass(styles.root);
    expect(getByTestId('default')).toHaveClass(styles.rounded);
    expect(getByTestId('default')).toHaveClass(styles.medium);
    expect(getByTestId('default')).not.toHaveClass(styles.square);
    expect(getByTestId('default')).not.toHaveClass(styles.large);
    expect(getByTestId('square-large')).toHaveClass(styles.square);
    expect(getByTestId('square-large')).toHaveClass(styles.large);
    expect(getByTestId('square-large')).not.toHaveClass(styles.rounded);
    expect(getByTestId('square-large')).not.toHaveClass(styles.medium);
  });

  it('stamps the bar class on the bar slot', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="determinate" value={0.5} />
        <ProgressBar data-testid="indeterminate" />
      </>,
    );

    expect(barOf(getByTestId('determinate'))).toHaveClass(styles.bar);
    expect(barOf(getByTestId('indeterminate'))).toHaveClass(styles.bar);
  });

  it('colours a determinate bar and always renders an indeterminate one brand', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="determinate-default" value={0.5} />
        <ProgressBar data-testid="determinate-error" value={0.5} color="error" />
        <ProgressBar data-testid="indeterminate-error" color="error" />
      </>,
    );

    expect(barOf(getByTestId('determinate-default'))).toHaveClass(styles.brand);
    expect(barOf(getByTestId('determinate-error'))).toHaveClass(styles.error);
    expect(barOf(getByTestId('determinate-error'))).not.toHaveClass(styles.brand);
    expect(barOf(getByTestId('indeterminate-error'))).toHaveClass(styles.brand);
    expect(barOf(getByTestId('indeterminate-error'))).not.toHaveClass(styles.error);
  });

  it('transitions the width only above the zero threshold', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="half" value={0.5} />
        <ProgressBar data-testid="zero" value={0} />
        <ProgressBar data-testid="at-threshold" value={0.01} />
        <ProgressBar data-testid="above-threshold" value={0.011} />
        <ProgressBar data-testid="indeterminate" />
      </>,
    );

    expect(barOf(getByTestId('half'))).toHaveClass(styles['non-zero-determinate']);
    expect(barOf(getByTestId('zero'))).not.toHaveClass(styles['non-zero-determinate']);
    expect(barOf(getByTestId('at-threshold'))).not.toHaveClass(styles['non-zero-determinate']);
    expect(barOf(getByTestId('above-threshold'))).toHaveClass(styles['non-zero-determinate']);
    expect(barOf(getByTestId('indeterminate'))).not.toHaveClass(styles['non-zero-determinate']);
  });

  it('leaves the bar carrying the headless-computed inline width', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="half" value={0.5} />
        <ProgressBar data-testid="ratio" value={42} max={100} />
        <ProgressBar data-testid="indeterminate" />
      </>,
    );

    expect(barOf(getByTestId('half'))).toHaveStyle({ width: '50%' });
    expect(barOf(getByTestId('ratio'))).toHaveStyle({ width: '42%' });
    expect((barOf(getByTestId('indeterminate')) as HTMLElement).style.width).toBe('');
  });

  it('passes the headless ARIA contract through', () => {
    const { getByTestId } = render(
      <>
        <ProgressBar data-testid="determinate" value={0.5} />
        <ProgressBar data-testid="indeterminate" />
      </>,
    );

    const determinate = getByTestId('determinate');

    expect(determinate.getAttribute('role')).toBe('progressbar');
    expect(determinate.getAttribute('aria-valuenow')).toBe('0.5');
    expect(determinate.getAttribute('aria-valuemin')).toBe('0');
    expect(determinate.getAttribute('aria-valuemax')).toBe('1');

    const indeterminate = getByTestId('indeterminate');

    expect(indeterminate.getAttribute('role')).toBe('progressbar');
    expect(indeterminate.hasAttribute('aria-valuenow')).toBe(false);
    expect(indeterminate.hasAttribute('aria-valuemin')).toBe(false);
    expect(indeterminate.hasAttribute('aria-valuemax')).toBe(false);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      color: 'error',
      components: { root: 'div', bar: 'div' },
      max: 1,
      root: { as: 'div', className: 'consumer' },
      bar: { as: 'div', className: 'consumer-bar' },
      shape: 'square',
      thickness: 'large',
      value: 0.5,
    } as unknown as ProgressBarState;

    const styled = useProgressBarStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.bar.className).toBe('consumer-bar');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(progressBarClassNames.root);
    expect(styled.bar.className).toContain('consumer-bar');
  });

  it('leaves the bar inline style untouched', () => {
    const state = {
      color: 'brand',
      components: { root: 'div', bar: 'div' },
      max: 1,
      root: { as: 'div' },
      bar: { as: 'div', style: { width: '50%' } },
      shape: 'rounded',
      thickness: 'medium',
      value: 0.5,
    } as unknown as ProgressBarState;

    const styled = useProgressBarStyles(state);

    expect(styled.bar.style).toBe(state.bar.style);
    expect(styled.bar.style).toEqual({ width: '50%' });
  });
});
