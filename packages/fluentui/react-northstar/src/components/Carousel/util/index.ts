export const CarouselInitialState = {
  prevActiveIndex: -1,
  ariaLiveOn: false,
  itemIds: [],
  shouldFocusContainer: false,
  isFromKeyboard: false,
};

export enum CarouselActionsType {
  UpdatePreActiveIndex,
  UpdateAriaLiveOn,
  UpdateItemIds,
  UpdateShouldFocusContainer,
  UpdateIsFromKeyboard,
}

export default function CarouselReducer(state = CarouselInitialState, { type, payload }) {
  switch (type) {
    case CarouselActionsType.UpdatePreActiveIndex:
      return { ...state, prevActiveIndex: payload };
    case CarouselActionsType.UpdateAriaLiveOn:
      return { ...state, ariaLiveOn: payload };
    case CarouselActionsType.UpdateItemIds:
      return { ...state, itemIds: payload };
    case CarouselActionsType.UpdateShouldFocusContainer:
      return { ...state, shouldFocusContainer: payload };
    case CarouselActionsType.UpdateIsFromKeyboard:
      return { ...state, isFromKeyboard: payload };
    default:
      throw new Error();
  }
}

export const UpdatePreActiveIndex = payload => ({ type: CarouselActionsType.UpdatePreActiveIndex, payload });
export const UpdateAriaLiveOn = payload => ({ type: CarouselActionsType.UpdateAriaLiveOn, payload });
export const UpdateItemIds = payload => ({ type: CarouselActionsType.UpdateItemIds, payload });
export const UpdateShouldFocusContainer = payload => ({
  type: CarouselActionsType.UpdateShouldFocusContainer,
  payload,
});
export const UpdateIsFromKeyboard = payload => ({ type: CarouselActionsType.UpdateIsFromKeyboard, payload });
