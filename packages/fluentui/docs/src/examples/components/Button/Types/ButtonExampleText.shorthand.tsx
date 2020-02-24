import * as React from 'react';
import { Button } from '@fluentui/react';

const ButtonExampleTextShorthand = () => (
  <div>
    <Button text content="A text button" />
    <br />
    <br />
    <Button icon="call-video" text content="A text button with an icon" />
    <br />
    <br />
    <Button icon="team-create" text iconOnly title="Create" />
    <br />
    <br />
    <Button icon="call-video" text disabled content="A disabled text button with an icon" />
    <br />
    <br />
    <Button icon="call-video" text primary content="A primary text button with an icon" />
  </div>
);

export default ButtonExampleTextShorthand;
