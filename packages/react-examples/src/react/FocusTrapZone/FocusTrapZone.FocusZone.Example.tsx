import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { Toggle, IToggle } from '@fluentui/react/lib/Toggle';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { useBoolean } from '@fluentui/react-hooks';

const stackTokens = { childrenGap: 10 };
const getTrapZoneStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);
const focusZoneStackStyles: Partial<IStackStyles> = {
  root: {
    border: '2px dashed #ababab',
    padding: 10,
  },
};

export const FocusTrapZoneFocusZoneExample: React.FunctionComponent = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  const toggle = React.useRef<IToggle>(null);
  return (
    <FocusTrapZone disabled={!useTrapZone} forceFocusInsideTrap focusPreviouslyFocusedInnerElement>
      <Stack tokens={stackTokens} horizontalAlign="start" styles={getTrapZoneStackStyles(useTrapZone)}>
        <Toggle
          label="Use trap zone"
          componentRef={toggle}
          checked={useTrapZone}
          onChange={toggleUseTrapZone}
          onText="On (toggle to exit)"
          offText="Off"
        />
        <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible>
          <Stack horizontal tokens={stackTokens} styles={focusZoneStackStyles}>
            <DefaultButton text="FZ1" />
            <DefaultButton text="FZ1" />
            <DefaultButton text="FZ1" />
          </Stack>
        </FocusZone>
        <DefaultButton text="No FZ" />
        <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible>
          <Stack horizontal tokens={stackTokens} styles={focusZoneStackStyles}>
            <DefaultButton text="FZ2" />
            <DefaultButton text="FZ2" />
            <DefaultButton text="FZ2" />
          </Stack>
        </FocusZone>
      </Stack>
    </FocusTrapZone>
  );
};
