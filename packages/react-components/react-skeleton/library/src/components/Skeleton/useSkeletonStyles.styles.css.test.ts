import { renderHook } from '@testing-library/react';
import { useSkeleton_unstable } from './useSkeleton';
import type { SkeletonProps } from './Skeleton.types';
import { useSkeletonStyles_unstable } from './useSkeletonStyles.styles.css';

jest.mock('./Skeleton.module.css', () => ({
  block: 'css-block',
}));

const renderStyles = (props: SkeletonProps = {}) =>
  renderHook(() => useSkeletonStyles_unstable(useSkeleton_unstable(props, null))).result.current;

describe('useSkeletonStyles_unstable (CSS Modules)', () => {
  it('does not change native block layout', () => {
    expect(renderStyles().root.className).toBe('fui-Skeleton');
  });
  it('gives span roots block layout', () => {
    expect(renderStyles({ as: 'span' }).root.className).toBe('fui-Skeleton css-block');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSkeleton_unstable({ className: 'caller-root' }, null);
      expect(useSkeletonStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
  });
});
