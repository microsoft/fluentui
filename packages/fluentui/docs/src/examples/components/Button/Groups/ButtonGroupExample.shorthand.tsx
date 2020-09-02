import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { EmojiIcon, TranslationIcon, PlayIcon } from '@fluentui/react-icons-northstar';

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      {
        icon: <EmojiIcon />,
        key: 'emoji',
        iconOnly: true,
        title: 'Emoji',
      },
      {
        icon: <TranslationIcon />,
        key: 'translation',
        iconOnly: true,
        title: 'Translation',
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
