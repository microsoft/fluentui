import * as React from 'react';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const styles: any = stylesImport;

interface IThemingDesignerColorPickerProps {
  defaultValue: string;
}

interface IThemingDesignerColorPickerState {
  value: string;
}

export class ThemeDesignerColorPicker extends React.Component<IThemingDesignerColorPickerProps, IThemingDesignerColorPickerState> {
  constructor(props: IThemingDesignerColorPickerProps) {
    super(props);
    this.state = { value: this.props.defaultValue };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
    console.log('GOT HERE');
    console.log(this.state.value);
  }

  render() {
    return (
      <Stack horizontal disableShrink gap={20}>
        <div className={styles.colorbox} style={{ backgroundColor: this.state.value }} />
        <TextField value={this.state.value} onChange={this.handleChange} />
      </Stack>
    );
  }
}
