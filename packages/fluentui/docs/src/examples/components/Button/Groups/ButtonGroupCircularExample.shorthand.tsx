import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { MicIcon, CallVideoIcon, PlayIcon } from '@fluentui/react-icons-northstar';

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      {
        icon: <MicIcon />,
        key: 'mic',
        primary: true,
        title: 'Microphone',
      },
      {
        icon: <CallVideoIcon />,
        key: 'video',
        title: 'Video Call',
      },
      {
        icon: <PlayIcon />,
        key: 'play',
        primary: true,
        title: 'Play',
      },
    ]}
  />
);

export default ButtonGroupCircularExampleShorthand;
