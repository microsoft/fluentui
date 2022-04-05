import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';

export const selectors = {
  popupContentId: 'popup-content-id',
  popupTriggerId: 'popup-trigger-id',
  popupContentNestedId: 'popup-content-nested-id',
  popupTriggerNestedId: 'popup-trigger-nested-id',
};

const PopupInPopupExample = () => (
  <Popup
    content={
      <>
        <div id={selectors.popupContentId}>content</div>
        <Popup
          content={<div id={selectors.popupContentNestedId}>nested content</div>}
          trigger={<Button id={selectors.popupTriggerNestedId} content="Open a nested popup" />}
        />
      </>
    }
    trigger={<Button id={selectors.popupTriggerId} content="Open a popup" />}
  />
);

export default PopupInPopupExample;
