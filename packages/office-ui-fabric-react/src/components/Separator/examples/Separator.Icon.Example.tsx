import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';

const iconStyles: IIconStyles = {
  root: {
    fontSize: '24px',
    height: '24px',
    width: '24px'
  }
};

const stackTokens: IStackTokens = { childrenGap: 12 };

export class SeparatorIconExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={stackTokens}>
        <Text>Horizontal center aligned with an icon as content</Text>
        <Separator>
          <Icon iconName="Clock" styles={iconStyles} />
        </Separator>
      </Stack>
    );
  }
}
