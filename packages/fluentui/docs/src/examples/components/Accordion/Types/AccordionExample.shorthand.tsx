import React from 'react';
import { Button, Label, Provider } from '@fluentui/react-northstar';
import { AddIcon, EmailIcon, EmojiIcon, CloseIcon } from '@fluentui/react-icons-northstar';

const theme = `{
  componentVariables: {
    Button: {
      height: '24px',
      minWidth: '24px',
      borderRadius: '8px',
      color: 'darkred',
      secondaryColor: '#ffffff',
      secondaryBorderColor: 'transparent',
      secondaryBackgroundColor: '#6699CC',
      secondaryBackgroundColorHover: '#91A3B0',
    },
  },
  }`;

const provider = () => (
  <Provider theme={theme}>
    <div>
      <Button content="Button" />
      <Button icon={<AddIcon />} iconOnly primary />
      <Button icon={<EmailIcon />} content="Send email" secondary />
      <EmojiIcon size="larger" />
      <Label content="Label with icon" icon={<CloseIcon />} />
    </div>
  </Provider>
);

export default provider;
