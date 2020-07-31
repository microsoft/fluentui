import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { MenuButtonProps } from '../../../../components/MenuButton/MenuButton';
import { popupContentSlotClassNames } from '../../../../components/Popup/PopupContent';

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
