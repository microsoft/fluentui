import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { useSkeletonItem_unstable } from '../SkeletonItem/useSkeletonItem';
import { SkeletonContextProvider } from '../../contexts/SkeletonContext';
import { isConformant } from '../../testing/isConformant';

describe('Skeleton', () => {
  isConformant({
    Component: Skeleton,
    displayName: 'Skeleton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Skeleton>Default Skeleton</Skeleton>);
    expect(result.container).toMatchSnapshot();
  });
  it('has role progressbar', () => {
    const result = render(<Skeleton />);
    expect(result.getByRole('progressbar')).toBeDefined();
  });
  it('adds aria-busy to Skeleton', () => {
    const result = render(<Skeleton />);
    expect(result.getByRole('progressbar').getAttribute('aria-busy')).toBeDefined();
  });
  it('passes size prop to SkeletonItem via context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SkeletonContextProvider value={{ size: 24 }}>{children}</SkeletonContextProvider>
    );
    const { result } = renderHook(() => useSkeletonItem_unstable({}, React.createRef()), { wrapper });
    expect(result.current.size).toBe(24);
  });
  it('passes shape prop to SkeletonItem via context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SkeletonContextProvider value={{ shape: 'circle' }}>{children}</SkeletonContextProvider>
    );
    const { result } = renderHook(() => useSkeletonItem_unstable({}, React.createRef()), { wrapper });
    expect(result.current.shape).toBe('circle');
  });
  it('allows SkeletonItem to override Skeleton size prop', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SkeletonContextProvider value={{ size: 24 }}>{children}</SkeletonContextProvider>
    );
    const { result } = renderHook(() => useSkeletonItem_unstable({ size: 48 }, React.createRef()), { wrapper });
    expect(result.current.size).toBe(48);
  });
  it('allows SkeletonItem to override Skeleton shape prop', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SkeletonContextProvider value={{ shape: 'circle' }}>{children}</SkeletonContextProvider>
    );
    const { result } = renderHook(() => useSkeletonItem_unstable({ shape: 'square' }, React.createRef()), { wrapper });
    expect(result.current.shape).toBe('square');
  });
});
