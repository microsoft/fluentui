import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

// tslint:disable:jsx-no-lambda
export const ToggleBasicExample = () => (
  <div style={ { padding: '2px' } }>
    <Toggle
      defaultChecked={ true }
      label='Enabled and checked'
      onText='On'
      offText='Off'
      onFocus={ () => console.log('onFocus called') }
      onBlur={ () => console.log('onBlur called') }
    />
    <Toggle
      defaultChecked={ false }
      label='Enabled and unchecked'
      onText='On'
      offText='Off'
      onFocus={ () => console.log('onFocus called') }
      onBlur={ () => console.log('onBlur called') }
    />
    <Toggle
      defaultChecked={ true }
      disabled={ true }
      label='Disabled and checked'
      onText='On'
      offText='Off'
      onFocus={ () => console.log('onFocus called') }
      onBlur={ () => console.log('onBlur called') }
    />
    <Toggle
      defaultChecked={ false }
      disabled={ true }
      label='Disabled and unchecked'
      onText='On'
      offText='Off'
      onFocus={ () => console.log('onFocus called') }
      onBlur={ () => console.log('onBlur called') }
    />
  </div>
);
