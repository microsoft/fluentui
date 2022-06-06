import React from 'react';
import { Button, Popup, Flex } from '@fluentui/react-northstar';

export const selectors = {
  simplePopup: {
    triggerId: 'trigger',
    contentId: 'content',
  },
  contextPopup: {
    triggerId: 'trigger-context',
    contentId: 'content-context',
  },
  dismissScrollPopup: {
    triggerId: 'trigger-dismiss',
    contentId: 'content-dismiss',
  },
  nestedPopup: {
    parentPopupTriggerId: 'nested-parent-trigger',
    childPopupTriggerId: 'nested-child-trigger',
    childPopupContentId: 'nested-child-content',
  },
};

const PopupClickHandlingExample = () => {
  return (
    <Flex column>
      simple popup
      <Popup
        trigger={<Button id={selectors.simplePopup.triggerId} content="Open Popup" />}
        content={{
          content: 'Open a popup',
          id: selectors.simplePopup.contentId,
        }}
      />
      popup open on context
      <Popup
        trigger={<Button id={selectors.contextPopup.triggerId} content="Open Popup" />}
        content={{
          content: 'Open a popup',
          id: selectors.contextPopup.contentId,
        }}
        on="context"
      />
      popup with closeOnScroll
      <Popup
        trigger={<Button id={selectors.dismissScrollPopup.triggerId} content="Open Popup" />}
        content={{
          content: 'Open a popup',
          id: selectors.dismissScrollPopup.contentId,
        }}
        closeOnScroll
      />
      nested popup
      <Popup
        trigger={<Button id={selectors.nestedPopup.parentPopupTriggerId} content="Open Popup 1" />}
        content={
          <Popup
            trigger={<Button id={selectors.nestedPopup.childPopupTriggerId} content="Open Popup 2" />}
            content={{
              content: 'content',
              id: selectors.nestedPopup.childPopupContentId,
            }}
          />
        }
        on="context"
      />
    </Flex>
  );
};

export default PopupClickHandlingExample;
