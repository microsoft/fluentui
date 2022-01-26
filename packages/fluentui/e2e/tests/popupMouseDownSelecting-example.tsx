import * as React from 'react';
import { Popup, Button, buttonClassName, popupContentClassName } from '@fluentui/react-northstar';

export const selectors = {
  popupContent: popupContentClassName,
  button: buttonClassName,
  secondDiv: 'second-div',
};

const PopupWithoutTriggerExample = () => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
      }}
    >
      <Popup
        content={{
          content: 'Test Content',
          styles: { margin: '20px' },
        }}
        trigger={<Button content="Test button" />}
      />
      <div
        id={selectors.secondDiv}
        style={{
          width: 50,
          height: 50,
          margin: 50,
        }}
      />
    </div>
  );
};

export default PopupWithoutTriggerExample;
