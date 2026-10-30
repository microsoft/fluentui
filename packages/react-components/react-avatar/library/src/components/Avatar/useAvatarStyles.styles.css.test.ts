import { renderHook } from '@testing-library/react';
import { useAvatar_unstable } from './useAvatar';
import { useAvatarStyles_unstable } from './useAvatarStyles.styles.css';

jest.mock('./Avatar.module.css', () => ({
  root: 'avatar-root',
  image: 'avatar-image',
  iconInitials: 'avatar-content',
  badge: 'avatar-badge',
  badgeAlign: 'avatar-badge-align',
  badgeCutout: 'avatar-badge-cutout',
  neutral: 'avatar-neutral',
  size32: 'avatar-size32',
  small: 'avatar-badge-small',
}));

describe('useAvatarStyles_unstable (CSS Modules)', () => {
  it('cuts the badge out of image and fallback content while preserving caller classes', () => {
    const { result } = renderHook(() => {
      const state = useAvatar_unstable(
        {
          name: 'Test User',
          className: 'caller-root',
          image: { src: 'avatar.png', className: 'caller-image' },
          initials: { className: 'caller-initials' },
          badge: { status: 'available', className: 'caller-badge' },
        },
        null,
      );
      return useAvatarStyles_unstable(state);
    });

    expect(result.current.root.className).toContain('avatar-badge-align');
    expect(result.current.root.className).toMatch(/caller-root$/);
    for (const [slot, callerClass] of [
      [result.current.image, 'caller-image'],
      [result.current.initials, 'caller-initials'],
    ] as const) {
      expect(slot?.className).toContain('avatar-badge-cutout');
      expect(slot?.className).toMatch(new RegExp(`${callerClass}$`));
    }
    expect(result.current.badge?.className).toContain('fui-Avatar__badge avatar-badge caller-badge');
  });

  it('cuts the badge out of the default icon', () => {
    const { result } = renderHook(() =>
      useAvatarStyles_unstable(
        useAvatar_unstable({ icon: { className: 'caller-icon' }, badge: { status: 'available' } }, null),
      ),
    );

    expect(result.current.icon?.className).toContain('avatar-badge-cutout');
    expect(result.current.icon?.className).toMatch(/caller-icon$/);
  });

  it('does not mask an avatar without a badge', () => {
    const { result } = renderHook(() =>
      useAvatarStyles_unstable(useAvatar_unstable({ image: { src: 'avatar.png' } }, null)),
    );

    expect(result.current.image?.className).not.toContain('avatar-badge-cutout');
    expect(result.current.root.className).not.toContain('avatar-badge-align');
  });
});
