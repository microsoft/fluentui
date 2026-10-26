import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { renderHook } from '@testing-library/react-hooks';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { CarouselProvider } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import type { CarouselContextValue } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { createCarouselStore } from '../TeachingPopoverCarousel/Carousel/createCarouselStore';
import {
  useTeachingPopoverCarouselFooterButtonBase_unstable,
  useTeachingPopoverCarouselFooterButton_unstable,
} from './useTeachingPopoverCarouselFooterButton';

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
  storeValues?: string[];
};

function makeWrapper(options: WrapperOptions = {}) {
  const store = createCarouselStore();
  for (const v of options.storeValues ?? []) {
    store.addValue(v);
  }
  const carouselValue: CarouselContextValue = {
    store,
    value: null,
    selectPageByDirection: () => null,
    selectPageByValue: () => null,
    ...options.carousel,
  };
  const popoverValue: PopoverContextValue = { ...defaultPopoverContext, ...options.popover };
  return ({ children }: { children?: React.ReactNode }) =>
    React.createElement(
      PopoverProvider,
      { value: popoverValue },
      React.createElement(CarouselProvider, { value: carouselValue }, children),
    );
}

function makeMouseEvent(defaultPrevented = false): React.MouseEvent<HTMLButtonElement & HTMLAnchorElement> {
  return {
    isDefaultPrevented: () => defaultPrevented,
  } as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>;
}

describe('useTeachingPopoverCarouselFooterButton_unstable', () => {
  it('supplies the carousel snapshot when rendering a footer button on the server', () => {
    const Wrapper = makeWrapper({ storeValues: ['first', 'last'], carousel: { value: 'first' } });
    const Example = () => {
      const state = useTeachingPopoverCarouselFooterButtonBase_unstable(
        { navType: 'next', children: 'Next', altText: 'Done' },
        React.useRef<HTMLButtonElement>(null),
      );
      return <button type="button">{state.root.children}</button>;
    };
    expect(
      renderToString(
        <Wrapper>
          <Example />
        </Wrapper>,
      ),
    ).toContain('Next');
  });

  it.each([useTeachingPopoverCarouselFooterButtonBase_unstable, useTeachingPopoverCarouselFooterButton_unstable])(
    '%p defaults to a non-submitting button and preserves explicit submit intent',
    useFooterButton => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
      const { result } = renderHook(() => useFooterButton({ navType: 'next', altText: 'Done', type: undefined }, ref), {
        wrapper: makeWrapper(),
      });
      expect(result.current.root.type).toBe('button');
      const { result: submitResult } = renderHook(
        () => useFooterButton({ navType: 'next', altText: 'Done', type: 'submit' }, ref),
        { wrapper: makeWrapper() },
      );
      expect(submitResult.current.root.type).toBe('submit');
    },
  );

  it.each([useTeachingPopoverCarouselFooterButtonBase_unstable, useTeachingPopoverCarouselFooterButton_unstable])(
    '%p suppresses disabled anchor navigation and consumer clicks',
    useFooterButton => {
      const selectPageByDirection = jest.fn();
      const onClick = jest.fn();
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
      const { result } = renderHook(
        () =>
          useFooterButton({ as: 'a', href: '#next', disabled: true, navType: 'next', altText: 'Done', onClick }, ref),
        { wrapper: makeWrapper({ carousel: { selectPageByDirection } }) },
      );
      const event = { ...makeMouseEvent(), preventDefault: jest.fn(), stopPropagation: jest.fn() };
      result.current.root.onClick?.(event);
      expect(result.current.root['aria-disabled']).toBe(true);
      expect('href' in result.current.root ? result.current.root.href : undefined).toBeUndefined();
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(selectPageByDirection).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    },
  );

  it('inherits ButtonState components shape (root: button, icon: span)', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () => useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Done' }, ref),
      { wrapper: makeWrapper() },
    );
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'button', icon: 'span' });
  });

  it('echoes navType and altText on state', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () => useTeachingPopoverCarouselFooterButton_unstable({ navType: 'prev', altText: 'Skip' }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.navType).toBe('prev');
    expect(result.current.altText).toBe('Skip');
  });

  it.each([
    ['next', 'brand', 'secondary'],
    ['next', 'inverted', 'primary'],
    ['prev', 'brand', 'outline'],
    ['prev', 'inverted', 'secondary'],
  ] as const)(
    'navType=%p + popover appearance=%p → ButtonState appearance=%p',
    (navType, popoverAppearance, expected) => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
      const { result } = renderHook(
        () => useTeachingPopoverCarouselFooterButton_unstable({ navType, altText: 'Done' }, ref),
        { wrapper: makeWrapper({ popover: { appearance: popoverAppearance } }) },
      );
      expect(result.current.appearance).toBe(expected);
    },
  );

  it('popoverAppearance on state reflects popover-context appearance', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () => useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Done' }, ref),
      { wrapper: makeWrapper({ popover: { appearance: 'brand' } }) },
    );
    expect(result.current.popoverAppearance).toBe('brand');
  });

  it('isTrailing on navType="prev" replaces root.children with altText at first step', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () =>
        useTeachingPopoverCarouselFooterButton_unstable(
          { navType: 'prev', altText: 'Start', children: 'Previous' },
          ref,
        ),
      {
        wrapper: makeWrapper({
          storeValues: ['page-1', 'page-2', 'page-3'],
          carousel: { value: 'page-1' },
        }),
      },
    );
    expect(result.current.root.children).toBe('Start');
  });

  it('isTrailing on navType="next" replaces root.children with altText at last step', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () =>
        useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Finish', children: 'Next' }, ref),
      {
        wrapper: makeWrapper({
          storeValues: ['page-1', 'page-2', 'page-3'],
          carousel: { value: 'page-3' },
        }),
      },
    );
    expect(result.current.root.children).toBe('Finish');
  });

  it('uses props.children at intermediate steps', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () =>
        useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Finish', children: 'Next' }, ref),
      {
        wrapper: makeWrapper({
          storeValues: ['page-1', 'page-2', 'page-3'],
          carousel: { value: 'page-2' },
        }),
      },
    );
    expect(result.current.root.children).toBe('Next');
  });

  it('uses props.children when activeValue is missing', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { result } = renderHook(
      () =>
        useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Finish', children: 'Next' }, ref),
      { wrapper: makeWrapper({ storeValues: ['page-1', 'page-2'], carousel: { value: null } }) },
    );
    expect(result.current.root.children).toBe('Next');
  });

  it('root.onClick calls selectPageByDirection with the navType', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByDirection = jest.fn();
    const { result } = renderHook(
      () => useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Done' }, ref),
      { wrapper: makeWrapper({ carousel: { selectPageByDirection } }) },
    );
    const ev = makeMouseEvent();
    result.current.root.onClick?.(ev);
    expect(selectPageByDirection).toHaveBeenCalledWith(ev, 'next');
  });

  it('root.onClick short-circuits when ev.isDefaultPrevented() is true', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByDirection = jest.fn();
    const { result } = renderHook(
      () => useTeachingPopoverCarouselFooterButton_unstable({ navType: 'next', altText: 'Done' }, ref),
      { wrapper: makeWrapper({ carousel: { selectPageByDirection } }) },
    );
    const ev = makeMouseEvent(true);
    result.current.root.onClick?.(ev);
    expect(selectPageByDirection).not.toHaveBeenCalled();
  });

  it('merges user-provided onClick with internal handler', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const selectPageByDirection = jest.fn();
    const userOnClick = jest.fn();
    const { result } = renderHook(
      () =>
        useTeachingPopoverCarouselFooterButton_unstable(
          { navType: 'next', altText: 'Done', onClick: userOnClick },
          ref,
        ),
      { wrapper: makeWrapper({ carousel: { selectPageByDirection } }) },
    );
    const ev = makeMouseEvent();
    result.current.root.onClick?.(ev);
    expect(userOnClick).toHaveBeenCalledWith(ev);
    expect(selectPageByDirection).toHaveBeenCalledWith(ev, 'next');
  });
});
