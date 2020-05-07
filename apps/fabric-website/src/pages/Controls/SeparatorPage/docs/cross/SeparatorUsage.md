#### Example usage (from [SeparatorTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/RNTester/TestComponents/Separator/SeparatorTest.tsx))

```

import * as React from 'react';
import { Button, Separator, Text } from '@fluentui/react-native';
import { stackStyle, separatorStackStyle } from '../Common/styles';
import { Stack } from '@fluentui-react-native/stack';

const BlueSeparator = Separator.customize({ tokens: { color: 'blue' } });
const RedSeparator = Separator.customize({ tokens: { color: 'red' } });

export const SeparatorTest: React.FunctionComponent<{}> = () => {
  return (
    <Stack style={stackStyle} gap={5}>
      <Stack gap={4} style={separatorStackStyle}>
        <Button content="Button4" />
        <BlueSeparator vertical />
        <Button content="Button5" />
        <RedSeparator vertical />
        <Button content="Button6" />
        <Separator />
      </Stack>
      <Text>This is a text element</Text>
      <Separator />
      <Button content="This button has longer text" />
    </Stack>
  );
};

```
