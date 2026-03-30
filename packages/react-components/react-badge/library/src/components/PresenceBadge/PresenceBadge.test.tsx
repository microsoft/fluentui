import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import type { PresenceBadgeStatus } from './PresenceBadge.types';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
  });

  it('renders a default state', () => {
    const { container } = render(<PresenceBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  const STATUS_LABELS: Record<PresenceBadgeStatus, string> = {
    busy: 'busy',
    'out-of-office': 'out of office',
    away: 'away',
    available: 'available',
    offline: 'offline',
    'do-not-disturb': 'do not disturb',
    unknown: 'unknown',
    blocked: 'blocked',
  };

  it.each(Object.keys(STATUS_LABELS) as PresenceBadgeStatus[])(
    'renders correctly aria label for "%s" status',
    status => {
      const { getByLabelText } = render(<PresenceBadge status={status} />);
      expect(getByLabelText(STATUS_LABELS[status])).toBeTruthy();
    },
  );
});
