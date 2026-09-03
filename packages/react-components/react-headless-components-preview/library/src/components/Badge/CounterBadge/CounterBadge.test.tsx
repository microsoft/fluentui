import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { CounterBadge } from './CounterBadge';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    disabledTests: ['has-top-level-file-extra'],
  });

  it('hides an empty counter by default', () => {
    render(<CounterBadge data-testid="counter" />);

    expect(screen.getByTestId('counter')).toHaveAttribute('data-count', '0');
    expect(screen.getByTestId('counter')).toHaveAttribute('data-hidden', '');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-dot');
  });

  it('renders zero when showZero is set', () => {
    render(<CounterBadge count={0} showZero data-testid="counter" />);

    expect(screen.getByTestId('counter')).toHaveTextContent('0');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-hidden');
  });

  it('does not hide an explicit zero child', () => {
    render(<CounterBadge data-testid="counter">{0}</CounterBadge>);

    expect(screen.getByTestId('counter')).toHaveTextContent('0');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-hidden');
  });

  it('renders a dot without count content', () => {
    render(<CounterBadge count={4} dot data-testid="counter" />);

    expect(screen.getByTestId('counter')).toHaveAttribute('data-dot', '');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-hidden');
    expect(screen.getByTestId('counter')).toBeEmptyDOMElement();
  });

  it('formats and marks an overflowing count', () => {
    render(<CounterBadge count={100} overflowCount={99} data-testid="counter" />);

    expect(screen.getByTestId('counter')).toHaveTextContent('99+');
    expect(screen.getByTestId('counter')).toHaveAttribute('data-count', '100');
    expect(screen.getByTestId('counter')).toHaveAttribute('data-overflowed', '');
  });

  it('does not allow reserved data attributes to misrepresent state', () => {
    render(
      <CounterBadge count={2} data-count="99" data-dot="" data-hidden="" data-overflowed="" data-testid="counter" />,
    );

    expect(screen.getByTestId('counter')).toHaveAttribute('data-count', '2');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-dot');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-hidden');
    expect(screen.getByTestId('counter')).not.toHaveAttribute('data-overflowed');
  });
});
