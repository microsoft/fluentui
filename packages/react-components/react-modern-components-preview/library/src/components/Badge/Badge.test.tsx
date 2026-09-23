import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Badge } from './Badge';
import { CounterBadge } from './CounterBadge';
import { PresenceBadge } from './PresenceBadge';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
  });

  it('renders a default state', () => {
    const result = render(<Badge>Default Badge</Badge>);
    expect(result.container).toMatchSnapshot();
  });
});

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

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
    componentPath: require.resolve('./PresenceBadge'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders status, accessible name, and default icon', () => {
    const result = render(<PresenceBadge status="busy" size="large" />);
    const badge = result.getByRole('img', { name: 'busy' });

    expect(badge).toHaveAttribute('data-status', 'busy');
    expect(badge).toHaveAttribute('data-size', 'large');
    expect(badge).toHaveClass('fui-PresenceBadge');
    expect(badge.querySelector('svg')).not.toBeNull();
  });
});
