import * as React from 'react';
import { Button, Flex, Input, Header, Popup } from '@fluentui/react';

const PopupFocusTrapExample = () => (
  <Flex gap="gap.smaller">
    <Popup
      /** Provided prop introduces focus trap to popup content. */
      trapFocus
      trigger={<Button icon="more" content="Trap focus on appearence" />}
      content={
        <>
          <Header as="h4">This content traps focus on appearance.</Header>
          <Input icon="search" placeholder="Search..." />
        </>
      }
    />

    {/* Default Popup behavior doesn't introduce focus trap. */}
    <Popup
      trigger={<Button icon="more" content="Do not trap focus" />}
      content={
        <>
          <Header as="h4">Focus is not trapped for this content.</Header>
          <Input icon="search" placeholder="Search..." />
        </>
      }
    />
  </Flex>
);

export default PopupFocusTrapExample;
