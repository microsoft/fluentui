import * as React from 'react';
import { render } from '@testing-library/react';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { useTeachingPopoverCarousel_unstable } from './useTeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

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

// eslint-disable-next-line @typescript-eslint/naming-convention
function Harness({
  hookProps,
  captureState,
}: {
  hookProps: TeachingPopoverCarouselProps;
  captureState: (state: TeachingPopoverCarouselState) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useTeachingPopoverCarousel_unstable(hookProps, ref);
  captureState(state);

  // Render the root slot's element so the merged ref (including the internal rootRef)
  // attaches to a real DOM node — otherwise the internal carousel useEffect crashes
  // when querying for carousel items.
  const {
    as,
    ref: rootRef,
    ...rootProps
  } = state.root as unknown as React.HTMLAttributes<HTMLDivElement> & {
    as?: string;
    ref?: React.Ref<HTMLDivElement>;
  };
  return <div {...rootProps} ref={rootRef} />;
}

function renderCarouselHook(
  hookProps: TeachingPopoverCarouselProps,
  contextValue: Partial<PopoverContextValue> = {},
): TeachingPopoverCarouselState {
  let captured!: TeachingPopoverCarouselState;
  const captureState = (state: TeachingPopoverCarouselState) => {
    captured = state;
  };
  render(
    <PopoverProvider value={{ ...defaultPopoverContext, ...contextValue }}>
      <Harness hookProps={hookProps} captureState={captureState} />
    </PopoverProvider>,
  );
  return captured;
}

describe('useTeachingPopoverCarousel_unstable', () => {
  it('returns components shape { root: div }', () => {
    const state = renderCarouselHook({ defaultValue: 'page-1' });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(state.components).toEqual({ root: 'div' });
  });

  it('always returns a root slot', () => {
    const state = renderCarouselHook({ defaultValue: 'page-1' });
    expect(state.root).toBeDefined();
  });

  it('exposes carousel state fields (store, selectPageByDirection, selectPageByValue, value)', () => {
    const state = renderCarouselHook({ defaultValue: 'page-1' });
    expect(state.store).toBeDefined();
    expect(typeof state.selectPageByDirection).toBe('function');
    expect(typeof state.selectPageByValue).toBe('function');
    expect(state.value).toBe('page-1');
  });

  it('reflects controlled value prop on state.value', () => {
    const state = renderCarouselHook({ value: 'page-3' });
    expect(state.value).toBe('page-3');
  });

  it.each([undefined, 'brand', 'inverted'] as const)(
    'state.appearance reflects popover-context appearance=%p',
    appearance => {
      const state = renderCarouselHook({ defaultValue: 'page-1' }, { appearance });
      expect(state.appearance).toBe(appearance);
    },
  );

  it('spreads extra props onto root', () => {
    const state = renderCarouselHook({
      defaultValue: 'page-1',
      className: 'custom-class',
      'aria-label': 'carousel',
    });
    expect(state.root.className).toBe('custom-class');
    expect(state.root['aria-label']).toBe('carousel');
  });
});
