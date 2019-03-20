import * as React from 'react';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Card } from '@uifabric/react-cards';
import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';
//import { IColorCellProps, ColorPickerGridCell, SwatchColorPicker } from '../../../../packages/office-ui-fabric-react/lib/SwatchColorPicker';

//const DEFAULT_OPTIONS: IColorCellProps[] = [{ id: 'primary', label: 'green', color: '#00ff00' }];
//<ColorPickerGridCell selected={false} item={DEFAULT_OPTIONS} color={'#ffa500'} label={'orange'} circle={true} />
const styles: any = stylesImport;

export class ThemingDesignerColorPicker extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      primaryColor: undefined,
      textColor: undefined,
      backgroundColor: undefined
    };
  }
  public render(): JSX.Element {
    return (
      <>
        <Card styles={{ root: { width: 'auto', height: 'auto' } }}>
          <h1>Color</h1>
          <span>Presets</span>
          <Stack gap={15} padding={10}>
            <Dropdown
              placeholder="Select an Option"
              label="Theme dropdown"
              ariaLabel="Theme dropdown"
              options={[{ key: 'light', text: 'Light theme' }, { key: 'dark', text: 'Dark theme' }]}
            />
            <span />
            <Stack horizontal disableShrink gap={5}>
              <Text>Primary color</Text>
              <div className={styles.colorpicker}>
                <TextField className={styles.textinput} id="text-box" value={'#00ff00'} onChange={this._updatePrimaryColor} />
                <div className={styles.colorinputprimary} id="color-primary-box" />
              </div>
            </Stack>
            <Stack horizontal disableShrink gap={5}>
              <Text>Text color</Text>
              <div className={styles.colorpicker}>
                <TextField className={styles.textinput} id="text-box" value={'#323130'} onChange={this._updateTextColor} />
                <div className={styles.colorinputtext} id="color-text-box" background-color="#323130;" />
              </div>
            </Stack>
            <Stack horizontal disableShrink gap={5}>
              <Text>Background color</Text>
              <div className={styles.colorpicker}>
                <TextField className={styles.textinput} id="text-box" value={'#FFFFFF'} onChange={this._updateBackgroundColor} />
                <div className={styles.colorinputbackground} id="color-background-box" background-color="#FFFFFF;" />
              </div>
            </Stack>
          </Stack>
        </Card>
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
  // private _updatePrimaryColor() {
  //   const colorSquare = document.getElementById('color-primary-box');
  //   const colorText = document.getElementById('text-box');
  //   this.setState((prevState, props) => {
  //     return { primaryColor: colorText.value }
  //   })
  // }
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
