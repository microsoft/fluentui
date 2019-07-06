import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonBasicWithIconExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div style={{ width: '400px' }}>
        <SpinButton
          defaultValue="0"
          iconProps={{ iconName: 'IncreaseIndentLegacy' }}
          label={'Basic SpinButton:'}
          min={0}
          max={100}
          step={1}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          incrementButtonAriaLabel={'Increase value by 1'}
          decrementButtonAriaLabel={'Decrease value by 1'}
        />
      </div>
    );
  }
}
