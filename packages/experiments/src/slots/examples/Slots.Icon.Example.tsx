import * as React from 'react';
import { Button, Stack } from '@uifabric/experiments';
import { Spinner } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsIconExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" content="Icon: String" />
        <Button icon={{ iconName: 'share' }} content="Icon: Props, iconName: 'share'" />
        <Button
          icon={render =>
            render((IconType, iconProps) => (
              <b>
                Icon: <IconType {...iconProps} iconName="upload" />
              </b>
            ))
          }
          content="Icon: Function, Text + Icon"
        />
        <Button icon={() => <Spinner />} content="Icon: Function, Spinner" />
      </Stack>
    );
  }
}
