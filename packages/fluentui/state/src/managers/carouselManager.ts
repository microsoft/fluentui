import createManager from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type CarouselActions = {
  UpdatePreActiveIndex: (prevActiveIndex: number) => void;
  UpdateActiveIndex: (activeIndex: number | string) => void;
  UpdateAriaLiveOn: (ariaLiveOn: boolean) => void;
  UpdateItemIds: (itemIds: string[]) => void;
  UpdateShouldFocusContainer: (shouldFocusContainer: boolean) => void;
  UpdateIsFromKeyboard: (isFromKeyboard: boolean) => void;
};

export type CarouselState = {
  activeIndex: number | string;
  prevActiveIndex: number;
  ariaLiveOn: boolean;
  itemIds: string[];
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
      prevActiveIndex: -1,
      ariaLiveOn: false,
      itemIds: [],
      shouldFocusContainer: false,
      isFromKeyboard: false,
      ...config.state,
    },
    actions: {
      UpdatePreActiveIndex: prevActiveIndex => () => ({ prevActiveIndex }),
      UpdateActiveIndex: activeIndex => () => ({ activeIndex }),
      UpdateAriaLiveOn: ariaLiveOn => () => ({ ariaLiveOn }),
      UpdateItemIds: itemIds => () => ({ itemIds }),
      UpdateShouldFocusContainer: shouldFocusContainer => () => ({ shouldFocusContainer }),
      UpdateIsFromKeyboard: isFromKeyboard => () => ({ isFromKeyboard }),
      ...config.actions,
    },
  });
