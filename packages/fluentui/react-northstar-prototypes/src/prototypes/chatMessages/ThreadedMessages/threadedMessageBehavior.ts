import {
  chatMessageBehavior,
  Accessibility,
  FocusZoneTabbableElements,
  ChatMessageBehaviorProps,
} from '@fluentui/react-northstar';
import { getCode, keyboardKey } from '@fluentui/accessibility';

const threadedMessageBehavior: Accessibility<ChatMessageBehaviorProps> = () => {
  const behaviorData = chatMessageBehavior();

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    handleTabKey: FocusZoneTabbableElements.none,
    shouldEnterInnerZone: event => getCode(event) === keyboardKey.Enter,
    isCircularNavigation: false,
  };

  behaviorData.keyActions = {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  };

  return behaviorData;
};

export default threadedMessageBehavior;
