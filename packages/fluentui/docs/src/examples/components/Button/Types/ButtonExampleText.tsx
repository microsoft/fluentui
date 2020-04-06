import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleText = () => (
  <div>
    <Button text>
      <Button.Content content="A text button" />
    </Button>
    <br />
    <br />
    <Button text>
      <CallVideoIcon />
      <Button.Content content="A text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text iconOnly title="Video Call">
      <CallVideoIcon />
    </Button>
    <br />
    <br />
    <Button text disabled>
      <CallVideoIcon />
      <Button.Content content="A disabled text button with an icon" />
    </Button>
    <br />
    <br />
    <Button text primary>
      <CallVideoIcon />
      <Button.Content content="A primary text button with an icon" />
    </Button>
  </div>
);

export default ButtonExampleText;
