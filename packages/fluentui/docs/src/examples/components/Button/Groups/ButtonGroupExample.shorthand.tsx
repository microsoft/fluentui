import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      { key: 'emoji', icon: 'emoji', iconOnly: true, title: 'Emoji' },
      { key: 'translation', icon: 'translation', iconOnly: true, title: 'Translation' },
      { key: 'play', icon: 'play', iconOnly: true, title: 'Play' }
    ]}
  />
);

export default ButtonGroupExampleShorthand;
