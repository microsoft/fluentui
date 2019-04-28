import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Spinner, Stack } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsIconExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon={{ iconName: 'share' }} content="Icon: Props, iconName: 'share'" />
        <Button
          icon="upload"
          slots={{
            icon: {
              render: (iconProps, DefaultComponent) => (
                <b>
                  Icon: <DefaultComponent {...iconProps} />
                </b>
              )
            }
          }}
          content="Icon: Function, Text + Icon"
        />
        <Button slots={{ icon: { render: () => <Spinner /> } }} content="Icon: Function, Spinner" />
      </Stack>
    );
  }
}
