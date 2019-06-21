import { IContextualMenuStyleProps, IContextualMenuStyles } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MinimumScreenSelector } from './styleConstants';

export const ContextualMenuStyles = (props: IContextualMenuStyleProps): Partial<IContextualMenuStyles> => {
  const { theme } = props;
  const { effects } = theme;

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

  return {
    subComponentStyles: {
      callout: {
        root: {
          border: 'none',
          borderRadius: effects.roundedCorner2,
          boxShadow: effects.elevation8,
          selectors: {
            ['.ms-Callout-main']: { borderRadius: effects.roundedCorner2 }
          }
        },
        beakCurtain: { borderRadius: effects.roundedCorner2 }
      },
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
};
