import * as React from 'react';
import { SplitButton, Text, Flex } from '@fluentui/react-northstar';

const SplitButtonExampleFlat = () => (
  <>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <SplitButton
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Elevated',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <SplitButton
        primary
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Elevated',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <Text content="By default, buttons are elevated" />
    </Flex>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <SplitButton
        flat
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Flat',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <SplitButton
        primary
        flat
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Flat',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <Text content="Add prop `flat` to get a button without shadow" />
    </Flex>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <SplitButton
        disabled
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Disabled',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <SplitButton
        primary
        disabled
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Disabled',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <Text content="Disabled buttons are never elevated" />
    </Flex>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <SplitButton
        size="small"
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Small',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <SplitButton
        primary
        size="small"
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'Small',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message',
        }}
        toggleButton={{ 'aria-label': 'more options' }}
      />
      <Text content="Small buttons are never elevated" />
    </Flex>
  </>
);

export default SplitButtonExampleFlat;
