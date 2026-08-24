import * as React from 'react';
import { render } from '@testing-library/react';

import { Badge } from './Badge';
import { isConformant } from '../../testing/isConformant';
import type { BadgeState } from './Badge.types';
import { badgeClassNames, useBadgeStyles } from './useBadgeStyles';

import styles from './Badge.module.css';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
    requiredProps: { children: 'Badge' },
  });

  it('stamps data-size and the marker class', () => {
    const { getByTestId } = render(
      <>
        <Badge data-testid="default">Default</Badge>
        <Badge data-testid="large" size="large">
          Large
        </Badge>
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('large').getAttribute('data-size')).toBe('large');
    expect(getByTestId('default').className).toContain(badgeClassNames.root);
    expect(getByTestId('default')).toHaveClass('fui-badge');
    expect(getByTestId('default')).toHaveClass('group/fui-badge');
    expect(getByTestId('default').classList[0]).toBe('fui-badge');
  });

  it('stamps data-empty by counting rendered children, not by truthiness', () => {
    const { getByTestId } = render(
      <>
        <Badge data-testid="text">Content</Badge>
        <Badge data-testid="zero">{0}</Badge>
        <Badge data-testid="emptyString">{''}</Badge>
        <Badge data-testid="none" />
        <Badge data-testid="null">{null}</Badge>
        <Badge data-testid="false">{false}</Badge>
      </>,
    );

    // 0 and '' render text and keep the icon spacing; null/false/absent do not.
    expect(getByTestId('text').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('zero').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('emptyString').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('none').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('null').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('false').hasAttribute('data-empty')).toBe(true);
  });

  it('leaves data-icon-position to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <Badge data-testid="noIcon">Badge</Badge>
        <Badge data-testid="before" icon={<span />}>
          Badge
        </Badge>
        <Badge data-testid="after" icon={<span />} iconPosition="after">
          Badge
        </Badge>
      </>,
    );

    expect(getByTestId('noIcon').hasAttribute('data-icon-position')).toBe(false);
    expect(getByTestId('before').getAttribute('data-icon-position')).toBe('before');
    expect(getByTestId('after').getAttribute('data-icon-position')).toBe('after');
  });

  it('gives every appearance and color pair its own module class', () => {
    const colors = ['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'] as const;
    const { getByTestId } = render(
      <>
        {colors.map(color => (
          <Badge key={color} data-testid={color} appearance="tint" color={color}>
            8
          </Badge>
        ))}
      </>,
    );

    // Appearance is held fixed so the one class that moves is the appearance-color pair.
    const classLists = colors.map(color => getByTestId(color).className.split(' '));

    expect(new Set(classLists.map(list => list.join(' '))).size).toBe(colors.length);
    for (const list of classLists.slice(1)) {
      expect(list).toHaveLength(classLists[0].length);
      expect(list.filter(name => !classLists[0].includes(name))).toHaveLength(1);
    }
  });

  it('looks up the root and icon classes by the keys the stylesheet authors', () => {
    const { getByTestId } = render(
      <Badge data-testid="root" appearance="outline" color="danger" shape="rounded" icon={<svg data-testid="glyph" />}>
        8
      </Badge>,
    );

    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const root = getByTestId('root');

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass(styles.rounded);
    expect(root).toHaveClass(styles.outline);
    expect(root).toHaveClass(styles.outlineDanger);
    expect(getByTestId('glyph').parentElement).toHaveClass(styles.icon);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled',
      color: 'brand',
      components: { root: 'div', icon: 'span' },
      icon: { as: 'span', className: 'consumer-icon' },
      iconPosition: 'before',
      root: { as: 'div', children: 'Badge', className: 'consumer' },
      shape: 'circular',
      size: 'medium',
    } as unknown as BadgeState;

    const styled = useBadgeStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.root.className).toBe('consumer');
    expect(state.icon?.className).toBe('consumer-icon');
    expect(styled.root.className).toContain('consumer');
    expect(styled.icon?.className).toContain('consumer-icon');
  });
});
