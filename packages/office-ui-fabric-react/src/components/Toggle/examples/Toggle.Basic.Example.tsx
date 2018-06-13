import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { createTheme } from 'office-ui-fabric-react/lib/Styling';

const GreenTheme = createTheme({
  palette: {
    themePrimary: 'green'
  }
});

const Customizations = {
  Toggle: {
    theme: GreenTheme,
    styles: {
      root: {
        background: 'red'
      }
    }
  }
};

// tslint:disable:jsx-no-lambda
export const ToggleBasicExample = () => (
  <Customizer scopedSettings={Customizations}>
    <div style={{ padding: '2px' }}>
      <Toggle
        defaultChecked={true}
        label="Enabled and checked"
        onText="On"
        offText="Off"
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />
      <Toggle
        defaultChecked={false}
        label="Enabled and unchecked"
        onText="On"
        offText="Off"
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />
      <Toggle
        defaultChecked={true}
        disabled={true}
        label="Disabled and checked"
        onText="On"
        offText="Off"
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />
      <Toggle
        defaultChecked={false}
        disabled={true}
        label="Disabled and unchecked"
        onText="On"
        offText="Off"
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />
    </div>
  </Customizer>
);
