import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import type { PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';
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

  it.each<[PresenceBadgeState['size'], string]>([
    ['tiny', '6px'],
    ['extra-small', '10px'],
    ['small', '12px'],
    ['medium', '16px'],
    ['large', '20px'],
    ['extra-large', '28px'],
  ])('renders a %s icon at %s', (size, expectedFontSize) => {
    const { container } = render(<PresenceBadge size={size} />);
    const icon = container.querySelector('svg');

    expect(icon).not.toBeNull();
    const iconFontSize = window.getComputedStyle(icon!).fontSize;
    const inheritedFontSize = window.getComputedStyle(icon!.parentElement!).fontSize;

    expect(iconFontSize || inheritedFontSize).toBe(expectedFontSize);
  });

  it.each(Object.keys(STATUS_LABELS) as PresenceBadgeStatus[])('renders correct aria label for "%s" status', status => {
    const { getByLabelText } = render(<PresenceBadge status={status} />);
    expect(getByLabelText(STATUS_LABELS[status])).toBeTruthy();
  });
});
