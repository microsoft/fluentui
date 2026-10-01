import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CounterBadge } from './CounterBadge';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    componentPath: require.resolve('./CounterBadge'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders count and visual state', () => {
    const result = render(<CounterBadge count={100} overflowCount={99} color="danger" />);
    const badge = result.container.firstElementChild;

    expect(badge).toHaveTextContent('99+');
    expect(badge).toHaveAttribute('data-overflowed');
    expect(badge).toHaveAttribute('data-color', 'danger');
    expect(badge).toHaveClass('fui-CounterBadge');
  });
});
