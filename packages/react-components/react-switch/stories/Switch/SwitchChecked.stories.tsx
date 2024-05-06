import * as React from 'react';
import { Switch, webLightTheme, Theme, FluentProvider } from '@fluentui/react-components';

const customWin11Theme: Theme = {
  ...webLightTheme,
  switchForegroundColorHover: '#0078D4',
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
      <FluentProvider theme={customWin11Theme}>
        <Switch checked={checked} onChange={onChange} label={checked ? 'W11' : 'W11 checked'} />
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
