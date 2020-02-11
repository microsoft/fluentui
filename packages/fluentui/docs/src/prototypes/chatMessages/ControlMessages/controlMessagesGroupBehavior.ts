import { chatBehavior, Accessibility } from '@fluentui/react'

const controlMessagesGroupBehavior: Accessibility<any> = props => {
  const behaviorData = chatBehavior(props)

  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'data-is-focusable': true,
  }

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    shouldFocusOnMount: true,
    shouldFocusInnerElementWhenReceivedFocus: true,
    defaultTabbableElement: undefined,
  }
  return behaviorData
}

export default controlMessagesGroupBehavior
