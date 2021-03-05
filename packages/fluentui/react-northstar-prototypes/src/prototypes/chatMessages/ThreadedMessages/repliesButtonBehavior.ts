import { Accessibility } from '@fluentui/react-northstar';
import { keyboardKey, SpacebarKey } from '@fluentui/accessibility';

const repliesButtonBehavior: Accessibility = () => ({
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
});
export default repliesButtonBehavior;
