import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { CarouselProvider } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import type { CarouselContextValue } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { createCarouselStore } from '../TeachingPopoverCarousel/Carousel/createCarouselStore';
import { useTeachingPopoverCarouselNav_unstable } from './useTeachingPopoverCarouselNav';

function makeWrapper(storeValues: string[] = []) {
  const store = createCarouselStore();
  for (const v of storeValues) {
    store.addValue(v);
  }
  const carouselValue: CarouselContextValue = {
    store,
    value: null,
    selectPageByDirection: () => null,
    selectPageByValue: () => null,
  };
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(CarouselProvider, { value: carouselValue }, children);
}

describe('useTeachingPopoverCarouselNav_unstable', () => {
  it('returns components shape { root: div }', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: () => null }, ref), {
      wrapper: makeWrapper(),
    });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'div' });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: () => null }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root).toBeDefined();
  });

  it('root has role="tablist" and tabIndex 0', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: () => null }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root.role).toBe('tablist');
    expect(result.current.root.tabIndex).toBe(0);
  });

  it('root.children is null (children prop is a render function, not rendered into root)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const renderFn = (v: string) => React.createElement('button', { key: v }, v);
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: renderFn }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root.children).toBeNull();
  });

  it('renderNavButton equals props.children', () => {
    const ref = React.createRef<HTMLDivElement>();
    const renderFn = (v: string) => React.createElement('button', { key: v }, v);
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: renderFn }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.renderNavButton).toBe(renderFn);
  });

  it('values snapshot reflects the carousel store contents', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: () => null }, ref), {
      wrapper: makeWrapper(['page-1', 'page-2', 'page-3']),
    });
    expect(result.current.values).toEqual(['page-1', 'page-2', 'page-3']);
  });

  it('root carries tabster arrow-navigation data attributes', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNav_unstable({ children: () => null }, ref), {
      wrapper: makeWrapper(),
    });
    const rootKeys = Object.keys(result.current.root);
    const hasTabsterAttr = rootKeys.some(k => k.startsWith('data-tabster'));
    expect(hasTabsterAttr).toBe(true);
  });
});
