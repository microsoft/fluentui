import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { IStackProps, Stack } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

// tslint:disable:jsx-no-lambda
export class SlotsIconExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" content="Icon: String" />
        <Button icon={{ iconName: 'share' }} content="Icon: Props, iconName: 'share'" />
      </Stack>
    );
  }
}
