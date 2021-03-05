import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';

export const selectors = {
  popupContentId: 'popup-content-id',
  popupTriggerId: 'popup-trigger-id',
  popupCloseId: 'popup-close',
};

const PopupInPopupExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popup
      on="hover"
      open={open}
      onOpenChange={(e, { open }) => {
        setOpen(open);
      }}
      content={
        <div>
          <p id={selectors.popupContentId}>CLick Here</p>
          <Button
            id={selectors.popupCloseId}
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      }
      trigger={
        <Button
          id={selectors.popupTriggerId}
          content="Open a popup"
          onClick={() => {
            setOpen(true);
          }}
        />
      }
    />
  );
};

export default PopupInPopupExample;
