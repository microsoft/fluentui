import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Button, MenuButton } from '@fluentui/react-northstar';
import { Expand } from '@fluentui/react-icons-northstar';

const MenuButtonOpenExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });

  return (
    <MenuButton
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon={<Expand />} title="Open MenuButton" />}
      menu={['1', '2', '3', { content: 'submenu', menu: ['4', '5'] }]}
    />
  );
};

export default MenuButtonOpenExample;
