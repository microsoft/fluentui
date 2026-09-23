import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PresenceBadge } from './PresenceBadge';

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
