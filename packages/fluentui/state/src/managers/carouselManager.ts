import { createManager } from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type CarouselActions = {
  setIndexes: (activeIndex: number) => void;
  setAriaLiveOn: (ariaLiveOn: boolean) => void;
  setShouldFocusContainer: (shouldFocusContainer: boolean) => void;
  setIsFromKeyboard: (isFromKeyboard: boolean) => void;
};

export type CarouselState = {
  activeIndex: number;
  ariaLiveOn: boolean;
  shouldFocusContainer: boolean;
  isFromKeyboard: boolean;
};

export type CarouselManager = Manager<CarouselState, CarouselActions>;

export const createCarouselManager = (
  config: Partial<ManagerConfig<CarouselState, CarouselActions>> = {},
): CarouselManager =>
  createManager<CarouselState, CarouselActions>({
    ...config,
    state: {
      activeIndex: 0,
      ariaLiveOn: false,
      shouldFocusContainer: false,
      isFromKeyboard: false,
      ...config.state,
    },
    actions: {
      setIndexes: activeIndex => () => ({ activeIndex }),
      setAriaLiveOn: ariaLiveOn => () => ({ ariaLiveOn }),
      setShouldFocusContainer: shouldFocusContainer => () => ({ shouldFocusContainer }),
      setIsFromKeyboard: isFromKeyboard => () => ({ isFromKeyboard }),
      ...config.actions,
    },
  });
