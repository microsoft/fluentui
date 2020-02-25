import * as React from 'react';
import { Button, Text, Icon } from '@fluentui/react';

const ButtonExampleText = () => (
  <div>
    <Button text>
      <Text content="A text button" />
    </Button>
    <br />
    <br />
    <Button text>
      <Icon name="call-video" />
      <Text content="A text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text iconOnly title="Video Call">
      <Icon name="call-video" />
    </Button>
    <br />
    <br />
    <Button text disabled>
      <Icon name="call-video" />
      <Text content="A disabled text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text primary>
      <Icon name="call-video" />
      <Text content="A primary text button with an icon" />
    </Button>
  </div>
);

export default ButtonExampleText;
