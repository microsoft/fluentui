import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';

interface ParticipantsMenuWrapperProps {
  children: React.ReactNode;
}

export const ParticipantsMenuWrapper: React.FC<ParticipantsMenuWrapperProps> = ({ children }) => {
  return (
    <Menu positioning={{ autoSize: true }}>
      <MenuTrigger>
        <Button>Add people, agents, and bots</Button>
      </MenuTrigger>
      <MenuPopover>{children}</MenuPopover>
    </Menu>
  );
};
