import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { CarouselProvider } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import type { CarouselContextValue } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { createCarouselStore } from '../TeachingPopoverCarousel/Carousel/createCarouselStore';
import { ValueIdContextProvider } from '../TeachingPopoverCarouselNav/valueIdContext';
import { useTeachingPopoverCarouselNavButton_unstable } from './useTeachingPopoverCarouselNavButton';

const defaultPopoverContext: PopoverContextValue = {
  open: true,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  size: 'medium',
  inline: false,
};

type WrapperOptions = {
  popover?: Partial<PopoverContextValue>;
  carousel?: Partial<CarouselContextValue>;
  valueId?: string;
};

function makeWrapper(options: WrapperOptions = {}) {
  const carouselValue: CarouselContextValue = {
    store: createCarouselStore(),
    value: null,
    selectPageByDirection: () => null,
    selectPageByValue: () => null,
    ...options.carousel,
  };
  const popoverValue: PopoverContextValue = { ...defaultPopoverContext, ...options.popover };
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      PopoverProvider,
      { value: popoverValue },
      React.createElement(
        CarouselProvider,
        { value: carouselValue },
        React.createElement(ValueIdContextProvider, { value: options.valueId ?? '' }, children),
      ),
    );
}

function makeMouseEvent(
  target: HTMLElement | null,
  defaultPrevented = false,
): React.MouseEvent<HTMLButtonElement & HTMLAnchorElement> {
  return {
    target,
    defaultPrevented,
    preventDefault: () => null,
  } as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>;
}

describe('useTeachingPopoverCarouselNavButton_unstable', () => {
  it('returns components shape { root: button }', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-1' }),
    });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'button' });
  });

  it('root has role="tab" and type="button"', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-1' }),
    });
    expect(result.current.root.role).toBe('tab');
    expect((result.current.root as { type?: string }).type).toBe('button');
  });

  it('isSelected is true when carousel.value matches valueIdContext value', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { value: 'page-2' } }),
    });
    expect(result.current.isSelected).toBe(true);
    expect(result.current.root['aria-selected']).toBe('true');
  });

  it('isSelected is false when carousel.value does not match', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { value: 'page-1' } }),
    });
    expect(result.current.isSelected).toBe(false);
    expect(result.current.root['aria-selected']).toBe('false');
  });

  it('root.onClick calls selectPageByValue with the valueId from context', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByValue = jest.fn();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { selectPageByValue } }),
    });
    const target = document.createElement('a');
    const ev = makeMouseEvent(target);
    result.current.root.onClick?.(ev);
    expect(selectPageByValue).toHaveBeenCalledWith(ev, 'page-2');
  });

  it('root.onClick short-circuits when ev.defaultPrevented is true', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByValue = jest.fn();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { selectPageByValue } }),
    });
    const target = document.createElement('a');
    const ev = makeMouseEvent(target, true);
    result.current.root.onClick?.(ev);
    expect(selectPageByValue).not.toHaveBeenCalled();
  });

  it('user-provided onClick is invoked before selectPageByValue', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByValue = jest.fn();
    const userOnClick = jest.fn();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({ onClick: userOnClick }, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { selectPageByValue } }),
    });
    const target = document.createElement('a');
    const ev = makeMouseEvent(target);
    result.current.root.onClick?.(ev);
    expect(userOnClick).toHaveBeenCalledWith(ev);
    expect(selectPageByValue).toHaveBeenCalledWith(ev, 'page-2');
  });

  it('root carries tabster default-focus attributes', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
      wrapper: makeWrapper({ valueId: 'page-2', carousel: { value: 'page-2' } }),
    });
    const rootKeys = Object.keys(result.current.root);
    const hasTabsterAttr = rootKeys.some(k => k.startsWith('data-tabster'));
    expect(hasTabsterAttr).toBe(true);
  });

  it.each([undefined, 'brand', 'inverted'] as const)(
    'state.appearance reflects popover-context appearance=%p',
    appearance => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
      const { result } = renderHook(() => useTeachingPopoverCarouselNavButton_unstable({}, ref), {
        wrapper: makeWrapper({ valueId: 'page-1', popover: { appearance } }),
      });
      expect(result.current.appearance).toBe(appearance);
    },
  );
});
