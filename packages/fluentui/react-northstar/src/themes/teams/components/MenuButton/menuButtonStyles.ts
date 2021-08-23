import { popupContentSlotClassNames } from '../../../../components/Popup/PopupContent';
import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { MenuButtonProps } from '../../../../components/MenuButton/MenuButton';

export const menuButtonStyles: ComponentSlotStylesPrepared<MenuButtonProps> = {
  root: () => ({
    boxSizing: 'border-box',
    display: 'inline-block',
  }),
  popupContent: () => ({
    [`& .${popupContentSlotClassNames.content}`]: {
      borderWidth: '0px',
      padding: '0px',
    },
  }),
};
