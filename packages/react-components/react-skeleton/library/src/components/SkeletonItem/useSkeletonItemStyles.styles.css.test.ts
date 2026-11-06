import { renderHook } from '@testing-library/react';
import { useSkeletonItem_unstable } from './useSkeletonItem';
import type { SkeletonItemProps } from './SkeletonItem.types';
import { useSkeletonItemStyles_unstable } from './useSkeletonItemStyles.styles.css';

jest.mock('./SkeletonItem.module.css', () => ({
  root: 'css-root',
  block: 'css-block',
  wave: 'css-wave',
  pulse: 'css-pulse',
  translucent: 'css-translucent',
  rectangle: 'css-rectangle',
  size8: 'css-size8',
  size12: 'css-size12',
  size14: 'css-size14',
  size16: 'css-size16',
  size20: 'css-size20',
  size22: 'css-size22',
  size24: 'css-size24',
  size28: 'css-size28',
  size32: 'css-size32',
  size36: 'css-size36',
  size40: 'css-size40',
  size48: 'css-size48',
  size52: 'css-size52',
  size56: 'css-size56',
  size64: 'css-size64',
  size72: 'css-size72',
  size92: 'css-size92',
  size96: 'css-size96',
  size120: 'css-size120',
  size128: 'css-size128',
  circle: 'css-circle',
  square: 'css-square',
}));

const renderStyles = (props: SkeletonItemProps = {}) =>
  renderHook(() => useSkeletonItemStyles_unstable(useSkeletonItem_unstable(props, null))).result.current;

describe('useSkeletonItemStyles_unstable (CSS Modules)', () => {
  it('uses the default wave, rectangle and numeric size', () => {
    expect(renderStyles().root.className).toBe('fui-SkeletonItem css-root css-wave css-rectangle css-size16');
  });
  it.each(['rectangle', 'square', 'circle'] as const)(
    'maps independent shape %s and animation/appearance dimensions',
    shape => {
      const state = renderStyles({ as: 'span', animation: 'pulse', appearance: 'translucent', shape, size: 32 });
      expect(state.root.className).toBe(
        'fui-SkeletonItem css-root css-block css-pulse css-translucent css-' + shape + ' css-size32',
      );
    },
  );
  it.each([8, 12, 14, 16, 20, 22, 24, 28, 32, 36, 40, 48, 52, 56, 64, 72, 92, 96, 120, 128] as const)(
    'maps size %s directly',
    size => {
      expect(renderStyles({ size }).root.className).toContain('css-size' + size);
    },
  );
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSkeletonItem_unstable({ className: 'caller-root' }, null);
      expect(useSkeletonItemStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
  });
});
