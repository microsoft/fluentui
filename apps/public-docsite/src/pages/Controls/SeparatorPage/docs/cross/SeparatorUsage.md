### Link example

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Separator/Separator_windows.PNG"/>

#### Example usage (from [SeparatorTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/FluentTester/TestComponents/Separator/SeparatorTest.tsx))

```

import * as React from 'react';
import { Button, Separator, Text } from '@fluentui/react-native';
import { View, StyleSheet } from 'react-native';

const BlueSeparator = Separator.customize({ tokens: { color: 'blue' } });
const RedSeparator = Separator.customize({ tokens: { color: 'red' } });

const App = () => {
  return (
    <View style={styles.stackStyle} gap={5}>
      <View gap={4} style={styles.separatorStackStyle}>
        <Button content="Button4" />
        <BlueSeparator vertical />
        <Button content="Button5" />
        <RedSeparator vertical />
        <Button content="Button6" />
        <Separator />
      </View>
      <Text>This is a text element</Text>
      <Separator />
      <Button content="This button has longer text" />
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
  separatorStackStyle: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default App;
```
