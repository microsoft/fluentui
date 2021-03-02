import * as React from 'react';
import { Label } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const LabelExampleRtl = () => (
  <Label
    content="جين دو"
    circular
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
      avatar: true,
    }}
    icon={<CloseIcon />}
  />
);

export default LabelExampleRtl;
