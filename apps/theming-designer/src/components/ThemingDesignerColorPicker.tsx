import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';
import { IColor } from 'office-ui-fabric-react/lib/index';
import { IColorCellProps, ColorPickerGridCell, SwatchColorPicker } from '../../../../packages/office-ui-fabric-react/lib/SwatchColorPicker';

const DEFAULT_OPTIONS: IColorCellProps[] = [{ id: 'primary', label: 'green', color: '#00ff00' }];
//<ColorPickerGridCell selected={false} item={DEFAULT_OPTIONS} color={'#ffa500'} label={'orange'} circle={true} />

export class ThemingDesignerColorPicker extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      color: undefined
    };
  }
  public render(): JSX.Element {
    return (
      <>
        <h1>Color</h1>
        <span>Presets</span>
        <Stack gap={10} padding={10}>
          <Dropdown
            placeholder="Select an Option"
            label="Theme dropdown"
            ariaLabel="Theme dropdown"
            options={[{ key: 'light', text: 'Light theme' }, { key: 'dark', text: 'Dark theme' }]}
            //componentRef={this._basicDropdown}
          />
          <span />
          <Stack horizontal disableShrink className="colorpicker">
            <Text>Primary color</Text>
            <SwatchColorPicker
              colorCells={[{ id: 'a', label: 'green', color: '#00ff00' }]}
              columnCount={1}
              cellMargin={2}
              cellShape={'square'}
              //disabled={true}
              //setSize={1}
              //focusOnHover={false}
            />
            <TextField value={'#00ff00'} onChange={this._updateColor} />
          </Stack>
          <Stack horizontal disableShrink className="colorpicker">
            <Text>Text color</Text>
            <SwatchColorPicker columnCount={1} cellShape={'square'} colorCells={[{ id: 'a', label: 'blue', color: '#0078d4' }]} />
            <TextField value={'#0078d4'} onChange={this._updateColor} />
          </Stack>
          <Stack horizontal disableShrink className="colorpicker">
            <Text>Background color color</Text>
            <SwatchColorPicker columnCount={1} cellShape={'square'} colorCells={[{ id: 'a', label: 'white', color: '#FFFFFF' }]} />
            <TextField value={'#FFFFFF'} onChange={this._updateColor} />
          </Stack>
        </Stack>
      </>
    );
  }
  private _updateColor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ color: newValue });
  };
}
