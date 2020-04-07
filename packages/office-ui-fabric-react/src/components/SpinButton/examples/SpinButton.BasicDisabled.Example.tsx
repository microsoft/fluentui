import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export const SpinButtonBasicDisabledExample: React.FC = () => (
  <div style={{ width: '400px' }}>
    <SpinButton
      defaultValue="25"
      label={'Basic SpinButton:'}
      min={0}
      max={100}
      step={1}
      disabled={true}
      incrementButtonAriaLabel={'Increase value by 1'}
      decrementButtonAriaLabel={'Decrease value by 1'}
    />
  </div>
);
