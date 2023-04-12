import * as React from 'react';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

export const TimePickerExampleWrapper: React.FC = ({ children }) => (
  <Stack tokens={stackTokens} styles={stackStyles}>
    {children}
  </Stack>
);
