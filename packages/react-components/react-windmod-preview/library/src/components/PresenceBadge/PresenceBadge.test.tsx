import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { PresenceBadge } from './PresenceBadge';
import type { PresenceBadgeState } from './PresenceBadge.types';
import { presenceBadgeClassNames, usePresenceBadgeStyles } from './usePresenceBadgeStyles';

import styles from './PresenceBadge.module.css';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
  });

  it('stamps the marker pair and data-size', () => {
    const { getByTestId } = render(<PresenceBadge data-testid="root" size="large" />);

    const root = getByTestId('root');

    expect(root.className).toContain(presenceBadgeClassNames.root);
    expect(root).toHaveClass('fui-presence-badge');
    expect(root).toHaveClass('group/fui-presence-badge');
    expect(root.classList[0]).toBe('fui-presence-badge');
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('data-size')).toBe('large');
  });

  it('leaves data-status and data-out-of-office to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <PresenceBadge data-testid="busy" status="busy" />
        <PresenceBadge data-testid="oof" status="away" outOfOffice />
      </>,
    );

    expect(getByTestId('busy').getAttribute('data-status')).toBe('busy');
    expect(getByTestId('busy').hasAttribute('data-out-of-office')).toBe(false);
    expect(getByTestId('oof').getAttribute('data-status')).toBe('away');
    expect(getByTestId('oof').hasAttribute('data-out-of-office')).toBe(true);
  });

  it('restores the default glyph per status, and lets a consumer icon win', () => {
    const { getByTestId } = render(
      <>
        <PresenceBadge data-testid="default" status="busy" />
        <PresenceBadge data-testid="custom" status="busy" icon={<svg data-testid="glyph" />} />
      </>,
    );

    expect(getByTestId('default').querySelector('svg')).not.toBeNull();
    expect(getByTestId('custom').querySelector('[data-testid="glyph"]')).not.toBeNull();
  });

  it('picks a different default glyph when combined with out-of-office', () => {
    const { getByTestId } = render(
      <>
        <PresenceBadge data-testid="available" status="available" />
        <PresenceBadge data-testid="available-oof" status="available" outOfOffice />
      </>,
    );

    const available = getByTestId('available').querySelector('svg');
    const availableOof = getByTestId('available-oof').querySelector('svg');

    expect(available).not.toBeNull();
    expect(availableOof).not.toBeNull();
    expect(available?.outerHTML).not.toBe(availableOof?.outerHTML);
  });

  it('carries the icon class on the glyph slot', () => {
    const { getByTestId } = render(<PresenceBadge data-testid="root" status="available" />);

    const icon = getByTestId('root').querySelector('span');

    expect(icon).toHaveClass(styles.icon);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div', icon: 'span' },
      icon: { as: 'span', className: 'consumer-icon' },
      outOfOffice: false,
      root: { as: 'div', className: 'consumer' },
      size: 'medium',
      status: 'available',
    } as unknown as PresenceBadgeState;

    const styled = usePresenceBadgeStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.icon?.className).toBe('consumer-icon');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(presenceBadgeClassNames.root);
    expect(styled.icon?.className).toContain('consumer-icon');
  });

  it('renders no icon slot when the headless state carries none', () => {
    const state = {
      components: { root: 'div', icon: 'span' },
      outOfOffice: false,
      root: { as: 'div' },
      size: 'medium',
      status: 'available',
    } as unknown as PresenceBadgeState;

    expect(usePresenceBadgeStyles(state).icon).toBeUndefined();
  });
});
