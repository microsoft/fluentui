import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'

/**
 * @description
 * Implements ARIA Radio Group design pattern.
 * @specification
 *  Adds role='radiogroup'. This allows screen readers to handle the component as a radio group.
 *  Triggers 'nextItem' action with 'ArrowDown' on 'root'.
 *  Triggers 'prevItem' action with 'ArrowUp' on 'root'.
 */
const toolbarRadioGroupBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'radiogroup',
    },
  },

  keyActions: {
    root: {
      nextItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
      prevItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
      },
    },
  },
})

export default toolbarRadioGroupBehavior
