/** @jsx withSlots */
import * as React from 'react';
import { withSlots } from '@uifabric/foundation';
import { Stack, IStackProps } from 'office-ui-fabric-react';
import { SpinnerButton, IconAtEndButton, SpinnerAtEndButton } from '@uifabric/experiments/lib/slots/examples/Slots.Recomposition.Helpers';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsRecompositionExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack>
        <Stack {...stackProps}>
          {/* TODO: Can we change the typing of the slots on recomposition? */}
          <SpinnerButton content="Recomposed button with Spinner as its icon" icon="Upload" />
          <IconAtEndButton content="Recomposed button with icon at the end" icon="Upload" />
          <SpinnerAtEndButton content="Recomposed button with Spinner as its icon at the end" icon="Upload" />
        </Stack>
      </Stack>
    );
  }
}
