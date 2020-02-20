import * as React from 'react'
import { Button, MenuButton } from '@fluentui/react'

const MenuButtonExampleRtl = () => (
  <MenuButton
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    menu={['English text!', 'غالباً ونرفض الشعور']}
  />
)

export default MenuButtonExampleRtl
