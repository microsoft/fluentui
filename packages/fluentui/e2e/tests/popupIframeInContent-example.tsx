import * as React from 'react';
import { Popup, popupContentClassName, Button } from '@fluentui/react-northstar';

export const selectors = {
  popupTriggerId: 'trigger',
  popupContentClass: popupContentClassName,
  iframe: 'iframe',
};

const iframeContent = `<div id="iframecontent">
  <p>Hello World!</p>
</div>`;

const PopupIframeInContentExample = () => (
  <>
    <Popup
      trigger={<Button id={selectors.popupTriggerId} content="Open popup" style={{ margin: 50 }} />}
      content={
        <>
          <iframe className={selectors.iframe} title="iframe" srcDoc={iframeContent} />
        </>
      }
    />
  </>
);

export default PopupIframeInContentExample;
