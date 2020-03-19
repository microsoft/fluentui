import * as React from 'react';
import { Button, Icon } from '@fluentui/react-northstar';

const ButtonExampleText = () => (
  <div>
    <Button text>
      <Button.Content content="A text button" />
    </Button>
    <br />
    <br />
    <Button text>
      <Icon name="call-video" />
      <Button.Content content="A text button with an icon" />
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
      <Button.Content content="A disabled text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text primary>
      <Icon name="call-video" />
      <Button.Content content="A primary text button with an icon" />
    </Button>
  </div>
);

export default ButtonExampleText;
