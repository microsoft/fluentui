import * as React from 'react';
import { Button, Popup } from '@fluentui/react';

const PopupExampleInline = () => (
  <Popup content="This popup is rendered next to the trigger." inline>
    <Button icon="more" title="Show popup" />
  </Popup>
);

export default PopupExampleInline;
