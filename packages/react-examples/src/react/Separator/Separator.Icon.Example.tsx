import * as React from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon, IIconStyles } from '@fluentui/react/lib/Icon';

const iconStyles: IIconStyles = {
  root: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
};

const stackTokens: IStackTokens = { childrenGap: 12 };

export const SeparatorIconExample: React.FC = () => (
  <Stack tokens={stackTokens}>
    <Text>Horizontal center aligned with an icon as content</Text>
    <Separator>
      <Icon iconName="Clock" styles={iconStyles} />
    </Separator>
  </Stack>
);
