import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export class ProgressIndicatorIndeterminateExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <ProgressIndicator
        label='Example title'
        description='Example description'
      />
    );
  }
}
