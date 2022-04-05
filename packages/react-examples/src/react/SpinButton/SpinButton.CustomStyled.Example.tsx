import * as React from 'react';
import { SpinButton, ISpinButtonStyleProps, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';

const styles: IStyleFunction<ISpinButtonStyleProps, ISpinButtonStyles> = (props: ISpinButtonStyleProps) => {
  const { isFocused, theme } = props;
  return {
    spinButtonWrapper: [
      { width: 75 },
      // Example of conditional styling based on component state
      isFocused && {
        outline: '5px solid ' + theme.palette.yellow,
      },
    ],
  };
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

export const SpinButtonCustomStyledExample: React.FunctionComponent = () => {
  return (
    <SpinButton
      styles={styles}
      upArrowButtonStyles={upArrowButtonStyles}
      downArrowButtonStyles={downArrowButtonStyles}
      defaultValue="0"
      label="Custom styled SpinButton"
      min={0}
      max={100}
      step={1}
      incrementButtonAriaLabel="Increase value by 1"
      decrementButtonAriaLabel="Decrease value by 1"
    />
  );
};
