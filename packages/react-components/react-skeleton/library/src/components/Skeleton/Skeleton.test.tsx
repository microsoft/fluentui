import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Skeleton } from './Skeleton';
import { useSkeletonBase_unstable } from './useSkeleton';
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

describe('Skeleton DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <Skeleton animation="pulse" appearance="translucent" shape="circle" size={32} width="50%" />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-busy',
      'class',
      'role',
    ]);
  });

  it('does not forward design props from the base hook to the root slot', () => {
    const { result } = renderHook(() =>
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      useSkeletonBase_unstable({ shape: 'circle', size: 32, width: '50%' }, React.createRef()),
    );

    expect(result.current.root).not.toHaveProperty('shape');
    expect(result.current.root).not.toHaveProperty('size');
    expect(result.current.root).not.toHaveProperty('width');
  });
});
