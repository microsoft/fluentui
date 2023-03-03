import * as React from 'react';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';

export const timePickerStyles: Partial<IComboBoxStyles> = {
  optionsContainerWrapper: {
    height: '500px',
  },
  root: {
    width: '500px',
  },
};

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

export const TimePickerExampleWrapper: React.FC = ({ children }) => (
  <Stack tokens={stackTokens} styles={stackStyles}>
    {children}
  </Stack>
);
