import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExampleContainerTransformed = () => (
  <div style={{ transform: 'translate3d(0,0,0)', margin: 200, border: '2px solid red' }}>
    <Popup content="This popup is rendered next to the trigger." open positionFixed>
      <Button icon={<MoreIcon />} title="Show popup" />
    </Popup>
  </div>
);

export default PopupExampleContainerTransformed;
