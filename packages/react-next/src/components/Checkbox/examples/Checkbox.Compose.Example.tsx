import * as React from 'react';
import { Checkbox, ICheckboxProps } from '@fluentui/react-next/lib/Checkbox';
import { Stack } from '@fluentui/react-next/lib/Stack';
import { compose } from '@fluentui/react-compose';
import { Icon, IIconProps } from '@fluentui/react-next/lib/Icon';

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

const CustomizedCheckmarkIcon: React.FunctionComponent<IIconProps> = props => {
  return <Icon iconName="Add" className={props.className} />;
};

const CheckboxWithCustomizedIcon = compose<'div', ICheckboxProps, ICheckboxProps, {}, {}>(Checkbox, {
  slots: {
    checkmarkIcon: CustomizedCheckmarkIcon,
  },
});

const CustomizedLabel: React.FunctionComponent<any> = props => {
  return (
    <label {...props}>
      {props.children}
      <Icon iconName="Label" />
    </label>
  );
};

const CheckboxWithCustomizedLabel = compose<'div', ICheckboxProps, ICheckboxProps, {}, {}>(Checkbox, {
  slots: {
    labelContainer: CustomizedLabel,
  },
});

export const CheckboxComposeExample: React.FunctionComponent = () => {
  // These checkboxes are uncontrolled because they don't set the `checked` prop.
  return (
    <Stack tokens={stackTokens}>
      <Checkbox checked label="Original Checkbox" />

      <CheckboxWithCustomizedIcon checked label="Checkbox with Customized Icon" />

      <CheckboxWithCustomizedLabel checked label="Checkbox with Customized Label" />
    </Stack>
  );
};
