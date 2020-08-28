import * as React from 'react';
import { DefaultButton } from '@fluentui/react-next/lib/compat/Button';
import { FocusTrapZone } from '@fluentui/react-next/lib/FocusTrapZone';
import { Stack, IStackStyles } from '@fluentui/react-next/lib/Stack';
import { Toggle, IToggleStyles } from '@fluentui/react-next/lib/Toggle';
import { memoizeFunction } from '@fluentui/react-next/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(
  (isActive: boolean): Partial<IStackStyles> => ({
    root: { border: `2px solid ${isActive ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);

const stackTokens = { childrenGap: 10 };
const fixedWidthToggleStyles: Partial<IToggleStyles> = { root: { width: 200 } };
const FocusTrapComponent: React.FunctionComponent<React.PropsWithChildren<{ zoneNumber: number }>> = props => {
  const [isActive, { toggle: toggleIsActive }] = useBoolean(false);
  const { zoneNumber, children } = props;
  const onStringButtonClicked = (): void => {
    alert(`Button ${zoneNumber} clicked`);
  };

  return (
    <FocusTrapZone disabled={!isActive} forceFocusInsideTrap={false}>
      <Stack horizontalAlign="start" tokens={stackTokens} styles={getStackStyles(isActive)}>
        <Toggle
          checked={isActive}
          onChange={toggleIsActive}
          label={'Enable trap zone ' + zoneNumber}
          onText="On (toggle to exit)"
          offText="Off"
          // Set a width on these toggles in the horizontal zone to prevent jumping when enabled
          styles={zoneNumber >= 2 && zoneNumber <= 4 ? fixedWidthToggleStyles : undefined}
        />
        <DefaultButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onStringButtonClicked}
          text={`Zone ${zoneNumber} button`}
        />
        {children}
      </Stack>
    </FocusTrapZone>
  );
};

export const FocusTrapZoneNestedExample = () => (
  <div>
    <FocusTrapComponent zoneNumber={1}>
      <FocusTrapComponent zoneNumber={2}>
        <FocusTrapComponent zoneNumber={3} />
        <FocusTrapComponent zoneNumber={4} />
      </FocusTrapComponent>
      <FocusTrapComponent zoneNumber={5} />
    </FocusTrapComponent>
  </div>
);
