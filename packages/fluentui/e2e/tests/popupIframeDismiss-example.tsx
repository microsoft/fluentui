import * as React from 'react';
import { Popup, popupContentClassName, Button } from '@fluentui/react-northstar';

export const selectors = {
  popupTriggerId: 'trigger',
  popupContentClass: popupContentClassName,
  iframe: 'iframe',
};

const PopupEscHandlingExample = () => (
  <>
    <Popup
      trigger={<Button id={selectors.popupTriggerId} content="Open popup" style={{ margin: 50 }} />}
      content={
        <>
          <div>Hello from inner popup!</div>
        </>
      }
    />
    <iframe className={selectors.iframe} title="iframe" src="https://fluentsite.z22.web.core.windows.net/0.57.0" />
  </>
);

export default PopupEscHandlingExample;
