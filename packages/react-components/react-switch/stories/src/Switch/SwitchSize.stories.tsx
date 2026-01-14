import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Size = (props: SwitchProps): JSXElement => {
  return (
    <div style={wrapperStyle}>
      <Switch label="Small" size="small" {...props} />
      <Switch label="Medium" size="medium" {...props} />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A Switch can have different sizes.',
    },
  },
};
