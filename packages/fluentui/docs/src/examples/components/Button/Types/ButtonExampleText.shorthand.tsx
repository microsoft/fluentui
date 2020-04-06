import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { CallVideoIcon, TeamCreateIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleTextShorthand = () => (
  <div>
    <Button text content="A text button" />
    <br />
    <br />
    <Button icon={<CallVideoIcon />} text content="A text button with an icon" />
    <br />
    <br />
    <Button icon={<TeamCreateIcon />} text iconOnly title="Create" />
    <br />
    <br />
    <Button icon={<CallVideoIcon />} text disabled content="A disabled text button with an icon" />
    <br />
    <br />
    <Button icon={<CallVideoIcon />} text primary content="A primary text button with an icon" />
  </div>
);

export default ButtonExampleTextShorthand;
