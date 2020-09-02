import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);
const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };
const stackTokens = { childrenGap: 8 };
const focusClassName = 'shouldFocusInput';

export const FocusTrapZoneBoxCustomElementExample = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  const toggle = React.useRef<IToggle>(null);
  return (
    <Stack tokens={stackTokens}>
      <Stack.Item>
        <Text>If this button is used to enable FocusTrapZone, the hyperlink should be focused.</Text>
      </Stack.Item>
      <Stack.Item>
        <DefaultButton onClick={toggleUseTrapZone} text="Focus Custom Element" />
      </Stack.Item>
      <FocusTrapZone disabled={!useTrapZone} firstFocusableSelector={focusClassName}>
        <Stack horizontalAlign="start" tokens={stackTokens} styles={getStackStyles(useTrapZone)}>
          <Toggle
            label="Use trap zone"
            componentRef={toggle}
            checked={useTrapZone}
            onChange={toggleUseTrapZone}
            onText="On (toggle to exit)"
            offText="Off"
          />
          <TextField label="Input inside trap zone" styles={textFieldStyles} />
          <Link href="https://bing.com" className={focusClassName} target="_blank">
            Hyperlink which will receive initial focus when trap zone is activated
          </Link>
        </Stack>
      </FocusTrapZone>
    </Stack>
  );
};
