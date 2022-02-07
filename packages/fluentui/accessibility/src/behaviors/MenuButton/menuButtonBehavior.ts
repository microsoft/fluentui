import { keyboardKey } from '../../keyboard-key';
import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { popupBehavior, PopupBehaviorProps } from '../Popup/popupBehavior';

/**
 * @description
 * Implements ARIA [MenuButton](https://www.w3.org/TR/wai-aria-practices/#menubutton) design pattern.
 */
export const menuButtonBehavior: Accessibility<MenuButtonBehaviorProps> = props => {
  const behavior = popupBehavior({ ...props, inline: !props.contextMenu });

  return _.merge(behavior, {
    attributes: {
      trigger: {
        ...(props.open && { 'aria-controls': props.menuId }),
        ...(props.open && !props.contextMenu && { 'aria-expanded': 'true' }),
        ...(!props.contextMenu && { 'aria-haspopup': 'true' }),
        id: props.triggerId,
        ...(!props.contextMenu && props.open && { tabIndex: -1 }),
      },

      menu: {
        'aria-labelledby': props.triggerId,
        id: props.menuId,
      },
    },
    keyActions: {
      root: {
        ...(props.open
          ? {
              closeMenu: {
                keyCombinations: [
                  { keyCode: keyboardKey.Tab, shiftKey: false },
                  { keyCode: keyboardKey.Tab, shiftKey: true },
                ],
              },
            }
          : _.includes(props.on, 'click') && {
              openAndFocusFirst: {
                keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
              },
              openAndFocusLast: {
                keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
              },
            }),
      },
    },
  });
};

export interface MenuButtonBehaviorProps extends PopupBehaviorProps {
  /** Indicates if dialogs's trigger is disabled. */
  disabled?: boolean;
  /** Defines ID of the menu element. */
  menuId?: string;
  /** Defines ID of the trigger element. */
  triggerId?: string;
  /** Defines whether popup is displayed. */
  open?: boolean;
  /** Determines if the MenuButton behaves as context menu */
  contextMenu?: boolean;
}
