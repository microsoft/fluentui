import { Button, Popup } from '@fluentui/react-northstar';
import * as React from 'react';

const PopupExamplePointerOffset = () => (
  <div style={{ marginLeft: 50, marginTop: 75 }}>
    <Popup
      align="center"
      position="above"
      offset="20px"
      pointing
      trigger={<Button>Click</Button>}
      content={
        <p>
          The popup is rendered at above-start
          <br />
          corner of the trigger.
        </p>
      }
    />
  </div>
);

export default PopupExamplePointerOffset;
