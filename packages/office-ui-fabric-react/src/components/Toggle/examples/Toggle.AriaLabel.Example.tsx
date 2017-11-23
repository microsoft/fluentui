/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

// tslint:disable:jsx-no-lambda
export const ToggleAriaLabelExample = () => (
  <div style={ { padding: '2px' } }>
    <Toggle
      defaultChecked={ true }
      label='Enabled and checked'
      onAriaLabel='This toggle is checked. Press to uncheck.'
      offAriaLabel='This toggle is unchecked. Press to check.'
      onText='On'
      offText='Off'
      onFocus={ () => console.log('onFocus called') }
      onBlur={ () => console.log('onBlur called') }
    />
  </div>
);
