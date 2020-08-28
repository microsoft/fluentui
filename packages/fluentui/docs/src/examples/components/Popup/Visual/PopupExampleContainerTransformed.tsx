import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExampleContainerTransformed = () => (
  <div
    style={{
      border: '2px solid red',
      margin: 200,
      height: 400,
      width: 400,
      overflow: 'scroll',
      transform: 'translate3d(0,0,0)',
    }}
  >
    <Popup content="This popup is rendered next to the trigger." inline open positionFixed>
      <Button icon={<MoreIcon />} title="Show popup" />
    </Popup>
  </div>
);

export default PopupExampleContainerTransformed;
