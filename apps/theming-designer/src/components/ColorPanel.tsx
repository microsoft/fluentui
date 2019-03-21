import * as React from 'react';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Card } from '@uifabric/react-cards';
// import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';
import { ThemeDesignerColorPicker } from './ThemeDesignerColorPicker';

const styles: any = stylesImport;

export class ColorPanel extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public render(): JSX.Element {
    return (
      <Card styles={{ root: { width: 'auto', height: 'auto' } }}>
        <h1>Color</h1>
        <span>Presets</span>
        <Stack gap={15}>
          {/* <Dropdown
            placeholder="Select an Option"
            label="Theme dropdown"
            ariaLabel="Theme dropdown"
            options={[{ key: 'light', text: 'Light theme' }, { key: 'dark', text: 'Dark theme' }]}
          /> */}
          <ThemeDesignerColorPicker defaultValue="#0078d4" />
          <ThemeDesignerColorPicker defaultValue="#323130" />
          <ThemeDesignerColorPicker defaultValue="#FFFFFF" />
        </Stack>
      </Card>
    );
  }
}
