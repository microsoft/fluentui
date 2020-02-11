import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import { MenuButtonProps } from '../../../../components/MenuButton/MenuButton'
import PopupContent from '../../../../components/Popup/PopupContent'

const menuButtonStyles: ComponentSlotStylesPrepared<MenuButtonProps> = {
  root: () => ({
    boxSizing: 'border-box',
    display: 'inline-block',
  }),
  popupContent: () => ({
    [`& .${PopupContent.slotClassNames.content}`]: {
      padding: '0px',
    },
    borderWidth: '0px',
  }),
}

export default menuButtonStyles
