import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export interface IChicletXsmallExampleState {
  textFieldValue: string;
}

export class ChicletXsmallExample extends React.Component<{}, IChicletXsmallExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      textFieldValue: 'http://localhost:4322'
    };
  }

  public render(): JSX.Element {
    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet
          url={TEST_URL}
          title={'WordTest with a long title that will wrap around to the second line but not the third line'}
          itemType="docx"
          size={ChicletSize.xSmall}
        />
      </Stack>
    );
  }
}
