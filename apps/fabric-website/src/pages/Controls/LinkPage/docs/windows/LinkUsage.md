Fluent UI React Native Link has default styling based on the Fluent Design Language. To customize the Link's visuals, you should use the "compose" pattern to customize the tokens. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

- TODO: Add Link image

#### Example usage (from [LinkTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/RNTester/TestComponents/Link/LinkTest.tsx))

```jsx
import * as React from 'react';
import { Alert } from 'react-native';
import { Link } from '@fluentui/react-native';
import { View, StyleSheet } from 'react-native';

const App = () => {
  const doPress = (): void => {
    Alert.alert('Alert.', 'You have been alerted.');
  };

  const styles = StyleSheet.create({
    linkTestStyle: {
      borderWidth: 1,
      borderColor: '#bdbdbd',
      paddingVertical: 8,
      paddingHorizontal: 12,
      margin: 8,
    },
  });

  return (
    <View style={styles.linkTestStyle}>
      <Link url="https://www.bing.com/" content="Click to navigate." />
      <Link onPress={doPress} content="Click to alert." />
    </View>
  );
};

export default App;
```
