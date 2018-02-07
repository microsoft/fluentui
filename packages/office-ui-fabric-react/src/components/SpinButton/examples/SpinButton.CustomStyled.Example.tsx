import * as React from 'react';
import {
  SpinButton,
  ISpinButtonStyles,
  ISpinButtonStyleProps,
  ISpinButtonArrowStyleProps
} from 'office-ui-fabric-react/lib/SpinButton';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

const getStyles = (
  props: ISpinButtonStyleProps
): Partial<ISpinButtonStyles> => {
  return {
    root: {
      width: '400px'
    }
  };
};

const getUpArrowButtonStyles = (
  props: ISpinButtonArrowStyleProps
): Partial<IButtonStyles> => {
  return {
    rootChecked: {
      backgroundColor: 'green'
    },
    rootPressed: {
      backgroundColor: 'green'
    }
  };
};

const getDownArrowButtonStyles = (
  props: ISpinButtonArrowStyleProps
): Partial<IButtonStyles> => {
  return {
    rootChecked: {
      backgroundColor: 'red'
    },
    rootPressed: {
      backgroundColor: 'red'
    }
  };
};

export class SpinButtonCustomStyledExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <SpinButton
          getStyles={ getStyles }
          getUpArrowButtonStyles={ getUpArrowButtonStyles }
          getDownArrowButtonStyles={ getDownArrowButtonStyles }
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
