import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { EmojiIcon, TranslationIcon, PlayIcon } from '@fluentui/react-icons-northstar';

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      {
        icon: <EmojiIcon />,
        key: 'emoji',
        primary: true,
        title: 'Emoji',
      },
      {
        icon: <TranslationIcon />,
        key: 'translation',
        title: 'Translation',
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
