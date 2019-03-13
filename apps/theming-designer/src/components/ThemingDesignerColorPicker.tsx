import * as React from 'react';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';
import { IColor } from 'office-ui-fabric-react/lib/index';
import { IColorCellProps, ColorPickerGridCell, SwatchColorPicker } from '../../../../packages/office-ui-fabric-react/lib/SwatchColorPicker';

const DEFAULT_OPTIONS: IColorCellProps[] = [{ id: 'primary', label: 'green', color: '#00ff00' }];
//<ColorPickerGridCell selected={false} item={DEFAULT_OPTIONS} color={'#ffa500'} label={'orange'} circle={true} />
const styles: any = stylesImport;

export class ThemingDesignerColorPicker extends React.Component {
  // constructor(props: any) {
  //   super(props);

  //   this.state = {
  //     color: undefined
  //   };
  // }
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
          {/* <div className={styles.colorpicker}>
            <input className={styles.textinput} type="text" value="Orange" />
            <div className={styles.colorinput} background-color="#FF850A;" />
          </div> */}
          <Stack horizontal disableShrink gap={5}>
            <Text>Primary color</Text>
            <div className={styles.colorpicker}>
              <TextField className={styles.textinput} id="text-box" value={'#0078D4'} onChange={this._updatePrimaryColor} />
              <div className={styles.colorinput} id="color-primary-box" />
            </div>
          </Stack>
          <Stack horizontal disableShrink gap={5}>
            <Text>Text color</Text>
            <div className={styles.colorpicker}>
              <TextField className={styles.textinput} id="text-box" value={'#323130'} onChange={this._updateTextColor} />
              <div className={styles.colorinput} id="color-text-box" background-color="#323130;" />
            </div>
          </Stack>
          <Stack horizontal disableShrink gap={5}>
            <Text>Background color</Text>
            <div className={styles.colorpicker}>
              <TextField className={styles.textinput} id="text-box" value={'#FFFFFF'} onChange={this._updateBackgroundColor} />
              <div className={styles.colorinput} id="color-background-box" background-color="#FFFFFF;" />
            </div>
          </Stack>
        </Stack>
      </>
    );
  }
  private _updatePrimaryColor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const colorBox = document.getElementById('color-primary-box');
    if (colorBox) {
      let currentcolor = colorBox.style.backgroundColor;
      colorBox.style.backgroundColor = newValue ? newValue : currentcolor;
    }
  };
  private _updateTextColor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const colorBox = document.getElementById('color-text-box');
    if (colorBox) {
      let currentcolor = colorBox.style.backgroundColor;
      colorBox.style.backgroundColor = newValue ? newValue : currentcolor;
    }
  };
  private _updateBackgroundColor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const colorBox = document.getElementById('color-background-box');
    if (colorBox) {
      let currentcolor = colorBox.style.backgroundColor;
      colorBox.style.backgroundColor = newValue ? newValue : currentcolor;
    }
  };
}
