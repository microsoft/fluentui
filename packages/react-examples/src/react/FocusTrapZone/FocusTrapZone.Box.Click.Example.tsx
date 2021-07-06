import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Link } from '@fluentui/react/lib/Link';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Toggle, IToggle } from '@fluentui/react/lib/Toggle';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { useBoolean } from '@fluentui/react-hooks';

const getStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px dashed ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);
const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const FocusTrapZoneBoxClickExample: React.FunctionComponent = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  const toggle = React.useRef<IToggle>(null);
  return (
    <FocusTrapZone disabled={!useTrapZone} isClickableOutsideFocusTrap forceFocusInsideTrap={false}>
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
        <Link href="https://bing.com" target="_blank">
          Hyperlink inside trap zone
        </Link>
      </Stack>
    </FocusTrapZone>
  );
};
