Fluent UI Buttons have default styling based on the Fluent UI Design Language. On macOS, we provide both a native Swift Button as well as a Fluent UI React Native Button. Usage information for the native Swift Button can be found under Swift Implementation.

- TODO: Add Default Button image
- TODO: Add Primary Button image

#### Example usage (from [ButtonFocusTest.tsx](https://github.com/microsoft/fluentui-react-native/blob/master/apps/fluent-tester/src/RNTester/TestComponents/Button/ButtonFocusTest.tsx))

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
