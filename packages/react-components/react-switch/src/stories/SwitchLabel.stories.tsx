import * as React from 'react';
import { Switch } from '../index';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};

export const Label = () => {
  const [checked, setChecked] = React.useState(false);
  const onChange = React.useCallback(
    ev => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked],
  );
  const [checked2, setChecked2] = React.useState(false);
  const onChange2 = React.useCallback(
    ev => {
      setChecked2(ev.currentTarget.checked);
    },
    [setChecked2],
  );
  const [checked3, setChecked3] = React.useState(false);
  const onChange3 = React.useCallback(
    ev => {
      setChecked3(ev.currentTarget.checked);
    },
    [setChecked3],
  );

  const checkedString = checked ? 'checked' : 'unchecked';
  const checkedString2 = checked2 ? 'checked' : 'unchecked';
  const checkedString3 = checked3 ? 'checked' : 'unchecked';

  return (
    <div style={wrapperStyle}>
      <Switch
        checked={checked}
        label={`With label before and ${checkedString}`}
        labelPosition="before"
        onChange={onChange}
      />
      <Switch
        checked={checked2}
        label={`With label above and ${checkedString2}`}
        labelPosition="above"
        onChange={onChange2}
      />
      <Switch
        checked={checked3}
        label={`With label after and ${checkedString3}`}
        labelPosition="after"
        onChange={onChange3}
      />
    </div>
  );
};

Label.parameters = {
  docs: {
    description: {
      story: 'A label can be provided to the Switch and is positioned above, before or after the component.',
    },
  },
};
