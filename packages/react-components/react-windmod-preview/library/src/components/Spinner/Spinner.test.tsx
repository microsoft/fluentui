import * as React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';
import type { SpinnerState } from './Spinner.types';
import { spinnerClassNames, useSpinnerStyles } from './useSpinnerStyles';

import styles from './Spinner.module.css';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    requiredProps: { label: 'Spinner' },
  });

  it('stamps the look props and the marker class', () => {
    const { getByTestId } = render(
      <>
        <Spinner data-testid="default" />
        <Spinner data-testid="huge" appearance="inverted" size="huge" />
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('default').getAttribute('data-appearance')).toBe('primary');
    expect(getByTestId('huge').getAttribute('data-size')).toBe('huge');
    expect(getByTestId('huge').getAttribute('data-appearance')).toBe('inverted');
    expect(getByTestId('default').className).toContain(spinnerClassNames.root);
    expect(getByTestId('default')).toHaveClass('fui-spinner');
    expect(getByTestId('default')).toHaveClass('group/fui-spinner');
    expect(getByTestId('default').classList[0]).toBe('fui-spinner');
  });

  it('leaves data-label-position to the headless hook, which stamps it with or without a label', () => {
    const { getByTestId } = render(
      <>
        <Spinner data-testid="noLabel" />
        <Spinner data-testid="default" label="Loading" />
        <Spinner data-testid="above" label="Loading" labelPosition="above" />
      </>,
    );

    // Always present, so it can never be read as a label-presence test.
    expect(getByTestId('noLabel').getAttribute('data-label-position')).toBe('after');
    expect(getByTestId('default').getAttribute('data-label-position')).toBe('after');
    expect(getByTestId('above').getAttribute('data-label-position')).toBe('above');
  });

  it('renders the spinner and tail slots, and orders the label by labelPosition', () => {
    const { getByTestId } = render(
      <>
        <Spinner data-testid="noLabel" />
        <Spinner data-testid="before" label="Loading" labelPosition="before" />
        <Spinner data-testid="above" label="Loading" labelPosition="above" />
        <Spinner data-testid="after" label="Loading" labelPosition="after" />
        <Spinner data-testid="below" label="Loading" labelPosition="below" />
      </>,
    );

    const bare = getByTestId('noLabel');

    expect(bare.children).toHaveLength(1);
    expect(bare.firstElementChild?.tagName).toBe('SPAN');
    expect(bare.firstElementChild?.children).toHaveLength(1);
    expect(bare.firstElementChild?.firstElementChild?.tagName).toBe('SPAN');

    expect(getByTestId('before').firstElementChild?.tagName).toBe('LABEL');
    expect(getByTestId('above').firstElementChild?.tagName).toBe('LABEL');
    expect(getByTestId('after').lastElementChild?.tagName).toBe('LABEL');
    expect(getByTestId('below').lastElementChild?.tagName).toBe('LABEL');
  });

  it('keeps the headless accessibility contract intact', () => {
    const { getByTestId } = render(<Spinner data-testid="root" label="Loading" />);

    const root = getByTestId('root');

    expect(root.getAttribute('role')).toBe('progressbar');
    expect(root.getAttribute('aria-labelledby')).toBe(root.querySelector('label')?.id);
  });

  it('looks up the four slot classes by the keys the stylesheet authors', () => {
    const { getByTestId } = render(<Spinner data-testid="root" label="Loading" />);

    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const root = getByTestId('root');
    const spinner = root.querySelector('span');

    expect(root).toHaveClass(styles.root);
    expect(spinner).toHaveClass(styles.spinner);
    expect(spinner?.firstElementChild).toHaveClass(styles.tail);
    expect(root.querySelector('label')).toHaveClass(styles.label);
    expect(root).not.toHaveClass(styles.spinner);
    expect(spinner).not.toHaveClass(styles.root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'div', spinner: 'span', spinnerTail: 'span', label: 'label' },
      delay: 0,
      label: { as: 'label', children: 'Loading', className: 'consumer-label' },
      labelPosition: 'after',
      root: { as: 'div', className: 'consumer' },
      shouldRenderSpinner: true,
      size: 'medium',
      spinner: { as: 'span', className: 'consumer-spinner' },
      spinnerTail: { as: 'span', className: 'consumer-tail' },
    } as unknown as SpinnerState;

    const styled = useSpinnerStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.root.className).toBe('consumer');
    expect(state.spinner?.className).toBe('consumer-spinner');
    expect(state.spinnerTail?.className).toBe('consumer-tail');
    expect(state.label?.className).toBe('consumer-label');
    expect(styled.root.className).toContain('consumer');
    expect(styled.spinner?.className).toContain('consumer-spinner');
    expect(styled.spinnerTail?.className).toContain('consumer-tail');
    expect(styled.label?.className).toContain('consumer-label');
  });

  it('passes absent slots through instead of decorating them', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'div', spinner: 'span', spinnerTail: 'span', label: 'label' },
      delay: 0,
      labelPosition: 'after',
      root: { as: 'div' },
      shouldRenderSpinner: true,
      size: 'medium',
      spinnerTail: { as: 'span' },
    } as unknown as SpinnerState;

    const styled = useSpinnerStyles(state);

    expect(styled.spinner).toBeUndefined();
    expect(styled.label).toBeUndefined();
    expect(styled.spinnerTail?.className).toBe(styles.tail);
    expect(styled.root.className).toBe(`${spinnerClassNames.root} ${styles.root}`);
  });
});
