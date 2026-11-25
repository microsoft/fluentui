import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import type { PresenceBadgeStatus } from './PresenceBadge.types';
import { PresenceBadge } from './PresenceBadge';

const statusLabels: Record<PresenceBadgeStatus, string> = {
  available: 'available',
  away: 'away',
  blocked: 'blocked',
  busy: 'busy',
  'do-not-disturb': 'do not disturb',
  offline: 'offline',
  'out-of-office': 'out of office',
  unknown: 'unknown',
};

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
    disabledTests: ['has-top-level-file-extra'],
  });

  it.each(Object.entries(statusLabels) as [PresenceBadgeStatus, string][])(
    'renders the %s status with an accessible name',
    (status, label) => {
      render(<PresenceBadge status={status} data-testid="presence" />);

      expect(screen.getByRole('img', { name: label })).toHaveAttribute('data-status', status);
    },
  );

  it('combines out-of-office with the current status', () => {
    render(<PresenceBadge status="busy" outOfOffice data-testid="presence" />);

    expect(screen.getByRole('img', { name: 'busy out of office' })).toHaveAttribute('data-out-of-office', '');
  });

  it('does not duplicate the out-of-office accessible name', () => {
    render(<PresenceBadge status="out-of-office" outOfOffice />);

    expect(screen.getByRole('img', { name: 'out of office' })).toBeInTheDocument();
  });

  it('does not allow reserved data attributes to misrepresent state', () => {
    render(<PresenceBadge status="away" data-status="busy" data-out-of-office="" data-testid="presence" />);

    expect(screen.getByTestId('presence')).toHaveAttribute('data-status', 'away');
    expect(screen.getByTestId('presence')).not.toHaveAttribute('data-out-of-office');
  });
});
