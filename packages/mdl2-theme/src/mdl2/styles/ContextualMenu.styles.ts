import { MinimumScreenSelector } from './styleConstants';

const CONTEXTUAL_MENU_ITEM_HEIGHT = 32;

const iconStyles = {
  maxHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
  fontSize: 14,
  width: 14,
  selectors: {
    [MinimumScreenSelector]: {
      fontSize: 18,
      width: 18
    }
  }
};

export const ContextualMenuStyles = {
  subComponentStyles: {
    menuItem: {
      root: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
      },
      splitPrimary: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
      },
      splitMenu: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        width: CONTEXTUAL_MENU_ITEM_HEIGHT // to match the numbers from the default styles
      },
      icon: { ...iconStyles },
      checkmarkIcon: { ...iconStyles },
      splitContainer: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT
      },
      subMenuIcon: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
      }
    }
  }
};
