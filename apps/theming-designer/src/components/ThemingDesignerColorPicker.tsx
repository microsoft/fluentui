import * as React from 'react';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Card } from '@uifabric/react-cards';
import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';

const styles: any = stylesImport;

interface IThemingDesignerColorPickerProps {
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}

interface IThemingDesignerColorPickerState {
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}
export class ThemingDesignerColorPicker extends React.Component<IThemingDesignerColorPickerProps, IThemingDesignerColorPickerState> {
  constructor(props: IThemingDesignerColorPickerProps) {
    super(props);

    this.state = {
      primaryColor: '#0078d4',
      textColor: '#323130',
      backgroundColor: '#ffffff'
    };

    this.handlePrimaryColorChange = this.handlePrimaryColorChange.bind(this);
    this.handleTextColorChange = this.handleTextColorChange.bind(this);
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
                <TextField className={styles.textinput} value={this.state.primaryColor} onChange={() => this.handlePrimaryColorChange} />
                <div className={styles.colorinputprimary} background-color={this.state.primaryColor} />
              </div>
            </Stack>
            <Stack horizontal disableShrink gap={5}>
              <Text>Text color</Text>
              <div className={styles.colorpicker}>
                <TextField className={styles.textinput} value={this.state.textColor} onChange={this.handleTextColorChange} />
                <div className={styles.colorinputtext} id="color-text-box" background-color={this.state.textColor} />
              </div>
            </Stack>
            <Stack horizontal disableShrink gap={5}>
              <Text>Background color</Text>
              <div className={styles.colorpicker}>
                <TextField className={styles.textinput} value={this.state.backgroundColor} onChange={this._updateBackgroundColor} />
                <div className={styles.colorinputbackground} id="color-background-box" background-color={this.state.backgroundColor} />
              </div>
            </Stack>
          </Stack>
        </Card>
      </>
    );
  }
  // private _updatePrimaryColor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  //   const colorBox = document.getElementById('color-primary-box');
  //   if (colorBox) {
  //     let currentcolor = colorBox.style.backgroundColor;
  //     colorBox.style.backgroundColor = newValue ? newValue : currentcolor;
  //   }
  // };
  handlePrimaryColorChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newColor: string | undefined): void => {
    console.log('INSIDE handlePrimaryColorChange');
    if (newColor && newColor !== this.state.primaryColor) {
      console.log('GOT INSIDE NEWCOLOR NOT NULL');
      this.setState({
        primaryColor: newColor
      });
    }
  };

  handleTextColorChange(event: any) {
    this.setState({ textColor: event.target.value });
  }

  private _onTextColorChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newColor: string | undefined): void => {
    if (newColor && newColor !== this.state.textColor) {
      this.setState({
        textColor: newColor
      });
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
