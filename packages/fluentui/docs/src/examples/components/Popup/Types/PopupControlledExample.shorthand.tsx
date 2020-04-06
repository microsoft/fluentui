import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Button, Input, Popup, Flex } from '@fluentui/react-northstar';
import { CloseIcon, OpenOutsideIcon, SearchIcon } from '@fluentui/react-icons-northstar';

const PopupControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });

  const popupContent = (
    <Flex column>
      <Flex.Item align="end">
        <Button text iconOnly icon={<CloseIcon />} onClick={() => setOpen(false)} title="Close" />
      </Flex.Item>
      <Input icon={<SearchIcon />} placeholder="Search..." />
    </Flex>
  );

  return (
    <Popup
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon={<OpenOutsideIcon />} title="Open popup" />}
      content={popupContent}
      trapFocus
    />
  );
};

export default PopupControlledExample;
