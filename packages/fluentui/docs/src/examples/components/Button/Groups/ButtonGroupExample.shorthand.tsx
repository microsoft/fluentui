import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { MicIcon, CallVideoIcon, PlayIcon } from '@fluentui/react-icons-northstar';

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      {
        icon: <MicIcon />,
        key: 'mic',
        iconOnly: true,
        title: 'Microphone',
      },
      {
        icon: <CallVideoIcon />,
        key: 'video',
        iconOnly: true,
        title: 'video call',
      },
      {
        icon: <PlayIcon />,
        key: 'play',
        iconOnly: true,
        title: 'Play',
      },
    ]}
  />
);

export default ButtonGroupExampleShorthand;
