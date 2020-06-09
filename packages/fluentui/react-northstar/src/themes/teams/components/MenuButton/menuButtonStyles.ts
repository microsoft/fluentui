import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { MenuButtonProps } from '../../../../components/MenuButton/MenuButton';
import { popupContentSlotClassNames } from '../../../../components/Popup/PopupContent';

const menuButtonStyles: ComponentSlotStylesPrepared<MenuButtonProps> = {
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

export default menuButtonStyles;
