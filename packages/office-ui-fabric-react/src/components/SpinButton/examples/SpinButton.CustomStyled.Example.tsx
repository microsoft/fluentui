import * as React from 'react';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { IButtonBaseStyleProps, IButtonBaseStyles } from 'office-ui-fabric-react/lib/Button';

const styles: Partial<ISpinButtonStyles> = {
  root: {
    width: '400px'
  }
};

const upArrowButtonStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => ({
  button: [
    {
      selectors: {
        ':active': {
          backgroundColor: 'green'
        }
      }
    },
    props.checked && {
      backgroundColor: 'green'
    }
  ]
});

const downArrowButtonStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => ({
  button: [
    {
      selectors: {
        ':active': {
          backgroundColor: 'red'
        }
      }
    },
    props.checked && {
      backgroundColor: 'red'
    }
  ]
});

export class SpinButtonCustomStyledExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <SpinButton
          styles={ styles }
          upArrowButtonStyles={ upArrowButtonStyles }
          downArrowButtonStyles={ downArrowButtonStyles }
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