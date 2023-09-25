Fluent UI React Native Buttons have default styling based on the Fluent UI Design Language. To customize the button's visuals, you should use the "compose" pattern to customize the tokens. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

### Button example

#### Default Button (Windows)

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/fabric-website/images/controls/cross/Button/Default_button_windows.PNG"/>

#### Primary Button (Windows)

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/fabric-website/images/controls/cross/Button/Primary_button_windows.PNG"/>

#### Default Button (macOS)

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/fabric-website/images/controls/cross/Button/Default_button_macos.png"/>

#### Primary Button (macOS)

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/fabric-website/images/controls/cross/Button/Primary_button_macos.png"/>

#### Example usage (from [ButtonFocusTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/FluentTester/TestComponents/Button/ButtonFocusTest.tsx))

```
import * as React from 'react';
import { Button, IFocusable } from '@fluentui/react-native';
import { View } from 'react-native';

const App = () => {
  const [state, setState] = React.useState({
    focused: false
  });
  const buttonRef = React.useRef<IFocusable>(null);

  const onFocus = React.useCallback(() => {
    setState({ focused: !state.focused });
    if (buttonRef.current && !state.focused) {
      buttonRef.current.focus();
    }
  }, [state, setState]);

  return (
    <View>
      <Button
        content={state.focused ? "Focused" : "Not Focused"}
        componentRef={buttonRef}
      />
      <Button content="Click to focus" onClick={onFocus} />
    </View>
  );
};

export default App;

```
