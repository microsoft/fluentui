import React from 'react';
import { Button, Popup, popupContentClassName } from '@fluentui/react-northstar';

export const selectors = {
  triggerButtonId: 'trigger',
  popupContentClass: popupContentClassName,
  popupContentButtonId: 'content-button',
  popupContentContainerId: 'popup-content-container',
  outsideDivID: 'outside',
};

const PopupClickHandlingExample = () => {
  const [show, setShow] = React.useState(true);
  return (
    <Popup
      on="hover"
      trigger={
        <Button id={selectors.triggerButtonId} content="Open Popup" icon="expand" onClick={() => setShow(true)} />
      }
      content={
        !!show && (
          <div id={selectors.popupContentContainerId}>
            <Button
              id={selectors.popupContentButtonId}
              content="click me"
              onClick={e => {
                e.preventDefault();
                setShow(isOpen => !isOpen);
              }}
            />
          </div>
        )
      }
    />
  );
};

export default PopupClickHandlingExample;
