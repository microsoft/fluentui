import * as React from 'react';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px dashed ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);

const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };

const toggle = React.createRef<IToggle>();

export const FocusTrapZoneBoxClickExample: React.FunctionComponent = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  return (
    <FocusTrapZone disabled={!useTrapZone} isClickableOutsideFocusTrap forceFocusInsideTrap={false}>
      <Stack horizontalAlign="start" tokens={{ childrenGap: 15 }} styles={getStackStyles(useTrapZone)}>
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
