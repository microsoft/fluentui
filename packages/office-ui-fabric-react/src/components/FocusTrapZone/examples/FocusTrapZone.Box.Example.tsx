import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export interface IFocusTrapZoneBoxExampleState {
  useTrapZone: boolean;
}

export class FocusTrapZoneBoxExample extends React.Component<{}, IFocusTrapZoneBoxExampleState> {
  public state: IFocusTrapZoneBoxExampleState = {
    useTrapZone: false
  };

  private _toggle = React.createRef<IToggle>();

  public render() {
    const { useTrapZone } = this.state;

    return (
      <div>
        <DefaultButton secondaryText="Focuses inside the FocusTrapZone" onClick={this._onButtonClickHandler} text="Sample Initiator" />
        <FocusTrapZone disabled={!useTrapZone}>
          <Stack
            horizontalAlign="start"
            tokens={{ childrenGap: 15 }}
            styles={{
              root: { border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 }
            }}
          >
            <Toggle
              label="Use trap zone"
              componentRef={this._toggle}
              checked={useTrapZone}
              onChange={this._onFocusTrapZoneToggleChanged}
              onText="On (toggle to exit)"
              offText="Off"
            />
            <TextField label="Input inside trap zone" styles={{ root: { width: 300 } }} />
            <Link href="https://bing.com">Hyperlink inside trap zone</Link>
          </Stack>
        </FocusTrapZone>
      </div>
    );
  }

  private _onButtonClickHandler = (): void => {
    this.setState({
      useTrapZone: true
    });
  };

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ useTrapZone: !!checked });
  };
}
