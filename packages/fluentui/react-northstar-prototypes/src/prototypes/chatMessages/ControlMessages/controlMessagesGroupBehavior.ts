import { chatBehavior, Accessibility, ChatBehaviorProps } from '@fluentui/react-northstar';

const controlMessagesGroupBehavior: Accessibility<ChatBehaviorProps> = () => {
  const behaviorData = chatBehavior();

  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'data-is-focusable': true,
  };

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    shouldFocusOnMount: true,
    shouldFocusInnerElementWhenReceivedFocus: true,
    defaultTabbableElement: undefined,
  };
  return behaviorData;
};

export default controlMessagesGroupBehavior;
