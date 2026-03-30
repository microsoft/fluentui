import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import type { PresenceBadgeStatus } from './PresenceBadge.types';
import { DEFAULT_STRINGS as STATUS_LABELS } from './usePresenceBadge';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
  });

  it('renders a default state', () => {
    const { container } = render(<PresenceBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each(Object.keys(STATUS_LABELS) as PresenceBadgeStatus[])('renders correct aria label for "%s" status', status => {
    const { getByLabelText } = render(<PresenceBadge status={status} />);
    expect(getByLabelText(STATUS_LABELS[status])).toBeTruthy();
  });
});
