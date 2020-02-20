import * as React from 'react'
import { Divider, Button, Avatar, Text } from '@fluentui/react'

const DividerVerticalExampleShorthand = () => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '32px', alignItems: 'center' }}>
    <Divider vertical />
    <Text content="Application Title" />
    <Divider vertical />
    <Avatar
      image="public/images/avatar/large/jerry.png"
      status={{
        color: 'green',
        icon: 'stardust-checkmark',
        title: 'Available',
      }}
    />
    <Divider vertical />
    <Button icon="chevron-down" text iconOnly title="Close" />
    <Button icon="icon-circle" text iconOnly title="Full Screen" />
    <Button icon="icon-close" text iconOnly title="Minimize" />
    <Divider vertical />
  </div>
)

export default DividerVerticalExampleShorthand
