import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';

const iconStyles: IIconStyles = {
  root: {
    fontSize: '25px',
    height: '25px',
    width: '25px'
  }
};

export class SeparatorIconExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={10}>
        <Text>Horizontal center aligned with an icon as content</Text>
        <Separator>
          <Icon iconName="Clock" styles={iconStyles} />
        </Separator>
      </Stack>
    );
  }
}
