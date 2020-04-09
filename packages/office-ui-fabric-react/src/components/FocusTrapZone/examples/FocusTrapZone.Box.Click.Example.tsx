import * as React from 'react';

import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

const getStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px dashed ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);

const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };

export interface IFocusTrapZoneBoxClickExampleState {
  useTrapZone: boolean;
}

export class FocusTrapZoneBoxClickExample extends React.Component<{}, IFocusTrapZoneBoxClickExampleState> {
  public state: IFocusTrapZoneBoxClickExampleState = { useTrapZone: false };

  private _toggle = React.createRef<IToggle>();

  public render() {
    const { useTrapZone } = this.state;

    return (
      <FocusTrapZone disabled={!useTrapZone} isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
        <Stack horizontalAlign="start" tokens={{ childrenGap: 15 }} styles={getStackStyles(useTrapZone)}>
          <Toggle
            label="Use trap zone"
            componentRef={this._toggle}
            checked={useTrapZone}
            onChange={this._onFocusTrapZoneToggleChanged}
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
  }

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ useTrapZone: !!checked });
  };
}
