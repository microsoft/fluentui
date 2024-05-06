import * as React from 'react';
import { Switch, webLightTheme, Theme, FluentProvider } from '@fluentui/react-components';

const customTheme: Theme = {
  ...webLightTheme,
  ctrlSwitchBorderColorRest: 'red',
  ctrlSwitchBorderColorHover: 'green',
  ctrlSwitchBorderColorPressed: 'teal',

  ctrlSwitchBorderColorCheckedRest: 'blue',
  ctrlSwitchBorderColorCheckedHover: 'purple',
  ctrlSwitchBorderColorCheckedPressed: 'orange',

  ctrlSwitchIndicatorForegroundColorRest: 'cyan',
  ctrlSwitchIndicatorForegroundColorHover: 'yellow',
  ctrlSwitchIndicatorForegroundColorPressed: 'magenta',

  ctrlSwitchIndicatorForegroundColorCheckedRest: 'red',
  ctrlSwitchIndicatorBackgroundColorCheckedRest: 'blue',

  ctrlSwitchIndicatorBackgroundColorCheckedHover: 'green',

  ctrlSwitchIndicatorBackgroundColorCheckedPressed: 'pink',
};

export const Checked = () => {
  const [checked, setChecked] = React.useState(true);
  const onChange = React.useCallback(
    ev => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked],
  );

  return (
    <>
      <Switch checked={checked} onChange={onChange} label={checked ? 'Checked' : 'Unchecked'} />
      <FluentProvider theme={customTheme}>
        <Switch checked={checked} onChange={onChange} label="custom" />
      </FluentProvider>
    </>
  );
};

Checked.parameters = {
  docs: {
    description: {
      story:
        'A Switch can be initially checked by passing a value to the `defaultChecked` property, or have its checked ' +
        'value controlled via the `checked` property.',
    },
  },
};
