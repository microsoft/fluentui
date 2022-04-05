import * as React from 'react';
import { Popup, Button, buttonClassName, popupContentClassName } from '@fluentui/react-northstar';

export const selectors = {
  popupContent: popupContentClassName,
  button: buttonClassName,
};

const PopupWithoutTriggerExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Popup
        open={open}
        content={{
          content: 'Test Content',
          styles: { margin: '40px' }, // puppeteer performs a click on 0x0 in boxes, so button and popup content should not collide
        }}
        onOpenChange={(e, data) => {
          e.stopPropagation();
          setOpen(data.open);
        }}
      />
      <Button content="Test button" onClick={() => setOpen(!open)} />
    </>
  );
};

export default PopupWithoutTriggerExample;
