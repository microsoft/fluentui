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
    </Flex>
  );
};

export default PopupClickHandlingExample;
