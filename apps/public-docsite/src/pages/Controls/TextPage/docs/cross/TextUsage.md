Fluent UI React Native Text has default styling based on the Fluent UI Design Language and typeramp. The font styles and typeramp are designed to look natural by default on each platform. To use predefined sizes that are aligned to the typeramp, you can specify the variant prop to apply font styles to Text. This variant pulls from the Fluent UI React Native theme loaded on the page. For more information on the Fluent UI typeramp, please see our typeramp documentation.

If you need to customize the fontFamily, fontSize, or fontWeight of your Text, you can do this by using the compose pattern. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

### Text example

On Windows, Text uses the Segoe UI font family.
<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Text/Text_quickbrownfox_windows.PNG"/>

On macOS, Text uses the San Francisco font family.
<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Text/Text_quickbrownfox_macos.PNG"/>

### Text ramp example

You can specify the `variant` prop to apply font styles to Text. Examples of `variant` values are shown below.
<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Text/FURN_windows_text_ramp.PNG"/>

#### Example usage (from [TextTest.tsx](https://github.com/microsoft/fluentui-react-native/tree/master/apps/fluent-tester/src/FluentTester/TestComponents/Text))

```
import React from "react";
import { View } from "react-native";
import { Text } from "@fluentui/react-native";

const RedCaptionSemiBold = Text.customize({ tokens: { variant: 'captionStandard', fontWeight: 'semiBold', color: '#ff0000' } });
const ArialBlack = Text.customize({ tokens: { variant: 'heroLargeStandard', fontFamily: 'Arial Black' } });

const App = () => {
  return (
    <View>
      <Text>Normal Text</Text>
      <Text variant="captionStandard">CaptionStandard</Text>
      <Text variant="secondaryStandard">SecondaryStandard</Text>
      <RedCaptionSemiBold>RedCaptionSemiBold</RedCaptionSemiBold>
      <ArialBlack>Arial Black</ArialBlack>
    </View>
  );
};

export default App;

```
