import React from 'react';
import { Button, Popup, popupContentClassName } from '@fluentui/react-northstar';

export const selectors = {
  triggerButtonId: 'trigger',
  popupContentClass: popupContentClassName,
  popupContentButtonId: 'content-button',
};

const PopupClickHandlingExample = () => {
  const [show, setShow] = React.useState(true);
  return (
    <Popup
      trigger={
        <Button id={selectors.triggerButtonId} content="Open Popup" icon="expand" onClick={() => setShow(true)} />
      }
      content={
        !!show && (
          <Button
            id={selectors.popupContentButtonId}
            content="click me"
            onClick={e => {
              e.preventDefault();
              setShow(!show);
            }}
          />
        )
      }
    />
  );
};

export default PopupClickHandlingExample;
