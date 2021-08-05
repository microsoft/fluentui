import * as React from 'react';
import { Divider, Button, Avatar, Text } from '@fluentui/react-northstar';
import { ChevronDownIcon, CircleIcon, CloseIcon } from '@fluentui/react-icons-northstar';

const DividerVerticalExampleShorthand = () => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '32px', alignItems: 'center' }}>
    <Divider vertical />
    <Text content="Application Title" />
    <Divider vertical />
    <Avatar
      image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
    <Divider vertical />
    <Button icon={<ChevronDownIcon />} text iconOnly title="Close" />
    <Button icon={<CircleIcon />} text iconOnly title="Full Screen" />
    <Button icon={<CloseIcon />} text iconOnly title="Minimize" />
    <Divider vertical />
  </div>
);

export default DividerVerticalExampleShorthand;
