Fluent UI React Native Buttons have default styling based on the Fluent UI Design Language. To customize the button's visuals, you should use the "compose" pattern to customize the tokens. For more information on the compose pattern, please see our [compose documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/foundation-compose/README.md).

#### Example usage (from [ButtonFocusTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/FluentTester/TestComponents/Button/ButtonFocusTest.tsx))

```
import * as React from 'react';
import { Button, IFocusable } from '@fluentui/react-native';
import { Stack } from '@fluentui-react-native/stack';

export const ButtonFocusTest: React.FunctionComponent<{}> = () => {
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
    <Stack>
      <Button content={state.focused ? 'Focused' : 'Not Focused'} componentRef={buttonRef} />
      <Button content="Click to focus" onClick={onFocus} />
    </Stack>
  );
};
```
