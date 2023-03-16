import * as React from 'react';
import { Popup, Button } from '@fluentui/react-northstar';

import { selectors } from './popupIframeDismiss-selectors';

const iframeContent = `<div id="iframecontent">
  <p>Hello World!</p>
</div>`;

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
    <iframe className={selectors.iframe} title="iframe" srcDoc={iframeContent} />
  </>
);

export default PopupEscHandlingExample;
