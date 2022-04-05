Fluent UI React Native Link has default styling based on the Fluent Design Language. To customize the Link's visuals, you should use the "compose" pattern to customize the tokens. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

- TODO: Add Link image

#### Example usage (from [LinkTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/FluentTester/TestComponents/Link/LinkTest.tsx))

```
import * as React from 'react';
import { Alert } from 'react-native';
import { Link } from '@fluentui/react-native';
import { Stack } from '@fluentui-react-native/stack';
import { stackStyle } from '../Common/styles';

export const LinkTest: React.FunctionComponent<{}> = () => {
  const doPress = (): void => {
    Alert.alert('Alert.', 'You have been alerted.');
  };

  return (
    <Stack style={stackStyle}>
      <Link url="https://www.bing.com/" content="Click to find yourself." />
      <Link onPress={doPress} content="Click to alert yourself." />
    </Stack>
  );
};
```
