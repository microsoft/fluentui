Fluent UI React Native Text has default styling based on the Fluent UI Design Language and typeramp. The font styles and typeramp are designed to look natural by default on each platform. To use predeined sizes that are aligned to the typeramp, you can specify the fontVariant prop to apply font styles to Text. This fontVariant pulls from the Fluent UI React Native theme loaded on the page. For more information on the Fluent UI typeramp, please see our typeramp documentation.

If you need to customize the fontFamily, fontSize, or fontWeight of your Text, you can do this by using the compose pattern. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

#### Example usage (from [TextTest.tsx](https://github.com/microsoft/fluentui-react-native/tree/master/apps/fluent-tester/src/RNTester/TestComponents/Text))

```
import * as React from 'react';
import { View } from 'react-native';
import { Separator } from '@fluentui-react-native/separator';
import { StandardUsage } from './StandardUsage';
import { CustomizeUsage } from './CustomizeUsage';
import { styles } from './styles';
import { Text } from '@fluentui-react-native/text';

const RedCaptionBold = Text.customize({ tokens: { variant: 'captionStandard', fontWeight: 'semiBold', color: '#ff0000' } });
const ArialBlack = Text.customize({ tokens: { variant: 'heroLargeStandard', fontFamily: 'Arial Black' } });

export const TextTest: React.FunctionComponent<{}> = () => {
  return (
    <View>
      <Text>Normal Text</Text>
      <Text variant="captionStandard">CaptionStandard</Text>
      <Text variant="secondaryStandard">SecondaryStandard</Text>
      <RedCaptionBold>RedCaptionBold</RedCaptionBold>
      <ArialBlack>Arial Black</ArialBlack>
    </View>
  );
};

```
