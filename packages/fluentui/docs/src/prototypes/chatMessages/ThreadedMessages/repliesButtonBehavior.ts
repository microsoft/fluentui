import { Accessibility } from '@fluentui/react-northstar';
import { keyboardKey } from '@fluentui/keyboard-key';

const repliesButtonBehavior: Accessibility = () => ({
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey[' '] }],
      },
    },
  },
});
export default repliesButtonBehavior;
