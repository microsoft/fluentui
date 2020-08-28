import * as React from 'react';

export const useChecked = state => {
  const [checked, setChecked] = React.useState(false);

  state.onClick = () => {
    state['aria-pressed'] = !checked;
    setChecked(!checked);
  };
};
