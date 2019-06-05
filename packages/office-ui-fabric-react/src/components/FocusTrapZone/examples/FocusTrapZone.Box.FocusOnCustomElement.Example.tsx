import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IFocusTrapZoneBoxCustomElementExampleState {
  useTrapZone: boolean;
}

const _focusClassName = 'shouldFocusInput';

export class FocusTrapZoneBoxCustomElementExample extends React.Component<{}, IFocusTrapZoneBoxCustomElementExampleState> {
  public state: IFocusTrapZoneBoxCustomElementExampleState = {
    useTrapZone: false
  };

  private _toggle = React.createRef<IToggle>();

  public render() {
    const { useTrapZone } = this.state;

    return (
      <Stack tokens={{ childrenGap: 8 }}>
        <Stack.Item>
          <Text>If this button is used to enable FocusTrapZone, the hyperlink should be focused.</Text>
        </Stack.Item>
        <Stack.Item>
          <DefaultButton onClick={this._onButtonClickHandler} text="Focus Custom Element" />
        </Stack.Item>
        <FocusTrapZone disabled={!useTrapZone} firstFocusableSelector={_focusClassName}>
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
            <Link href="https://bing.com" className={_focusClassName} target="_blank">
              Hyperlink which will receive initial focus when trap zone is activated
            </Link>
          </Stack>
        </FocusTrapZone>
      </Stack>
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
