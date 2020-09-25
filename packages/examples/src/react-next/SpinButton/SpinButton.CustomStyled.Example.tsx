import * as React from 'react';
import { IButtonStyles } from '@fluentui/react-next/lib/compat/Button';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react-next/lib/SpinButton';

const styles: Partial<ISpinButtonStyles> = {
  root: {
    width: '400px',
  },
};

const upArrowButtonStyles: Partial<IButtonStyles> = {
  rootChecked: {
    backgroundColor: 'green',
  },
  rootPressed: {
    backgroundColor: 'green',
  },
};

const downArrowButtonStyles: Partial<IButtonStyles> = {
  rootChecked: {
    backgroundColor: 'red',
  },
  rootPressed: {
    backgroundColor: 'red',
  },
};

export const SpinButtonCustomStyledExample: React.FC = () => (
  <div>
    <SpinButton
      styles={styles}
      upArrowButtonStyles={upArrowButtonStyles}
      downArrowButtonStyles={downArrowButtonStyles}
      defaultValue="0"
      label={'Custom styled SpinButton:'}
      min={0}
      max={100}
      step={1}
      incrementButtonAriaLabel={'Increase value by 1'}
      decrementButtonAriaLabel={'Decrease value by 1'}
    />
  </div>
);
