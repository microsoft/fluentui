import * as React from 'react';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonCustomStyledExample extends React.Component<any, any> {
  public render() {
    const styles: Partial<ISpinButtonStyles> = {
      container: {
        width: '203px'
      },
      upArrowButtonStyles: {
        rootChecked: {
          backgroundColor: 'green'
        },
        rootPressed: {
          backgroundColor: 'green'
        }
      },
      downArrowButtonStyles: {
        rootChecked: {
          backgroundColor: 'red'
        },
        rootPressed: {
          backgroundColor: 'red'
        }
      }

    };
    return (
      <div>
        <SpinButton
          styles={ styles }
          defaultValue='0'
          label={ 'Custom styled SpinButton:' }
          min={ 0 }
          max={ 100 }
          step={ 1 }
        />
      </div>
    );
  }
}