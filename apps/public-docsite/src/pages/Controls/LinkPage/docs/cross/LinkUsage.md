Fluent UI React Native Link has default styling based on the Fluent Design Language. To customize the Link's visuals, you should use the "compose" pattern to customize the tokens. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

### Link example

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Link/Link_windows.PNG"/>

#### Example usage (from [LinkTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/FluentTester/TestComponents/Link/LinkTest.tsx))

```
import * as React from 'react';
import { Alert } from 'react-native';
import { Link } from '@fluentui/react-native';
import { View, StyleSheet } from 'react-native';

const App = () => {
  const doPress = (): void => {
    Alert.alert('Alert.', 'You have been alerted.');
  };

  return (
    <View style={styles.stackStyle}>
      <Link url="https://www.bing.com/" content="Click to navigate." />
      <Link onPress={doPress} content="Click to alert." />
    </View>
  );
};

const styles = StyleSheet.create({
  stackStyle: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 8
  },
});

export default App;

```
