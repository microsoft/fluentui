import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

export interface IFocusTrapZoneFocusZoneExampleState {
  useTrapZone: boolean;
}

export class FocusTrapZoneFocusZoneExample extends React.Component<{}, IFocusTrapZoneFocusZoneExampleState> {
  public state: IFocusTrapZoneFocusZoneExampleState = {
    useTrapZone: false
  };

  private _toggle = React.createRef<IToggle>();

  public render() {
    const { useTrapZone } = this.state;
    const padding = 10;
    const border = '2px dashed #ababab';
    const rootBorder = `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`;
    const tokens: IStackTokens = { childrenGap: 10 };

    return (
      <FocusTrapZone disabled={!useTrapZone} forceFocusInsideTrap={true} focusPreviouslyFocusedInnerElement={true}>
        <Stack tokens={tokens} horizontalAlign="start" styles={{ root: { border: rootBorder, padding } }}>
          <Toggle
            label="Use trap zone"
            componentRef={this._toggle}
            checked={useTrapZone}
            onChange={this._onFocusTrapZoneToggleChanged}
            onText="On (toggle to exit)"
            offText="Off"
          />

          <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
            <Stack horizontal tokens={tokens} styles={{ root: { border, padding } }}>
              <DefaultButton text="FZ1" />
              <DefaultButton text="FZ1" />
              <DefaultButton text="FZ1" />
            </Stack>
          </FocusZone>

          <DefaultButton text="No FZ" />

          <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
            <Stack horizontal tokens={tokens} styles={{ root: { border, padding } }}>
              <DefaultButton text="FZ2" />
              <DefaultButton text="FZ2" />
              <DefaultButton text="FZ2" />
            </Stack>
          </FocusZone>
        </Stack>
      </FocusTrapZone>
    );
  }

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ useTrapZone: !!checked }, () => {
      // Restore focus to toggle after re-rendering
      this._toggle.current!.focus();
    });
  };
}
