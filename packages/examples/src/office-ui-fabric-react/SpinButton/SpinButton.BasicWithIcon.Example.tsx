import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export const SpinButtonBasicWithIconExample: React.FC = () => (
  <div style={{ width: '400px' }}>
    <SpinButton
      defaultValue="0"
      iconProps={{ iconName: 'IncreaseIndentLegacy' }}
      label={'Basic SpinButton:'}
      min={0}
      max={100}
      step={1}
      incrementButtonAriaLabel={'Increase value by 1'}
      decrementButtonAriaLabel={'Decrease value by 1'}
    />
  </div>
);
